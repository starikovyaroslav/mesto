import { Card } from "./Card.js";
import { initialCards } from "./initial-сards.js";

const popupEdit = document.querySelector('.popup-edit');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupEdit.querySelector('.pop-up__close-button');
const profileNameElement = document.querySelector('.profile__name');
const about = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.pop-up__input_place_name');
const jobInput = document.querySelector('.pop-up__input_place_about');
const formElementEdit = popupEdit.querySelector('.pop-up__form');
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup-add');
const closeButtonAdd = popupAdd.querySelector('.pop-up__close-button_add-card');
const popupImage = document.querySelector('.popup-image');
const popupCapture = popupImage.querySelector('.pop-up__img');
const popupSubtitle = popupImage.querySelector('.pop-up__subtitle');
const closeButtonImage = popupImage.querySelector('.pop-up__close-button_image');
const elements = document.querySelector('.elements');
const template = document.querySelector('#element-template').content;
const linkInput = document.querySelector('.pop-up__input_place_link');
const addNameInput = popupAdd.querySelector('.pop-up__input_place_name');
const formElementAdd = popupAdd.querySelector('.pop-up__form');

function openPopup(popup) {
  popup.classList.add('pop-up_opened');
  document.addEventListener('keydown', escClose);
}

//Функция закрытия попапа при нажатии Escape
const escClose = (evt) => {
  const popupOpened = document.querySelector('.pop-up_opened');
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  };
}

//Функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('pop-up_opened');
  document.removeEventListener('keydown', escClose);
}

const openEdit = () => {
  openPopup(popupEdit);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = about.textContent;
}

const openAdd = () => {
  openPopup(popupAdd);

  //Функция сбрасывает форму при ее открытии, это решает проблему активной кнопки при повторном открытии
  formElementAdd.reset();
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  about.textContent = jobInput.value;
  closePopup(popupEdit);
}

function handleProfileFormSubmitAdd (evt) {
  evt.preventDefault();
  elements.prepend(makeCard({link: linkInput.value, name: addNameInput.value}));
  formElementAdd.reset();
  closePopup(popupAdd);
}

//Функция закрытия любых попапов при нажатии в любой свободной зоне и при нажатии ESC
const closePopups = () => {
  const allPopups = document.querySelectorAll('.pop-up');
  allPopups.forEach((popup) => {

    //слушатель для клика в любом месте кроме самого попапа
    popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget || evt.target.classList.contains('pop-up__close-button')) {
        closePopup(popup);
      };
    });
  });
}

const openImage = (e) => {
  openPopup(popupImage);
  popupCapture.src = e.target.getAttribute("src");
  popupCapture.alt = e.target.getAttribute("alt");
  popupSubtitle.textContent = e.target.getAttribute("alt");
}


//Создание карточки
const makeCard = (data) => {
  return new Card(data, '#element-template', openImage).addCard();
}

initialCards.forEach(function(item) {
  elements.append(makeCard(item));
});

editButton.addEventListener('click', openEdit);
formElementAdd.addEventListener('submit', handleProfileFormSubmitAdd);
formElementEdit.addEventListener('submit', handleProfileFormSubmit);
addButton.addEventListener('click', openAdd);
closePopups();
