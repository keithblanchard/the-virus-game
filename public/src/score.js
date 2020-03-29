function initHighScore (highScore) {
    if (highScore) {
        document.getElementById("high-score").innerHTML = highScore;
    } else {
        document.getElementById("high-score").innerHTML = '0';
    }
}

export function setHighScore (score) {
    const highScore = localStorage.getItem('high-score');
    if (parseInt(score) > parseInt(highScore)) {
        localStorage.setItem('high-score', score);
    }
    parseInt(highScore);
}

export function init (score) {
    document.getElementById("score").style.color = 'white';
    initHighScore(setHighScore(score));
}

export default {
    init,
    initHighScore
};