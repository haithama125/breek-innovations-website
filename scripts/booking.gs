// Google Apps Script — Breek intro-call booking endpoint.
//
// Reads your Google Calendar for free/busy, returns available 30-min slots,
// creates events when a visitor books, and emails you + the visitor.
//
// Setup (one time, ~5 min):
//   1. Open a Google Apps Script project (script.google.com → New project).
//      This should be a STANDALONE project, not bound to a sheet — it runs
//      against your calendar. Name it "Breek Booking".
//   2. Paste this entire file (replace anything in Code.gs). Save.
//   3. First deploy will prompt you to authorize access to Calendar and Gmail.
//      Deploy → New deployment → gear → Web app.
//        Description:     Breek booking
//        Execute as:      Me
//        Who has access:  Anyone
//      Deploy → authorize (click "Advanced" → "Go to Breek Booking (unsafe)"
//      → Allow for Calendar and Gmail scopes). Copy the "/exec" URL.
//   4. Paste the URL into src/lib/config.ts as BOOKING_WEBHOOK_URL (or set
//      NEXT_PUBLIC_BOOKING_URL in .env.local).
//
// To edit later: Deploy → Manage deployments → pencil → Version: New version
// → Deploy. URL stays the same.

const NOTIFY_EMAIL = "haitham@breek-innovations.com";

// New events are created on the FIRST calendar in this list (the deploy
// account's own calendar). Every calendar in the list is checked for busy
// times when computing availability — so add any secondary calendar whose
// events should block bookings. For secondary calendars to be readable, they
// must be shared with the deploy account ("See all event details" minimum).
const BOOKING_CALENDAR_ID = "primary";
const BUSY_CALENDAR_IDS = ["haithama125@gmail.com"];

const TIMEZONE = "America/New_York";
const WORK_DAYS = [1, 2, 3, 4, 5, 6]; // 0=Sun, 1=Mon ... 6=Sat → Mon–Sat
const WORK_START_HOUR = 9;            // 9am
const WORK_END_HOUR = 19;             // 7pm (last slot starts 6:30)
const SLOT_MINUTES = 30;
const BOOKING_DURATION_MINUTES = 30;
const BUFFER_MINUTES = 15;
const MAX_DAYS_AHEAD = 21;
const MIN_LEAD_MINUTES = 60;          // can't book within next hour

function doGet(e) {
  try {
    const params = (e && e.parameter) || {};
    if (params.action === "availability") {
      return json(getAvailability(params.from, params.to));
    }
    return json({ ok: true, info: "Breek booking endpoint live" });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};
    if (!p.name || !p.email || !p.startISO) {
      return json({ ok: false, error: "Missing required fields" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
      return json({ ok: false, error: "Invalid email address" });
    }
    if (p.company_website) {
      return json({ ok: true, eventId: "honeypot" });
    }

    const start = new Date(p.startISO);
    if (isNaN(start.getTime())) {
      return json({ ok: false, error: "Invalid start time" });
    }
    const end = new Date(start.getTime() + BOOKING_DURATION_MINUTES * 60000);

    if (!isSlotAvailable(start, end)) {
      return json({
        ok: false,
        code: "SLOT_TAKEN",
        error: "That time was just taken. Please pick another.",
      });
    }

    const cal = getBookingCalendar();
    if (!cal) {
      return json({ ok: false, error: "Booking calendar not accessible" });
    }
    const title = "Breek intro call — " + p.name;
    const descLines = [
      "Name: " + p.name,
      "Email: " + p.email,
      p.phone ? "Phone: " + p.phone : null,
      p.message ? "\nWhat they want to discuss:\n" + p.message : null,
      "\nBooked via breek-innovations.com",
    ].filter(Boolean);

    const event = cal.createEvent(title, start, end, {
      description: descLines.join("\n"),
      guests: p.email,
      sendInvites: true,
    });

    const whenStr = Utilities.formatDate(
      start,
      TIMEZONE,
      "EEEE, MMM d, yyyy 'at' h:mm a z"
    );
    const notifyBody = [
      p.name + " booked a 30-minute consultation.",
      "",
      "When:  " + whenStr,
      "Email: " + p.email,
      p.phone ? "Phone: " + p.phone : null,
      p.message ? "\nWhat they want to discuss:\n" + p.message : null,
      "",
      "Calendar event: " + event.getHtmlLink(),
    ]
      .filter(function (x) { return x !== null; })
      .join("\n");

    GmailApp.sendEmail(NOTIFY_EMAIL, "New booking: " + p.name, notifyBody, {
      replyTo: p.email,
      name: "Breek Bookings",
    });

    return json({
      ok: true,
      eventId: event.getId(),
      startISO: start.toISOString(),
      endISO: end.toISOString(),
    });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function getAvailability(fromStr, toStr) {
  const now = new Date();
  const from = fromStr ? new Date(fromStr + "T00:00:00Z") : startOfTodayUTC(now);
  const hardCap = new Date(now.getTime() + MAX_DAYS_AHEAD * 86400000);
  const to = toStr && new Date(toStr + "T23:59:59Z") < hardCap
    ? new Date(toStr + "T23:59:59Z")
    : hardCap;

  const busy = getBusyIntervals(from, to);

  const slotsByDay = {};
  const minBookable = now.getTime() + MIN_LEAD_MINUTES * 60000;

  for (let dayCursor = new Date(from); dayCursor <= to;
       dayCursor = new Date(dayCursor.getTime() + 86400000)) {
    const dayStr = Utilities.formatDate(dayCursor, TIMEZONE, "yyyy-MM-dd");
    const weekdayIso = Number(Utilities.formatDate(dayCursor, TIMEZONE, "u"));
    const weekday = weekdayIso === 7 ? 0 : weekdayIso; // 0=Sun..6=Sat
    if (WORK_DAYS.indexOf(weekday) === -1) continue;

    const daySlots = [];
    for (let h = WORK_START_HOUR; h < WORK_END_HOUR; h++) {
      for (let m = 0; m < 60; m += SLOT_MINUTES) {
        const slotLocal = Utilities.parseDate(
          dayStr + " " + pad(h) + ":" + pad(m),
          TIMEZONE,
          "yyyy-MM-dd HH:mm"
        );
        const slotStart = slotLocal.getTime();
        const slotEnd = slotStart + BOOKING_DURATION_MINUTES * 60000;
        if (slotStart < minBookable) continue;
        const bufferedStart = slotStart - BUFFER_MINUTES * 60000;
        const bufferedEnd = slotEnd + BUFFER_MINUTES * 60000;
        const conflict = busy.some(function (b) {
          return b.start < bufferedEnd && b.end > bufferedStart;
        });
        if (conflict) continue;
        daySlots.push(new Date(slotStart).toISOString());
      }
    }
    if (daySlots.length > 0) slotsByDay[dayStr] = daySlots;
  }

  return {
    ok: true,
    timezone: TIMEZONE,
    durationMinutes: BOOKING_DURATION_MINUTES,
    slots: slotsByDay,
  };
}

function isSlotAvailable(start, end) {
  const bufferedStart = new Date(start.getTime() - BUFFER_MINUTES * 60000);
  const bufferedEnd = new Date(end.getTime() + BUFFER_MINUTES * 60000);
  const busy = getBusyIntervals(bufferedStart, bufferedEnd);
  const slotStart = start.getTime();
  const slotEnd = end.getTime();
  return !busy.some(function (b) {
    return b.start < slotEnd && b.end > slotStart;
  });
}

function getBookingCalendar() {
  return getCalendarByIdSafe(BOOKING_CALENDAR_ID);
}

function getBusyIntervals(from, to) {
  const ids = [BOOKING_CALENDAR_ID].concat(BUSY_CALENDAR_IDS);
  const intervals = [];
  for (let i = 0; i < ids.length; i++) {
    const cal = getCalendarByIdSafe(ids[i]);
    if (!cal) continue;
    const events = cal.getEvents(from, to);
    for (let j = 0; j < events.length; j++) {
      const ev = events[j];
      if (ev.isAllDayEvent()) continue;
      let status;
      try { status = ev.getMyStatus && ev.getMyStatus(); } catch (_e) {}
      if (status === CalendarApp.GuestStatus.NO) continue;
      intervals.push({
        start: ev.getStartTime().getTime(),
        end: ev.getEndTime().getTime(),
      });
    }
  }
  return intervals;
}

function getCalendarByIdSafe(id) {
  try {
    return id === "primary"
      ? CalendarApp.getDefaultCalendar()
      : CalendarApp.getCalendarById(id);
  } catch (e) {
    console.warn("Could not access calendar " + id + ": " + e);
    return null;
  }
}

function startOfTodayUTC(now) {
  const d = new Date(now);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

function pad(n) {
  return n < 10 ? "0" + n : "" + n;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
