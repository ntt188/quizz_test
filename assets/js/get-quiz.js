var quizAPI = 'https://opentdb.com/api.php?amount=5';
var quizlist = [];
var questionLength;
var quizz = 0;

function start() {
    // getQuiz((questions) => {
    //     // quizlist = quizlist.concat(questions.results);
    //     // console.log(quizlist);
    //     renderQuestion(questions.results);
    //     nextQuestion();
    // });
    startQuiz();    
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
//start quiz
function startQuiz() {
    var btnStart = document.querySelector('.btn-start');
        var containerQuiz = document.getElementById('container-quiz');

        btnStart.onclick = function() {
            var startQuiz = document.getElementById('start-quiz');

            startQuiz.style.display = 'none';
            containerQuiz.style.display = 'block';

            getQuiz((questions) => {;
                renderQuestion(questions.results);
                nextQuestion();
            });   
        };
}

//reder ra các câu hỏi
function renderQuestion(questions) {
    let listQuestionBlock = document.querySelector('#container-quiz');
    questionLength = questions.length;
    // console.log(questionLength);
    //tạo một mảng mới chứa các giá trị hiện theo tùy chỉnh
    let htmls = questions.map(function(question,index) {
        let answer = [];        
        answer = answer.concat(question.incorrect_answers);
        answer.push(`${question.correct_answer}`);
        //xắp xếp ngẫu nhiên
        answer.sort(function(){return 0.5 - Math.random()});
        let answersHTML = answer.map(function(data){
            return `
                <div class="quiz__answer--item">
                    <input type="radio"  name="question${index}" value="${data}">
                    <label for="html">${data}</label><br>
                </div>
            `;
        });
        if(index === 0) {
            return `
                <div class="quiz active">
                    <h1 class="quiz__header">Question ${index + 1}/${questionLength}</h1>
                    <p class="quiz__question">${question.question}</p>
                    <div class="quiz__answers">
                        ${answersHTML.join('')}
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
                ${answersHTML.join('')}
            </div>
            <a class="btn-next btn disabled">Next</a>
        </div>
        `;
    });
    //hiện các câu hỏi lên trang
    listQuestionBlock.innerHTML = htmls.join('');

    
    // questionHandling(questions);
    
    
}

//xử lý chuyển câu hỏi
function nextQuestion() {
    const questionBtn = document.querySelectorAll('.btn-next');
    const quizs = document.querySelectorAll('.quiz');

    // console.log(questionBtn.length);
    // console.log(quizs);
    //Ẩn hiện các câu hỏi
    const quiz = function(index) {
        quizs.forEach((quiz) => {
            quiz.classList.remove('active');
        });

        quizs[index + 1].classList.add('active');
    }

    //xử lý khi click vào btn
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

//khi đến câu hỏi cuối thì chuyển giao diện kết quả
function endQuiz() {
    var containerQuiz = document.getElementById('container-quiz');
    var endQuiz = document.getElementById('end-quiz');

    endQuiz.style.display = 'block';
    containerQuiz.style.display = 'none';
}

//Xử lý khi trả lời câu hỏi
function questionHandling(questions) {
    const total = 0;
    questions.forEach(function(question, index) {
        const listAnswer = document.querySelectorAll(`input[name="question${index}"]`);
        
        const exactly = function(i) {
            // listAnswer.forEach((answer) => {
            //     answer.setAttribute('disabled');
            // });

            listAnswer[i].classList.add('exactly');
        };
        const wrong = function(i) {
            // listAnswer.forEach((answer) => {
            //     answer.setAttribute('disabled');
            // });

            listAnswer[i].classList.add('wrong');
        };

        listAnswer.forEach((answer, i) => {
            answer.addEventListener('change', () => {
                if(answer.value == question.correct_answer){
                    exactly(i);
                }else {
                    wrong(i);
                }
            });
        });
    });
}

//Kiểm tra câu trả lời
function checkAnswer() {
    
    questionHandling(quizlist);
    //xử lý khi click
}