document.addEventListener('DOMContentLoaded', () => {
    fetch('sections.json')
        .then(response => response.json())
        .then(data => {
            const mainSection = document.getElementById('main-section');
            data.sections.forEach(section => {
                const sectionDiv = document.createElement('div');
                sectionDiv.classList.add('subsection');
                sectionDiv.innerHTML = `<h3>${section.name}</h3>`;
                section.subsections.forEach(subsection => {
                    const button = document.createElement('button');
                    button.textContent = subsection.name;
                    button.onclick = () => loadQuiz(subsection.file);
                    sectionDiv.appendChild(button);
                });
                mainSection.appendChild(sectionDiv);
            });
        });
});

function loadQuiz(file) {
    fetch(`data/${file}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('quiz-title').textContent = file.replace('_', ' ').replace('.json', '') + ' Quiz';
            document.getElementById('total-questions').textContent = data.length;
            const quizForm = document.getElementById('quiz-form');
            quizForm.innerHTML = '';
            data.forEach((question, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.innerHTML = `
                    <p>${index + 1}. ${question.question}</p>
                    ${question.options.map((option, i) => `
                        <label>
                            <input type="radio" name="question${index}" value="${i}">
                            ${option}
                        </label><br>
                    `).join('')}
                `;
                quizForm.appendChild(questionDiv);
            });
            document.getElementById('quiz-container').style.display = 'block';
        });
}

function showResult() {
    const quizForm = document.getElementById('quiz-form');
    const resultDiv = document.getElementById('result');
    let score = 0;
    const questions = quizForm.querySelectorAll('div');
    questions.forEach((question, index) => {
        const selectedOption = question.querySelector('input:checked');
        if (selectedOption) {
            const selectedValue = parseInt(selectedOption.value);
            if (selectedValue === data[index].answer) {
                score++;
            }
        }
    });
    resultDiv.innerHTML = `Your score is ${score} out of ${questions.length}.`;
}
