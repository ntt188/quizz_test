var quizAPI = 'https://opentdb.com/api.php?amount=5';
var quizlist = [];
var questionLength;

function start() {
    getQuiz((questions) => {
        // quizlist = quizlist.concat(questions.results);
        // console.log(quizlist);
        renderQuestion(questions.results);
    });

    // nextQuestion();
}

start();

//callAPI
//Lấy dữ liệu về
function getQuiz(callBack) {
    fetch(quizAPI)
        .then(function(response) {
            return response.json();
        }) 
        .then(callBack);
}

//Xử lý
//reder ra các câu hỏi
function renderQuestion(questions) {
    let listQuestionBlock = document.querySelector('#container-quiz');
    questionLength = questions.length;
    // console.log(questionLength);
    let htmls = questions.map(function(question,index) {
        if(index === 0) {
            return `
                <div class="quiz active">
                    <h1 class="quiz__header">Question ${index + 1}/${questionLength}</h1>
                    <p class="quiz__question">${question.question}</p>
                    <div class="quiz__answers">
                        <div class="quiz__answer--item">
                            <input type="radio" id="html" name="fav_language" value="HTML">
                            <label for="html">${question.incorrect_answers[0]}</label><br>
                        </div>
                        <div class="quiz__answer--item">
                            <input type="radio" id="css" name="fav_language" value="CSS">
                            <label for="css">${question.incorrect_answers[1]}</label><br>
                        </div>
                        <div class="quiz__answer--item">
                            <input type="radio" id="javascript" name="fav_language" value="JavaScript">
                            <label for="javascript">${question.incorrect_answers[2]}</label>
                        </div>  
                    </div>
                    <a class="btn-next btn disabled">Next</a>
                </div>
                `;
        }
        return `
        <div class="quiz">
            <h1 class="quiz__header">Question ${index + 1}/${questionLength}</h1>
            <p class="quiz__question">${question.question}</p>
            <div class="quiz__answers">
                <div class="quiz__answer--item">
                    <input type="radio" id="html" name="fav_language" value="HTML">
                    <label for="html">${question.incorrect_answers[0]}</label><br>
                </div>
                <div class="quiz__answer--item">
                    <input type="radio" id="css" name="fav_language" value="CSS">
                    <label for="css">${question.incorrect_answers[1]}</label><br>
                </div>
                <div class="quiz__answer--item">
                    <input type="radio" id="javascript" name="fav_language" value="JavaScript">
                    <label for="javascript">${question.incorrect_answers[2]}</label>
                </div>  
            </div>
            <a class="btn-next btn disabled">Next</a>
        </div>
        `;
    });

    listQuestionBlock.innerHTML = htmls.join('');

    nextQuestion();
}

function nextQuestion() {
    const questionBtn = document.querySelectorAll('.btn-next');
    const quizs = document.querySelectorAll('.quiz');

    // console.log(questionBtn.length);
    // console.log(quizs);
    const quiz = function(index) {
        quizs.forEach((quiz) => {
            quiz.classList.remove('active');
        });

        quizs[index + 1].classList.add('active');
    }

    questionBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            if(i === (questionLength - 1)){
                endQuiz();
            }else {
                quiz(i);
            }
        });
    });
}

function endQuiz() {
    var containerQuiz = document.getElementById('container-quiz');
    var endQuiz = document.getElementById('end-quiz');

        endQuiz.style.display = 'block';
        containerQuiz.style.display = 'none';
}