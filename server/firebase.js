// Import Firebase Admin SDK
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with service account
const serviceAccount = require('../learn-english-1ef6d-firebase-adminsdk-bhpuy-19f2cc3d15.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://learn-english-1ef6d-default-rtdb.asia-southeast1.firebasedatabase.app/"

});

const db = admin.firestore();



module.exports = db;
