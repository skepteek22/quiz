import questions from "./quizQuestions.json" assert { type: 'json' };
import quizState from './quiz.js';

const appField = document.querySelector(".app")
const questionTitle = document.querySelector(".app__question")
const answersList = document.querySelector(".app__answers-list")
const nextButton = document.createElement('button')
const buttons = document.querySelectorAll(".app__answer-btn")
const btn_container = document.querySelector(".app__btn-container")
const progressBar = document.querySelector(".app__progress-bar")
const percentageOfProgressBar = document.querySelector(".app__percentage-of-progress")
const listAndCaption = document.querySelector(".app__list-and-caption")
var points = 0


btn_container.appendChild(nextButton)

nextButton.textContent = "Next";
nextButton.style.display = "none";
nextButton.type = 'button';
nextButton.className = "next-btn";

function createIncrementor(initialValue) {
    let value = initialValue;
  
    return function () {
      value += 10;
      return value;
    };
}

const incrementBy10 = createIncrementor(0)





nextButton.addEventListener('click', () => {
    quizState.indexOfCurrentQuestion++
    nextButton.style.display = "none"
    resetButtonStyles()
    updateProgressBar()
    updateCurrentQuestion();
    resetDisableButtons();
    if (quizState.indexOfCurrentQuestion < questions.length) {
        showQuestions();
    } else {
        showResult();
    }
})

nextButton.addEventListener("mouseover", function () {
    nextButton.style.backgroundColor = '#0f6b02';
    nextButton.style.color = "#fff"
});

nextButton.addEventListener("mouseout", function () {
    nextButton.style.backgroundColor = '#fff';
    nextButton.style.color = "black "
});

buttons.forEach(item => {
    item.addEventListener('click', () => {
        const isCorrect = checkAnswer(item.textContent);

        if (isCorrect) {
            item.style.backgroundColor = "green";
            item.style.color = "#fff"
            points++
        } else {
            item.style.backgroundColor = "red";
            item.style.color = "#fff"
            showCorrectAnswer(quizState.currentQuestion);
        }
        disableAllButtons()
        nextButton.style.display = "block";
    });
});



function checkAnswer(selectedOption) {
    return selectedOption === quizState.currentQuestion.correctAnswer;
}




function disableAllButtons(){
    buttons.forEach( btn => {
        btn.disabled = true
        btn.classList.add("no-hover")
        btn.style.cursor = 'not-allowed'
    })
}

function resetDisableButtons() {
    buttons.forEach( btn => {
        btn.disabled = false
        btn.classList.remove("no-hover")
        btn.style.cursor = 'pointer'
        btn.style.color = "black"
    })
}


function resetButtonStyles() {
    buttons.forEach(item => {
        item.style.backgroundColor = '';
        item.style.color = 'black'; 
    });
}




function updateProgressBar() {
    let percentage = incrementBy10();
    progressBar.style.width = `${percentage}%`
    percentageOfProgressBar.textContent = `${percentage}%`

}


function updateCurrentQuestion() {
    quizState.currentQuestion = questions[quizState.indexOfCurrentQuestion];
}



function showResult() {
    listAndCaption.innerHTML = `<p style="margin-bottom: 7px; font-size: 20px">Your points: ${points}</p>`
    listAndCaption.style.justifyContent = 'center'
    listAndCaption.style.alignItems = 'center'
    const resultImg = document.createElement('img')
    resultImg.style.width = '100%'
    resultImg.style.height = '100%'
    resultImg.src = './imgs/result.png'
    resultImg.alt = 'result image'
    listAndCaption.appendChild(resultImg)
}

function showQuestions() {
    resetButtonStyles()

    questionTitle.textContent = quizState.currentQuestion.question_title

    buttons.forEach((item, index) => {
        item.textContent = quizState.currentQuestion.answers[index];
    });
}

function showCorrectAnswer(currentQuestion) {
    buttons.forEach(btn => {
        if (quizState.currentQuestion.correctAnswer === btn.textContent) {
            btn.style.backgroundColor = "green";
            btn.style.color = "#fff"
        }
    });
}


updateCurrentQuestion();
showQuestions();