const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// CSV import (callable)
exports.importCSV = functions.https.onCall(async (data, context) => {
  if (!context.auth || context.auth.token.role !== 'admin') {
    throw new functions.https.HttpsError('permission-denied', 'Unauthorized');
  }
  // TODO: parse data.csvBase64, validate rows, create student docs.
  return { success: true, imported: 0 };
});

// Notification stub
exports.sendNotification = functions.https.onCall(async (data, context) => {
  // data: {type, recipients, message}
  // Implement provider integration later (Twilio/MSG91)
  return { success: true, queued: data.recipients?.length || 0 };
});

// OCR verification stub
exports.ocrVerify = functions.https.onCall(async (data, context) => {
  // Use Vision API or external OCR service
  return { success: true, matched: false, confidence: 0.0 };
});
