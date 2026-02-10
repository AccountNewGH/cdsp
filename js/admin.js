db.collection("reports").get().then(snapshot => {
    const table = document.getElementById("reportsTable");
    let totalStudents = 0, totalAccomplished = 0;

    snapshot.forEach(doc => {
        const data = doc.data();
        totalStudents += data.numStudents;
        totalAccomplished += data.numStudents; // assuming target=accomplished for demo

        const row = table.insertRow();
        row.insertCell(0).innerText = data.userId;
        row.insertCell(1).innerText = data.schoolName;
        row.insertCell(2).innerText = data.dateConducted;
        row.insertCell(3).innerText = data.gradeLevel;
        row.insertCell(4).innerText = data.numStudents;
        row.insertCell(5).innerText = data.numFemaleStudents;
        row.insertCell(6).innerText = data.numParents;
        row.insertCell(7).innerText = data.numFemaleParents;
        row.insertCell(8).innerHTML = `<a href="${data.fileUrls.cdspUrl}" target="_blank">View</a>`;
        row.insertCell(9).innerHTML = `<a href="${data.fileUrls.attendanceUrl}" target="_blank">View</a>`;
        row.insertCell(10).innerHTML = `<a href="${data.fileUrls.certUrl}" target="_blank">View</a>`;
    });

    // Simple completion percentage
    const completion = totalStudents > 0 ? Math.round((totalAccomplished / totalStudents) * 100) : 0;
    document.getElementById("overallCompletion").innerText = `Completion: ${completion}%`;
});
