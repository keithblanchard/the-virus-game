let sound;
let toggleButton;

export function endGame () {
    sound.pause();
    sound.currentTime = 0.0;
}

export function init () {
    const isDisabledAudio = localStorage.getItem('disable-audio');
    if (isDisabledAudio === 'yes') {
        toggleButton.innerHTML = 'Enable Music';
    } else {
        sound.currentTime = 0.0;
        sound.play();
        toggleButton.innerHTML = 'Disable Music';
    }
}

export function enableAudio () {
    sound.play();
    toggleButton.innerHTML = 'Disable Music';
    localStorage.setItem('disable-audio', 'no');
}

export function disableAudio () {
    sound.pause();
    toggleButton.innerHTML = 'Enable Music';
    localStorage.setItem('disable-audio', 'yes');
}

export function toggleAudio () {
    if (sound.paused) {
        enableAudio();
    } else {
        disableAudio();
    }
}

export function onLoad () {
    sound = document.getElementById('sound');
    toggleButton = document.getElementById('sound-toggle-button');
    const isDisabledAudio = localStorage.getItem('disable-audio');
    if (isDisabledAudio === 'yes') {
        toggleButton.innerHTML = 'Enable Music';
    } else {
        toggleButton.innerHTML = 'Disable Music';
    }
}

export default {
    toggleAudio,
    endGame,
    init,
    onLoad,
}