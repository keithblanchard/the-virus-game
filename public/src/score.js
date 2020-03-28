function initHighScore () {
    const highScore = localStorage.getItem('high-score');
    if (highScore) {
        document.getElementById("high-score").innerHTML = highScore;
    } else {
        document.getElementById("high-score").innerHTML = '0';
    }
}

function initPreviousHighScore () {
    let previousHighScore = localStorage.getItem('previous-high-score');
    if (parseInt(previousHighScore)) {
        document.getElementById("previous-high-score").innerHTML = previousHighScore;
    } else {
        previousHighScore = '0';
    }
    localStorage.setItem('previous-high-score', previousHighScore);
    document.getElementById("previous-high-score").innerHTML = previousHighScore;
}

export function setPreviousHighScore (score) {
    const previousHighScore = localStorage.getItem('previous-high-score');
    if (parseInt(score) > parseInt(previousHighScore)) {
        localStorage.setItem('previous-high-score', score);
    }
}

export function init () {
    initHighScore();
    initPreviousHighScore();
}

export default {
    init
};