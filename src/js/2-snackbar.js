import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = form.elements['delay'];
  const stateInput = form.elements['state'];
  const delay = Number(delayInput.value);
  const state = Array.from(stateInput).find(r => r.checked)?.value;

  if (!state || !delay) return;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(d => {
      iziToast.success({
        title: '✅ Fulfilled',
        message: `Fulfilled promise in ${d}ms`,
        position: 'topRight',
      });
    })
    .catch(d => {
      iziToast.error({
        title: '❌ Rejected',
        message: `Rejected promise in ${d}ms`,
        position: 'topRight',
      });
    });

  form.reset();
});
