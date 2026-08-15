let components = [];


// Get form

const form = document.getElementById("componentForm");


// Form submit

form.addEventListener("submit", function(event) {

    event.preventDefault();


    // Get values

    const id = document.getElementById("componentId").value;
    const name = document.getElementById("componentName").value;
    const type = document.getElementById("componentType").value;

    const rated = parseFloat(
        document.getElementById("ratedValue").value
    );

    const measured = parseFloat(
        document.getElementById("measuredValue").value
    );

    const tolerance = parseFloat(
        document.getElementById("tolerance").value
    );


    // Calculate error

    let difference = measured - rated;

    if (difference < 0) {
        difference = -difference;
    }

    let error = (difference / rated) * 100;


    // Check PASS or FAIL

    let result;

    if (error <= tolerance) {
        result = "PASS";
    } else {
        result = "FAIL";
    }


    // Create component object

    const component = {

        id: id,
        name: name,
        type: type,
        rated: rated,
        measured: measured,
        error: error,
        result: result

    };


    // Add component

    components.push(component);


    // Show result

    showResult(component);


    // Update table

    displayComponents();


    // Update dashboard

    updateDashboard();


    // Clear form

    form.reset();

});


// Show test result

function showResult(component) {

    const resultBox = document.getElementById("resultBox");

    resultBox.className = "";


    if (component.result === "PASS") {

        resultBox.classList.add("result-pass");

        resultBox.innerHTML =
            "<strong>PASS ✓</strong><br>" +
            "Component: " + component.name + "<br>" +
            "Error: " + component.error.toFixed(2) + "%";

    } else {

        resultBox.classList.add("result-fail");

        resultBox.innerHTML =
            "<strong>FAIL ✗</strong><br>" +
            "Component: " + component.name + "<br>" +
            "Error: " + component.error.toFixed(2) + "%";

    }

}


// Display components

function displayComponents() {

    const table = document.getElementById("componentTable");

    table.innerHTML = "";


    for (let i = 0; i < components.length; i++) {

        const component = components[i];

        let resultClass = "";

        if (component.result === "PASS") {
            resultClass = "pass";
        } else {
            resultClass = "fail";
        }


        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${component.id}</td>

            <td>${component.name}</td>

            <td>${component.type}</td>

            <td>${component.rated}</td>

            <td>${component.measured}</td>

            <td>${component.error.toFixed(2)}%</td>

            <td class="${resultClass}">
                ${component.result}
            </td>

        `;


        table.appendChild(row);

    }

}


// Update dashboard

function updateDashboard() {

    let passed = 0;
    let failed = 0;


    for (let i = 0; i < components.length; i++) {

        if (components[i].result === "PASS") {
            passed++;
        } else {
            failed++;
        }

    }


    document.getElementById("totalComponents").innerText =
        components.length;

    document.getElementById("passedComponents").innerText =
        passed;

    document.getElementById("failedComponents").innerText =
        failed;

}


// Clear all components

document.getElementById("clearButton").addEventListener("click", function() {

    if (components.length === 0) {
        return;
    }


    let confirmClear = confirm(
        "Are you sure you want to delete all component records?"
    );


    if (confirmClear) {

        components = [];

        displayComponents();

        updateDashboard();

        document.getElementById("resultBox").className = "";

        document.getElementById("resultBox").innerHTML =
            "All component records have been cleared.";

    }

});