document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const category = path.split('/')[path.split('/').length - 2];
    loadQuizData(category);
});

async function loadQuizData(category) {
    try {
        const response = await fetch(`categories/${category}/updates.json`);
        const quizData = await response.json();
        displayQuiz(quizData);
    } catch (error) {
        console.error('خطأ في جلب بيانات الاختبار:', error);
    }
}

function displayQuiz(quizData) {
    const form = document.getElementById('quiz-form');
    quizData.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-container');

        const questionTitle = document.createElement('h3');
        questionTitle.textContent = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionTitle);

        q.options.forEach((option, i) => {
            const optionLabel = document.createElement('label');
            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = `question-${index}`;
            optionInput.value = i;
            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(document.createTextNode(option));
            questionDiv.appendChild(optionLabel);
            questionDiv.appendChild(document.createElement('br'));
        });

        form.appendChild(questionDiv);
    });
}

function submitQuiz() {
    const path = window.location.pathname;
    const category = path.split('/')[path.split('/').length - 2];
    fetch(`categories/${category}/updates.json`)
        .then(response => response.json())
        .then(quizData => {
            let score = 0;
            quizData.forEach((q, index) => {
                const selected = document.querySelector(`input[name="question-${index}"]:checked`);
                if (selected && parseInt(selected.value) === q.answer) {
                    score++;
                }
            });
            document.getElementById('result').textContent = `لقد أجبت على ${score} من أصل ${quizData.length} بشكل صحيح.`;
        })
        .catch(error => console.error('خطأ في معالجة الاختبار:', error));
}
