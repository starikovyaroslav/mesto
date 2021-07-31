const popup = document.querySelector('.pop-up');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.pop-up__close-button');
const Name = document.querySelector('.profile__name');
const About = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.pop-up__input_place_name');
const jobInput = document.querySelector('.pop-up__input_place_about');

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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Здесь подгружается 6 начальных карточек
const elements = document.querySelector('.elements');
const template = document.querySelector('#element-template').content;

for (let i = 0; i < initialCards.length; i++) {
  const element = template.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = initialCards[i].link;
  element.querySelector('.element__title').textContent = initialCards[i].name;
  elements.append(element);
}