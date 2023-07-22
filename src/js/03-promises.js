import Notiflix from 'notiflix';

const delayElement = document.querySelector('input[name="delay"]');
const stepElement = document.querySelector('input[name="step"]');
const amountElement = document.querySelector('input[name="amount"]');
const btnElement = document.querySelector('button');

btnElement.addEventListener('click', onClickBtn);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onClickBtn(event) {
  event.preventDefault();

  function createPromises(delay, step, amount) {
    let delayOfPromise = delay;
    for (let i = 1; i <= amount; i += 1) {
      createPromise(i, delayOfPromise)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
      delayOfPromise += step;
    }
  }
  createPromises(
    Number(delayElement.value),
    Number(stepElement.value),
    Number(amountElement.value)
  );
}
