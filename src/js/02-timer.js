import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtnElement = document.querySelector('button[data-start]');
const resetBtnElement = document.querySelector('button[data-reset]');
const inputElement = document.querySelector('#datetime-picker');
const daysElement = document.querySelector('span[data-days]');
const hoursElement = document.querySelector('span[data-hours]');
const minutesElement = document.querySelector('span[data-minutes]');
const secondsElement = document.querySelector('span[data-seconds]');

let selectedDate = null;

startBtnElement.disabled = true;
resetBtnElement.disabled = true;

Notiflix.Notify.init({
  position: 'center-top',
  showOnlyTheLastOne: true,
  clickToClose: true,
});

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    if (Date.now() >= selectedDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtnElement.disabled = false;
    }
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startBtnElement.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  startBtnElement.disabled = true;
  inputElement.disabled = true;
  resetBtnElement.disabled = false;

  const timerStartValue = convertMs(selectedDate - Date.now());
  daysElement.textContent = addLeadingZero(timerStartValue.days);
  hoursElement.textContent = addLeadingZero(timerStartValue.hours);
  minutesElement.textContent = addLeadingZero(timerStartValue.minutes);
  secondsElement.textContent = addLeadingZero(timerStartValue.seconds);

  const timerId = setInterval(() => {
    const timerValue = convertMs(selectedDate - Date.now());
    daysElement.textContent = addLeadingZero(timerValue.days);
    hoursElement.textContent = addLeadingZero(timerValue.hours);
    minutesElement.textContent = addLeadingZero(timerValue.minutes);
    secondsElement.textContent = addLeadingZero(timerValue.seconds);
    if (
      daysElement.textContent === '00' &&
      hoursElement.textContent === '00' &&
      minutesElement.textContent === '00' &&
      secondsElement.textContent === '00'
    ) {
      clearInterval(timerId);
      inputElement.disabled = false;
    }
  }, 1000);

  resetBtnElement.addEventListener('click', onResetClick);

  function onResetClick() {
    clearInterval(timerId);

    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';

    inputElement.disabled = false;
    resetBtnElement.disabled = true;
  }
}
