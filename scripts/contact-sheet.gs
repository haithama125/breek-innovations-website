// Google Apps Script — receives Breek contact-form submissions and appends a row
// to the "website forms leads" tab of your existing Leads spreadsheet.
//
// Setup (one time, ~5 min):
//   1. Open your existing Leads Google Sheet (the one with the Meta Instant
//      Forms tab and your new "website forms leads" tab).
//   2. Extensions → Apps Script. Paste this entire file (replace anything
//      already there). Save.
//   3. Deploy → New deployment → gear icon → Web app.
//        Description:      Breek website contact form
//        Execute as:       Me
//        Who has access:   Anyone
//      Click Deploy, authorize when prompted, and copy the "/exec" Web app URL.
//   4. Paste that URL into src/lib/config.ts as CONTACT_SHEET_WEBHOOK_URL
//      (or set NEXT_PUBLIC_CONTACT_SHEET_URL in .env.local).
//
// If you ever edit this script, you must Deploy → Manage deployments →
// pencil icon → Version: New version, or the live endpoint keeps running the
// old code.
//
// Each submission appends: receivedAt, submittedAt, name, email, company,
// phone, projectType, budget, message, source, page.

const SHEET_NAME = "Website Forms";
const HEADERS = [
  "receivedAt",
  "submittedAt",
  "name",
  "email",
  "company",
  "phone",
  "projectType",
  "budget",
  "message",
  "source",
  "page",
];

function doPost(e) {
  try {
    const sheet = getOrCreateSheet();
    const params = (e && e.parameter) || {};
    const row = [
      new Date(),
      params.submittedAt || "",
      params.name || "",
      params.email || "",
      params.company || "",
      params.phone || "",
      params.projectType || "",
      params.budget || "",
      params.message || "",
      params.source || "",
      params.page || "",
    ];
    sheet.appendRow(row);
    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, info: "Breek contact webhook is live." })
  ).setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}
