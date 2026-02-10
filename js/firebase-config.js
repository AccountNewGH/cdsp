const firebaseConfig = {
    apiKey: "AIzaSyA0AGz4WGow73OvfDrYZkvGAP0P-301vCA",
    authDomain: "cdsp-reporting-sytem.firebaseapp.com",
    projectId: "cdsp-reporting-system",
    storageBucket: "cdsp-reporting-sytem.firebasestorage.app",
    messagingSenderId: "1076293744019",
    appId: "1:1076293744019:web:485559bb882e731148e466"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
