let backgroundInterval = null;

const ref = {
  body: document.querySelector('body'),
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

ref.start.addEventListener('click', onStart);
ref.stop.addEventListener('click', onStop);

function onStart() {
  backgroundInterval = setInterval(changeColor, 1000);
  ref.start.setAttribute('disabled', '');
}

function onStop() {
  clearInterval(backgroundInterval);
  ref.start.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
  ref.body.style.backgroundColor = getRandomHexColor();
}
