function submitReport() {
    const userId = auth.currentUser.uid;
    const schoolName = document.getElementById("schoolName").value;
    const dateConducted = document.getElementById("dateConducted").value;
    const gradeLevel = document.getElementById("gradeLevel").value;
    const numStudents = parseInt(document.getElementById("numStudents").value) || 0;
    const numFemaleStudents = parseInt(document.getElementById("numFemaleStudents").value) || 0;
    const numParents = parseInt(document.getElementById("numParents").value) || 0;
    const numFemaleParents = parseInt(document.getElementById("numFemaleParents").value) || 0;

    const cdspFile = document.getElementById("cdspFile").files[0];
    const attendanceFile = document.getElementById("attendanceFile").files[0];
    const certFile = document.getElementById("certFile").files[0];

    const timestamp = Date.now();
    const storageRef = storage.ref(`reports/${userId}/${timestamp}/`);

    Promise.all([
        storageRef.child("CDSPReport.pdf").put(cdspFile),
        storageRef.child("Attendance.pdf").put(attendanceFile),
        storageRef.child("Certification.pdf").put(certFile)
    ]).then(async snapshots => {
        const cdspUrl = await snapshots[0].ref.getDownloadURL();
        const attendanceUrl = await snapshots[1].ref.getDownloadURL();
        const certUrl = await snapshots[2].ref.getDownloadURL();

        db.collection("reports").add({
            userId,
            schoolName,
            dateConducted,
            gradeLevel,
            numStudents,
            numFemaleStudents,
            numParents,
            numFemaleParents,
            fileUrls: { cdspUrl, attendanceUrl, certUrl },
            timestamp
        }).then(() => {
            alert("Report submitted successfully!");
            document.getElementById("reportForm").reset();
        }).catch(err => alert(err.message));
    });
}
