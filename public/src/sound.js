let sound;
let toggleButton;
let icon;
let textElement;

export function endGame () {
  sound.pause();
  sound.currentTime = 0.0;
}

export function init () {
  const isDisabledAudio = localStorage.getItem('disable-audio');
  if (isDisabledAudio === 'yes') {
    setIconOff();
  } else {
    sound.currentTime = 0.0;
    sound.play();
    setIconOn();
  }
}

export function enableAudio () {
  sound.play();
  setIconOn();
  localStorage.setItem('disable-audio', 'no');
}

export function disableAudio () {
  sound.pause();
  setIconOff();
  localStorage.setItem('disable-audio', 'yes');
}

export function toggleAudio () {
  if (sound.paused) {
    enableAudio();
  } else {
    disableAudio();
  }
}

function setIconOn () {
  icon.src = '../svg/speakerOn.svg';
}

function setIconOff () {
  icon.src = '../svg/speakerOff.svg';
}

export function onLoad () {
  sound = document.getElementById('sound');
  toggleButton = document.getElementById('sound-toggle-button');
  icon = document.createElement('img');
  toggleButton.appendChild(icon);
  textElement = document.createElement('div');
  toggleButton.appendChild(textElement);

  const isDisabledAudio = localStorage.getItem('disable-audio');
  if (isDisabledAudio === 'yes') {
    setIconOff();
  } else {
    setIconOn();
  }
}

export default {
  toggleAudio,
  endGame,
  init,
  onLoad,
};