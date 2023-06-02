var quizAPI = 'https://opentdb.com/api.php?amount=5';

getQuiz();

//Lấy dữ liệu về
function getQuiz() {
    fetch(quizAPI)
        .then(function(response) {
            return response.json();
        }) 
        .then((quiz) => {
            console.log(quiz);
        });
}