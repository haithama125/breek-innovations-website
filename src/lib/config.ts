export const CONTACT_EMAIL = "hello@breek-innovations.com";

// Paste the deployed scripts/booking.gs Web App URL here.
export const BOOKING_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ??
  "https://script.google.com/macros/s/AKfycbxzatKfD7EuyPVDrU99nCpQbuo8VP9Fwm7hisqQucNGSgiD2swPnUBUkbKv8tkflhwu/exec";

// Paste the deployed Google Apps Script web-app URL here.
// Setup: create a sheet, Extensions → Apps Script, paste the snippet from
// scripts/contact-sheet.gs, deploy as Web App (Anyone with the link, execute
// as Me), then paste the /exec URL below. Can also be set via
// NEXT_PUBLIC_CONTACT_SHEET_URL at build time.
export const CONTACT_SHEET_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_CONTACT_SHEET_URL ??
  "https://script.google.com/macros/s/AKfycbxrscVjRO2WzQeIQCuDEpF5U2AZir2fRDwWVe75bAxN-WqwpGI-XnSxXBktdYtAWHw7iQ/exec";
