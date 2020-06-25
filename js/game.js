const ques = document.getElementById("ques")
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText')
const scoreText = document.getElementById('score')
const progressBarFull = document.getElementById("progressBarFull")
 

let currentQues = {}
let acceptAns = false;
let score = 0;
let quesCounter = 0;
let availableQues = []
let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple").then(res => {
    //console.log(res);
    return res.json();
}).then(loadedQues =>{
    console.log(loadedQues.results);

    questions = loadedQues.results.map(loadedQues =>{
        const formattedQues = {
            ques: loadedQues.question
        }
    
        const answerChoices = [...loadedQues.incorrect_answers];
        formattedQues.ans = Math.floor(Math.random() * 3)+1;
        answerChoices.splice(formattedQues.answer-1, 0, loadedQues.correct_answer);
         
        answerChoices.forEach((choice, index) =>{
            formattedQues["choice" + [index+1]] = choice;
        })

        return formattedQues;
    });
    
    startGame();

}).catch(err =>{
    console.log(err);
})

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

const startGame = () =>{
    quesCounter = 0;
    score = 0;
    availableQues = [...questions] //(...)is spread operators & used to spread on each items of array & create new array
    getNewQues();
    
}

const getNewQues = () => {

    if(availableQues.length === 0 || quesCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score)
        //go to end page
        return window.location.assign("/html/end.html")
    }
    quesCounter++
    //to count the number of left ques
    progressText.innerText = `Question ${quesCounter} /  ${MAX_QUESTIONS}`;
    
    // to update progress bar
    let x = (quesCounter / MAX_QUESTIONS)*100
    progressBarFull.style.width = `${x}%`;
    
    const quesIndex = Math.floor(Math.random() * availableQues.length)
    currentQues = availableQues[quesIndex]
    ques.innerText = currentQues.ques;

    choices.forEach(choice =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQues['choice' + number]
    });
    
    availableQues.splice(quesIndex, 1);
    acceptAns = true;
}

choices.forEach(choice =>{
    choice.addEventListener("click", e =>{
         
        if(!acceptAns) return;
        acceptAns = false;

        const selectedChoice = e.target;
        const selectedAns = selectedChoice.dataset['number']

        const classToApply = selectedAns == currentQues.ans ? "correct" : "incorrect";
        if(classToApply === "correct"){
            increamentScore(CORRECT_BONUS)
        }
        
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(()=>{

            selectedChoice.parentElement.classList.remove(classToApply);  
            getNewQues()

        },1000)
    })
})

increamentScore = num =>{
    score += num;
    scoreText.innerText = score;
}

