let currentSection = null;
let questions = [];
const contentDiv = document.getElementById("content");
const backButton = document.getElementById("back-button");
const mainTitle = document.getElementById("main-title");

async function loadSections() {
  const response = await fetch("sections.json");
  const data = await response.json();
  showSections(data.sections);
}

function showSections(sections) {
  contentDiv.innerHTML = "";
  mainTitle.textContent = "Select a Section";

  sections.forEach(section => {
    const button = document.createElement("button");
    button.textContent = section.name;
    button.onclick = () => loadQuestions(section.file);
    contentDiv.appendChild(button);
  });
}

async function loadQuestions(file) {
  currentSection = file;
  const response = await fetch(`data/${file}`);
  const data = await response.json();
  questions = data.questions;
  showQuestions();
}

function showQuestions() {
  contentDiv.innerHTML = "";
  mainTitle.textContent = `Questions for ${currentSection}`;
  backButton.style.display = "block";

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `
      <h3>Question ${index + 1}</h3>
      <p>${q.question}</p>
      <ul>
        ${q.options.map((option, i) => `
          <li>
            <input type="radio" name="q${index}" id="q${index}o${i}" value="${i}">
            <label for="q${index}o${i}">${option}</label>
          </li>
        `).join("")}
      </ul>
      <button onclick="showAnswer(${index})">Show Answer</button>
      <p id="answer-${index}" style="display:none;color:green;">Answer: ${q.explanation}</p>
    `;
    contentDiv.appendChild(questionDiv);
  });
}

function showAnswer(index) {
  document.getElementById(`answer-${index}`).style.display = "block";
}

backButton.onclick = () => {
  currentSection = null;
  questions = [];
  backButton.style.display = "none";
  loadSections();
};

loadSections();
