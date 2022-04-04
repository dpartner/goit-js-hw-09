import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

const ref = {
  form: document.querySelector('.form'),
};

ref.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const delay = Number(e.currentTarget.delay.value);
  const delayStep = Number(e.currentTarget.step.value);
  const amount = Number(e.currentTarget.amount.value);
  let newDelay = delay;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    newDelay += delayStep;
  }
}
