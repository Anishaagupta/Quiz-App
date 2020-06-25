const user = document.getElementById("user")
const save = document.getElementById("save")
const finalScore = document.getElementById("finalScore")
const mostRecentScore = localStorage.getItem("mostRecentScore")
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

const MAX_HIGH_SCORES = 5;
console.log(highScores) 

finalScore.innerText = mostRecentScore;

user.addEventListener("keyup", () =>{
    save.disabled = user.nodeValue; 
})

saveScore = e =>{
    console.log("Click the save buttton")
    e.preventDefault();

    const score = {
        score: Math.floor(Math.random() * 100),
        name: user.value
    };
    highScores.push(score)
    highScores.sort( (a,b) => b.score - a.score)// to get the 5 highest score
    highScores.splice(5)// upto 5 user's score
    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign("/")
    console.log(highScores)
}