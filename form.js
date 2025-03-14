var tabs = document.getElementsByClassName("tab");
var currentTab = 0;
var times = [];
tabs[0].style.display = "block";

function nextPage() {

    // check if the form is valid
    if (!validateForm()) return false;

    currentTab += 1;

    // Record the time when the user clicks next
    times.push(new Date());

    // Submit the form if you have reached the end of the form
    if (currentTab >= tabs.length) {
        submitForm();
        return false;
    }

    if (currentTab == (tabs.length - 1)) {
        document.getElementById("next").innerHTML = "Submit";
    }
    // Hide the current tab
    tabs[currentTab - 1].style.display = "none";

    // Display the correct tab
    tabs[currentTab].style.display = "block";

    removeAllPopups();

}

function validateForm() {
    let valid = true;
    let inputs = tabs[currentTab].getElementsByTagName("input");

    // Validate the input fields
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === "radio" || inputs[i].type === "checkbox") continue;

        if (inputs[i].value === '') {
            inputs[i].classList.add("is-danger");
            valid = false;
        } else {
            inputs[i].classList.remove("is-danger");
        }
    }

    // Validate the radio buttons  
    let radioContainers = tabs[currentTab].getElementsByClassName("radios");
    for (let radioContainer of radioContainers) {
        let radios = radioContainer.querySelectorAll('input[type="radio"]');
        let isChecked = Array.from(radios).some(radio => radio.checked);
        if (!isChecked) {
            valid = false;
            radioContainer.classList.add("has-background-danger-light");
        } else {
            radioContainer.classList.remove("has-background-danger-light");
        }
    }

    // Validate the checkboxes
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type !== "checkbox") continue;

        if (!inputs[i].checked) {
            valid = false;
            inputs[i].parentElement.classList.add("has-background-danger-light");
        } else {
            inputs[i].parentElement.classList.remove("has-background-danger-light");
        }
    }

    return valid;
}



function submitForm() {

    // Update Display Message
    var messageDiv = document.getElementById("message");
    var messageBody = messageDiv.querySelector(".message-body");
    messageDiv.classList.remove("is-success");
    messageDiv.classList.remove("is-danger");
    messageDiv.classList.add("is-warning");
    messageBody.textContent = "Submitting..";
    messageDiv.style.display = "block";
    window.scrollTo(0, document.body.scrollHeight);
    document.getElementById("next").disabled = true;

    // Collect the form data
    var formData = new FormData(document.getElementById("form"));
    var keyValuePairs = [];
    for (var pair of formData.entries()) {
        keyValuePairs.push(pair[0] + "=" + pair[1]);
    }
    keyValuePairs.push(`Time ${resumeType1}=${(times[1] - times[0]) / 1000}`);
    keyValuePairs.push(`Time ${resumeType2}=${(times[2] - times[1]) / 1000}`);
    var formDataString = keyValuePairs.join("&");
    console.log(formDataString);

    // Send a POST request to your Google Apps Script
    fetch(
        "https://script.google.com/macros/s/AKfycbwoUTKYNR82YRn_Eec_78M2M3g1rV-Cjc3zpmKYYEnBYxt7X13r9suEVzLcRpLgKGd7Qw/exec",
        {
            redirect: "follow",
            method: "POST",
            body: formDataString,
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
        }
    ).then(function (response) {

        // Check if the request was successful
        if (response.ok) {
            return response;
        } else {
            throw new Error("Failed to submit the form.");
        }

    }).then(function (data) {

        // Display a success message
        messageBody.textContent = "Data submitted successfully! Thank you for your response.";
        messageDiv.classList.remove("is-warning");
        messageDiv.classList.add("is-success");

    }).catch(function (error) {

        // Handle errors
        console.error(error);
        messageBody.textContent = "An error occurred while submitting the form.";
        messageDiv.classList.remove("is-warning");
        messageDiv.classList.add("is-danger");
        document.getElementById("next").disabled = false;

    });
}