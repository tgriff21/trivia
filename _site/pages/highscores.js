const highscoreList = document.querySelector('#highscoreList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highscoreList.innerHTML = 
highScores.map(score => {
    return `<li class="high-score"> ${score.name} - ${score.score} </li>`
}).join('')



