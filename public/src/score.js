function initHighScore () {
	const highScore = localStorage.getItem('high-score');
	if (highScore) {
		document.getElementById('high-score').innerHTML = highScore;
	} else {
		document.getElementById('high-score').innerHTML = '0';
	}
}

function setHighScore (score) {
	const highScore = parseInt(localStorage.getItem('high-score'));
	const intHighScore = highScore ? highScore : 0;
	const parseScore = parseInt(score);
	const intScore = parseScore ? parseScore : 0;
	if (intScore > intHighScore) {
		localStorage.setItem('high-score', score);
	}

}

function init () {
	document.getElementById('score').style.color = 'white';
	initHighScore();
}

export default {
	init,
	initHighScore,
	setHighScore
};