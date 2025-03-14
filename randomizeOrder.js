// Functions to insert quesitons
function insertQuestions(questions, choices, containerId, resumeType) {
    var container = document.getElementById(containerId);

    for (const [index, question] of questions.entries()) {
        var questionDiv = document.createElement("div");
        questionDiv.className = "field";
        questionDiv.innerHTML = `
      <label class="label">${question}</label>
      <div class="radios">
        <label class="radio">
          <input type="radio" name="Question ${index + 1} ${resumeType}" value="a" /> ${choices[index][0]}
        </label><br>
        <label class="radio">
          <input type="radio" name="Question ${index + 1} ${resumeType}" value="b" /> ${choices[index][1]}
        </label><br>
        <label class="radio">
          <input type="radio" name="Question ${index + 1} ${resumeType}" value="c" /> ${choices[index][2]}
        </label>
      </div>
    `;
        container.appendChild(questionDiv);
    }
}

// Randomize Resumes
var resumes = ["pdfs\\nf_resume.pdf", "pdfs\\sn_resume.pdf"];

var questions = [[ // questions for NF
    "1. What is Nigel Fu's current academic status?",
    "2. What programming languages is Nigel proficient in?",
    "3. What was one of Nigel's responsibilities as an Undergraduate Research Assistant?",
    "4. What area of chemical engineering is Nigel passionate about?",
    "5. During his role as a Process Engineering Intern, what simulation tool did Nigel use?"
], [ // questions for SN
    "1. Where is Serena currently pursuing her Bachelor's degree?",
    "2. What was one of Serena's main responsibilities as a Hardware Engineering Intern?",
    "3. In her Undergraduate Research Assistant role, what kind of systems did Serena work on?",
    "4. Which of the following is NOT listed as one of Serena's skills?",
    "5. What was the primary objective of Serena's custom FPGA-based signal processing project?"
]];

var choices = [
    [ // choices for NF
        ["First-year undergraduate student", "Third-year undergraduate student", "Graduate student"],
        ["Python and C", "Java and C++", "R and JavaScript"],
        ["Designing mechanical components for manufacturing", "Conducting laboratory experiments and maintaining lab equipment", "Developing mobile applications for chemical process monitoring"],
        ["Polymer synthesis", "Environmental remediation", "Data analysis and process design"],
        ["COMSOL Multiphysics", "SolidWorks", "ANSYS Fluent"]
    ],
    [ // choices for SN
        ["University of Toronto", "Massachusetts Institute of Technology (MIT)", "Stanford University"],
        ["Writing firmware for mobile applications", "Developing FPGA-based hardware acceleration modules using VHDL/Verilog", "Designing web-based user interfaces"],
        ["High-performance computing clusters", "Low-power IoT applications", "Autonomous robotic systems"],
        ["PCB layout and schematic design", "Web development with JavaScript", "Hardware debugging using oscilloscopes and logic analyzers"],
        ["To develop a machine learning algorithm for predictive maintenance", "To create a new power-efficient microcontroller", "To optimize performance for low-latency applications"]
    ]
];

// 0 for NF, 1 for SN
var resumeOrder = Math.floor(Math.random() * 2);
var resume_types = ["NF", "SN"];

// 0 for pop-up ads first, 1 for pop-up ads second
var popupAdsOrder = Math.floor(Math.random() * 2);
var popup_ads_types = ["pop-up", "none"];

// update resume 1
document.getElementById("resume1").src = resumes[resumeOrder];

var resumeType1 = resume_types[resumeOrder] + " "+ popup_ads_types[popupAdsOrder];
insertQuestions(questions[resumeOrder], choices[resumeOrder], "questions1", resumeType1);

// update resume 2
document.getElementById("resume2").src = resumes[1 - resumeOrder];
var resumeType2 = resume_types[1 - resumeOrder] + " "+ popup_ads_types[1 - popupAdsOrder];
insertQuestions(questions[1 - resumeOrder], choices[1 - resumeOrder], "questions2", resumeType2);