const throttle = require('lodash.throttle');
const form = document.querySelector('.feedback-form');
const FORM_STORAGE = 'feedback-form-state';
updateForm();
form.addEventListener('input', throttle(saveInfo, 500));
form.addEventListener('submit', submHandler);

function saveInfo() {
  const obj = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  localStorage.setItem(FORM_STORAGE, JSON.stringify(obj));
}

function getDataLocalStr(key) {
  return localStorage.getItem(key);
}

function updateForm() {
  const getObj = getDataLocalStr(FORM_STORAGE);
  if (!getObj) return;
  const { email, message } = JSON.parse(getObj);
  form.querySelector('input').value = email;
  form.querySelector('textarea').value = message;
}

function submHandler(evt) {
  const getObj = getDataLocalStr(FORM_STORAGE);
  const { email, message } = JSON.parse(getObj);
  console.log({ email, message });
  form.reset();
  localStorage.clear();
  evt.preventDefault();
}
