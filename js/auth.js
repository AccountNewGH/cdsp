function loginUser(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            db.collection("users").doc(userCredential.user.uid).get()
                .then(doc => {
                    if (doc.exists) {
                        const role = doc.data().role;
                        if (role === "admin") {
                            window.location = "admin.html";
                        } else {
                            window.location = "dashboard.html";
                        }
                    }
                });
        })
        .catch(error => alert(error.message));
}

// Optional: register users manually
function registerUser(email, password, role) {
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            db.collection("users").doc(userCredential.user.uid).set({ email, role });
            alert("User registered successfully!");
        })
        .catch(error => alert(error.message));
}
