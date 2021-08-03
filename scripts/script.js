const popup = document.querySelector('.pop-up');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.pop-up__close-button');
let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.pop-up__input_place_name');
const jobInput = document.querySelector('.pop-up__input_place_about');

function open() {
  popup.classList.toggle('pop-up_opened');
  nameInput.value = name.textContent;
  jobInput.value = about.textContent;
}

editButton.addEventListener('click', open);
closeButton.addEventListener('click', open);

const formElement = document.querySelector('.pop-up__form');

function formSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  about.textContent = jobInput.value;
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

//Попап добавления карточки
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.pop-up_add-card');
const closeButtonAdd = document.querySelector('.pop-up__close-button_add-card');

//функция закрытия/открытия карточки
function toggleAddCard() {
  popupAdd.classList.toggle('pop-up_opened');
}
addButton.addEventListener('click', toggleAddCard);
closeButtonAdd.addEventListener('click', toggleAddCard);

//Лайк карточки
const likeCard = e => e.target.classList.toggle('element__like-button_active');

//удаление карточки
const delCard = e => e.target.closest('.element').remove();

//Функция добавления карточки
const elements = document.querySelector('.elements');
const template = document.querySelector('#element-template').content;
const linkInput = document.querySelector('.pop-up__input_place_link');
const addNameInput = popupAdd.querySelector('.pop-up__input_place_name');
const formElementAdd = popupAdd.querySelector('.pop-up__form');

function addCard(card) {
  const element = template.querySelector('.element').cloneNode(true);
  const likeButton = element.querySelector('.element__like-button');
  const delButton = element.querySelector('.element__delete-button');
  element.querySelector('.element__image').src = card.link;
  element.querySelector('.element__title').textContent = card.name;
  likeButton.addEventListener('click', likeCard);
  delButton.addEventListener('click', delCard);
  return element;
}

//Здесь подгружается 6 начальных карточек
initialCards.forEach(function(item) {
  elements.append(addCard(item));
});

function addformSubmitHandler (evt) {
  evt.preventDefault();
  elements.prepend(addCard({link: linkInput.value, name: addNameInput.value}));
  toggleAddCard();
}

formElementAdd.addEventListener('submit', addformSubmitHandler);
