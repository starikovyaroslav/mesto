let popup = document.querySelector('.pop-up');
let EditButton = document.querySelector('.profile__edit-button');
let CloseButton = document.querySelector('.pop-up__close-button');
let Name = document.querySelector('.profile__name');
let About = document.querySelector('.profile__subtitle');

function open() {
  popup.classList.add('pop-up_opened');
}

function close() {
  popup.classList.remove('pop-up_opened');
}

EditButton.addEventListener('click', open);
CloseButton.addEventListener('click', close);

let formElement = document.querySelector('.pop-up__form');

let nameInput = document.querySelector('.name');
let jobInput = document.querySelector('.about');

nameInput.value = Name.textContent;
jobInput.value = About.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault();
    Name.textContent = nameInput.value;
    About.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
