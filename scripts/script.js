let popup = document.querySelector('.pop-up');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.pop-up__close-button');
let Name = document.querySelector('.profile__name');
let About = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.block__element_type_name');
let jobInput = document.querySelector('.block__element_type_about');

function open() {
  popup.classList.add('pop-up_opened');
  nameInput.value = Name.textContent;
  jobInput.value = About.textContent;
}

function close() {
  popup.classList.remove('pop-up_opened');
}

editButton.addEventListener('click', open);
closeButton.addEventListener('click', close);

let formElement = document.querySelector('.pop-up__form');

function formSubmitHandler (evt) {
  evt.preventDefault();
  Name.textContent = nameInput.value;
  About.textContent = jobInput.value;
  close();
}

formElement.addEventListener('submit', formSubmitHandler);
