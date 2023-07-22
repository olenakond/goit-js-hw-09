const startElement = document.querySelector('button[data-start]');
const stopElement = document.querySelector('button[data-stop]');
const bodyElement = document.querySelector('body');

startElement.addEventListener('click', onStartBtnClick);
stopElement.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let timerId = null;

function onStartBtnClick() {
  bodyElement.style.backgroundColor = getRandomHexColor();

  timerId = setInterval(() => {
    bodyElement.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startElement.disabled = true;
  stopElement.disabled = false;
}

function onStopBtnClick() {
  clearInterval(timerId);
  startElement.disabled = false;
  stopElement.disabled = true;
}
