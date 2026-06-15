// ============================================================
// GOOGLE APPS SCRIPT — Mahanubhav Sanstha Backend
// Deploy as Web App: Execute as Me, Access: Anyone
// ============================================================
// SETUP INSTRUCTIONS:
// 1. Open Google Sheets → Extensions → Apps Script
// 2. Paste this entire file
// 3. Set ADMIN_TOKEN to a strong secret password
// 4. Deploy → New Deployment → Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copy the Web App URL and paste into src/services/api.ts
// ============================================================

const ADMIN_TOKEN = "CHANGE_THIS_TO_YOUR_SECRET_TOKEN_123";
const SHEET_EVENTS = "Events";
const SHEET_REGISTRATIONS = "Registrations";
const SHEET_GALLERY = "Gallery";

// ─── CORS Headers ───────────────────────────────────────────
function setCorsHeaders(output) {
  return output
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function doOptions() {
  return setCorsHeaders(
    ContentService.createTextOutput("")
      .setMimeType(ContentService.MimeType.TEXT)
  );
}

// ─── Entry Point ────────────────────────────────────────────
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action;
    const token = body.token;

    const publicActions = ["getEvents", "submitRegistration", "getGallery"];
    if (!publicActions.includes(action) && token !== ADMIN_TOKEN) {
      return respond({ success: false, error: "Unauthorized" });
    }

    switch (action) {
      // Events
      case "getEvents":         return respond(getEvents(body));
      case "addEvent":          return respond(addEvent(body));
      case "updateEvent":       return respond(updateEvent(body));
      case "deleteEvent":       return respond(deleteEvent(body));
      // Registrations
      case "submitRegistration":return respond(submitRegistration(body));
      case "getRegistrations":  return respond(getRegistrations(body));
      case "deleteRegistration":return respond(deleteRegistration(body));
      case "exportRegistrations":return respond(exportRegistrations(body));
      // Gallery
      case "getGallery":        return respond(getGallery(body));
      case "addGallery":        return respond(addGallery(body));
      case "updateGallery":     return respond(updateGallery(body));
      case "deleteGallery":     return respond(deleteGallery(body));
      default:
        return respond({ success: false, error: "Unknown action" });
    }
  } catch (err) {
    return respond({ success: false, error: err.toString() });
  }
}

function doGet(e) {
  return respond({ success: true, message: "API is running" });
}

function respond(data) {
  return setCorsHeaders(
    ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON)
  );
}

// ─── Sheet Helpers ───────────────────────────────────────────
function getOrCreateSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
         .setFontWeight("bold")
         .setBackground("#8b0000")
         .setFontColor("#ffffff");
  }
  return sheet;
}

function sheetToObjects(sheet) {
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i] !== undefined ? row[i].toString() : ""; });
    return obj;
  });
}

function generateId(prefix) {
  return prefix + "_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6).toUpperCase();
}

// ─── EVENTS ─────────────────────────────────────────────────
const EVENT_HEADERS = [
  "EventID", "EventTitle", "MarathiTitle", "HindiTitle", "EnglishTitle",
  "EventDate", "StartTime", "EndTime", "VenueName", "GoogleMapsLink",
  "Description", "YouTubeLiveLink", "WhatsAppGroupLink",
  "RegistrationStatus", "EventStatus", "EventImageURL", "CreatedDate"
];

function getEvents(body) {
  const sheet = getOrCreateSheet(SHEET_EVENTS, EVENT_HEADERS);
  const rows = sheetToObjects(sheet);
  const isAdmin = body.token === ADMIN_TOKEN;
  const events = isAdmin ? rows : rows.filter(r => r.EventStatus === "Active");
  return { success: true, data: events };
}

function addEvent(body) {
  const sheet = getOrCreateSheet(SHEET_EVENTS, EVENT_HEADERS);
  const d = body.data;
  const id = generateId("EVT");
  sheet.appendRow([
    id, d.EventTitle || "", d.MarathiTitle || "", d.HindiTitle || "", d.EnglishTitle || "",
    d.EventDate || "", d.StartTime || "", d.EndTime || "",
    d.VenueName || "", d.GoogleMapsLink || "", d.Description || "",
    d.YouTubeLiveLink || "", d.WhatsAppGroupLink || "",
    d.RegistrationStatus || "Closed", d.EventStatus || "Active",
    d.EventImageURL || "", new Date().toLocaleString("en-IN")
  ]);
  return { success: true, id };
}

function updateEvent(body) {
  const sheet = getOrCreateSheet(SHEET_EVENTS, EVENT_HEADERS);
  const rows = sheet.getDataRange().getValues();
  const d = body.data;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === body.id) {
      const updates = [
        body.id, d.EventTitle, d.MarathiTitle, d.HindiTitle, d.EnglishTitle,
        d.EventDate, d.StartTime, d.EndTime, d.VenueName, d.GoogleMapsLink,
        d.Description, d.YouTubeLiveLink, d.WhatsAppGroupLink,
        d.RegistrationStatus, d.EventStatus, d.EventImageURL, rows[i][16]
      ];
      sheet.getRange(i + 1, 1, 1, updates.length).setValues([updates]);
      return { success: true };
    }
  }
  return { success: false, error: "Event not found" };
}

function deleteEvent(body) {
  const sheet = getOrCreateSheet(SHEET_EVENTS, EVENT_HEADERS);
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === body.id) {
      sheet.deleteRow(i + 1);
      return { success: true };
    }
  }
  return { success: false, error: "Event not found" };
}

// ─── REGISTRATIONS ───────────────────────────────────────────
const REG_HEADERS = [
  "RegistrationID", "EventID", "EventName", "FullName",
  "MobileNumber", "Email", "MandalName", "CityArea",
  "NumberOfPeople", "SpecialNote", "RegistrationDateTime"
];

function submitRegistration(body) {
  const sheet = getOrCreateSheet(SHEET_REGISTRATIONS, REG_HEADERS);
  const d = body.data;
  const id = generateId("REG");
  sheet.appendRow([
    id, d.EventID || "", d.EventName || "", d.FullName || "",
    d.MobileNumber || "", d.Email || "", d.MandalName || "",
    d.CityArea || "", d.NumberOfPeople || 1, d.SpecialNote || "",
    new Date().toLocaleString("en-IN")
  ]);
  return { success: true, id };
}

function getRegistrations(body) {
  const sheet = getOrCreateSheet(SHEET_REGISTRATIONS, REG_HEADERS);
  const rows = sheetToObjects(sheet);
  let filtered = rows;
  if (body.eventId) filtered = filtered.filter(r => r.EventID === body.eventId);
  if (body.search) {
    const s = body.search.toLowerCase();
    filtered = filtered.filter(r =>
      r.FullName.toLowerCase().includes(s) ||
      r.MobileNumber.includes(s) ||
      r.MandalName.toLowerCase().includes(s)
    );
  }
  return { success: true, data: filtered };
}

function deleteRegistration(body) {
  const sheet = getOrCreateSheet(SHEET_REGISTRATIONS, REG_HEADERS);
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === body.id) {
      sheet.deleteRow(i + 1);
      return { success: true };
    }
  }
  return { success: false, error: "Registration not found" };
}

function exportRegistrations(body) {
  const sheet = getOrCreateSheet(SHEET_REGISTRATIONS, REG_HEADERS);
  const rows = sheetToObjects(sheet);
  return { success: true, data: rows };
}

// ─── GALLERY ─────────────────────────────────────────────────
const GALLERY_HEADERS = [
  "GalleryID", "Year", "EventName", "GooglePhotosAlbumLink",
  "EventDate", "Description", "CoverImageURL", "CreatedDate"
];

function getGallery(body) {
  const sheet = getOrCreateSheet(SHEET_GALLERY, GALLERY_HEADERS);
  const rows = sheetToObjects(sheet);
  return { success: true, data: rows };
}

function addGallery(body) {
  const sheet = getOrCreateSheet(SHEET_GALLERY, GALLERY_HEADERS);
  const d = body.data;
  const id = generateId("GAL");
  sheet.appendRow([
    id, d.Year || new Date().getFullYear(), d.EventName || "",
    d.GooglePhotosAlbumLink || "", d.EventDate || "",
    d.Description || "", d.CoverImageURL || "",
    new Date().toLocaleString("en-IN")
  ]);
  return { success: true, id };
}

function updateGallery(body) {
  const sheet = getOrCreateSheet(SHEET_GALLERY, GALLERY_HEADERS);
  const rows = sheet.getDataRange().getValues();
  const d = body.data;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === body.id) {
      sheet.getRange(i + 1, 1, 1, 8).setValues([[
        body.id, d.Year, d.EventName, d.GooglePhotosAlbumLink,
        d.EventDate, d.Description, d.CoverImageURL, rows[i][7]
      ]]);
      return { success: true };
    }
  }
  return { success: false, error: "Gallery item not found" };
}

function deleteGallery(body) {
  const sheet = getOrCreateSheet(SHEET_GALLERY, GALLERY_HEADERS);
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === body.id) {
      sheet.deleteRow(i + 1);
      return { success: true };
    }
  }
  return { success: false, error: "Gallery item not found" };
}
