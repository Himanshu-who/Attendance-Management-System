// Current Date

let today = new Date();

document.getElementById("date").innerText =
    today.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });


// Mark Attendance

function mark(button, status) {

    let row = button.parentElement.parentElement;

    let statusBox = row.querySelector(".status");

    statusBox.innerText = status;

    statusBox.className =
        "status " + status.toLowerCase();

    updateStats();
}


// Update Statistics

function updateStats() {

    let rows =
        document.querySelectorAll("#students tr");

    let present = 0;
    let absent = 0;

    rows.forEach(function(row) {

        let status =
            row.querySelector(".status").innerText;

        if (status === "Present") {
            present++;
        }

        if (status === "Absent") {
            absent++;
        }

    });

    let total = rows.length;

    document.getElementById("total").innerText =
        total;

    document.getElementById("presentCount").innerText =
        present;

    document.getElementById("absentCount").innerText =
        absent;

    let rate = total > 0
        ? Math.round((present / total) * 100)
        : 0;

    document.getElementById("rate").innerText =
        rate + "%";
}


// Search Student

function searchStudent() {

    let search =
        document.getElementById("search")
        .value
        .toLowerCase();

    let rows =
        document.querySelectorAll("#students tr");

    rows.forEach(function(row) {

        let name =
            row.cells[1].innerText.toLowerCase();

        if (name.includes(search)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });
}


// Add Student

function addStudent() {

    let name =
        prompt("Enter student name:");

    if (!name) return;

    let roll =
        prompt("Enter roll number:");

    if (!roll) return;

    let table =
        document.getElementById("students");

    let row =
        table.insertRow();

    row.innerHTML = `
        <td>${roll}</td>

        <td>${name}</td>

        <td>
            <span class="status">
                Not Marked
            </span>
        </td>

        <td>
            <button
                class="present"
                onclick="mark(this,'Present')">
                Present
            </button>

            <button
                class="absent"
                onclick="mark(this,'Absent')">
                Absent
            </button>
        </td>
    `;

    updateStats();
}