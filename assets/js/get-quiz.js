var quizAPI = 'https://opentdb.com/api.php?amount=5';
var quizlist = [];
var questionLength;
var quizz = 0;
var startTime;
var endTime

function start() {
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
            const startQuiz = document.getElementById('start-quiz');

            startQuiz.style.display = 'none';
            containerQuiz.style.display = 'block';

            getQuiz((questions) => {
                quizlist = questions.results;
                renderQuestion(questions.results);
                nextQuestion();
                // console.log(quizlist)
            });   
            startTime = window.performance.now();
            console.log(startTime)
        };
}

//reder ra các câu hỏi
function renderQuestion(questions) {
    let listQuestionBlock = document.querySelector('#container-quiz');
    questionLength = questions.length;
    //tạo một mảng mới chứa các giá trị hiện theo tùy chỉnh
    let htmls = questions.map(function(question,index) {
        let answer = [];        
        answer = answer.concat(question.incorrect_answers);
        answer.push(`${question.correct_answer}`);
        //xắp xếp ngẫu nhiên
        answer.sort(function(){return 0.5 - Math.random()});
        let answersHTML = answer.map(function(data){
            return `
                <div class="quiz__answer--item"">
                    <input ansselect${index} type="radio" onclick="checkAnswer('${index}','${data}',this.parentElement)" name="question${index}" value="${data} >
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
                    <button btnNext${index} class="btn-next btn disabled" disabled>Next</button>
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
            <button btnNext${index} class="btn-next btn disabled" disabled>Next</button>
        </div>
        `;
    });
    //hiện các câu hỏi lên trang
    listQuestionBlock.innerHTML = htmls.join('');
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
                endTime = window.performance.now();
                console.log(endTime);
                endQuiz();                
            }else {
                quiz(i);
            }
        });
    });
}

//khi đến câu hỏi cuối thì chuyển giao diện kết quả
function endQuiz() {
    const containerQuiz = document.getElementById('container-quiz');
    const endQuiz = document.getElementById('end-quiz');
    var time = endTime - startTime;
    console.log(time);

    endQuiz.style.display = 'block';
    containerQuiz.style.display = 'none';

    const endQuizContain = document.querySelector('.end-quiz__contain');
    let html= '';
    if(quizz >= (questionLength / 2)) {
        html += `
            <h1>congratulations!!</h1>
            <p>You are amazing!!</p>
            <p>${quizz}/${questionLength} correct answers</p>
            <a class="btn-end btn btn--size-s">Play Again</a>
        `;
    }else {
        html += `
            <h1>Completed!</h1>
            <p>Better luck next time!</p>
            <p>${quizz}/${questionLength} correct answers</p>
            <a class="btn-end btn btn--size-s">Play Again</a>
        `;
    }

    endQuizContain.innerHTML = html;
    playAgain();
}

//play again
function playAgain() {
    let playAgainBtn = document.querySelector('.btn-end');
    // console.log(playAgainBtn);

    playAgainBtn.onclick = function() {
        document.querySelectorAll('.quiz').forEach((quiz) => {
            quiz.remove;
        });
        const startQuiz = document.getElementById('start-quiz');
        const endQuiz = document.getElementById('end-quiz');

        endQuiz.style.display = 'none';
        startQuiz.style.display = 'block';
        quizz=0;
    };
}

//Xử lý khi trả lời câu hỏi
function questionHandling(kq,questions) {
    // const total = 0;
    // questions.forEach(function(question, index) {
    //     const listAnswer = document.querySelectorAll(`input[name="question${index}"]`);
        
    //     const exactly = function(i) {
    //         listAnswer.forEach((answer) => {
    //             answer.setAttribute('disabled');
    //         });

    //         listAnswer[i].classList.add('exactly');
    //     };
    //     const wrong = function(i) {
    //         listAnswer.forEach((answer) => {
    //             answer.setAttribute('disabled');
    //         });

    //         listAnswer[i].classList.add('wrong');
    //     };

    //     // listAnswer.forEach((answer, i) => {
    //     //     answer.addEventListener('change', () => {
    //     //         if(answer.value == question.correct_answer){
    //     //             exactly(i);
    //     //         }else {
    //     //             wrong(i);
    //     //         }
    //     //     });
    //     // });
    //     const exactly = function(i) {
    //         // listAnswer.forEach((answer) => {
    //         //     answer.setAttribute('disabled');
    //         // });

    //         listAnswer[i].classList.add('exactly');
    //     };
        
    // });

    if(kq) {

    }
}

//Kiểm tra câu trả lời
function checkAnswer(index,data,element) {
    document.querySelectorAll(`[ansselect${index}]`).forEach((item) => {
        item.disabled = 'true';
    });
    let btnNext = document.querySelector(`[btnNext${index}]`);
    btnNext.removeAttribute('disabled');
    btnNext.classList.remove('disabled');
    if (quizlist[index].correct_answer == data) {
        element.classList.add('exactly');
        quizz++;
    }else {
        element.classList.add('wrong');
    }
}