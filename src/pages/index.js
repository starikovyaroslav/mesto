import "./index.css";
import { Card } from "../components/Card.js";
import { initialCards } from "../utils/initial-сards.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const popupEdit = document.querySelector('.popup-edit');
const editButton = document.querySelector('.profile__edit-button');
const profileNameElement = document.querySelector('.profile__name');
const about = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.pop-up__input_place_name');
const jobInput = document.querySelector('.pop-up__input_place_about');
const formElementEdit = popupEdit.querySelector('.pop-up__form');
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup-add');
const popupImage = document.querySelector('.popup-image');
const popupCapture = popupImage.querySelector('.pop-up__img');
const popupSubtitle = popupImage.querySelector('.pop-up__subtitle');
const elements = document.querySelector('.elements');
const linkInput = document.querySelector('.pop-up__input_place_link');
const addNameInput = popupAdd.querySelector('.pop-up__input_place_name');
const formElementAdd = popupAdd.querySelector('.pop-up__form');
const formEditProfile = popupEdit.querySelector('.form');
const formAddCard = popupAdd.querySelector('.form');
const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'pop-up__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__subtitle' });
const popupWithImage = new PopupWithImage('.popup-image');
const popupEditForm = new PopupWithForm('.popup-edit', handleProfileFormSubmit);
const popupAddForm = new PopupWithForm('.popup-add', handleProfileFormSubmitAdd);

//Экземпляр валидации для формы редактиварония профиля
const editProfileFormValidator = new FormValidator(formEditProfile, config);

//Экземпляр валидации для формы создания карточки
const addCardFormValidator = new FormValidator(formAddCard, config);


const editProfileOpen = () => {
  popupEditForm.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().about;
}

function addOpen() {
  popupAddForm.open();
}

//Сабмит для попапа редактирования профиля
function handleProfileFormSubmit({ name, about }) {
  userInfo.setUserInfo({ name, about });
  popupEditForm.close();
}


const handleCardClick = (e) => {
  const src = e.target.getAttribute("src");
  const alt = e.target.getAttribute("alt");
  popupWithImage.open({ src: src, alt: alt });
}

//Создание карточки
const makeCard = (data) => {
  return new Card(data, '#element-template', handleCardClick).createCard();
}

//Заполнение страницы дефолтными карточками
const section = new Section({
  items: initialCards,
  renderer: item => {
    const card = makeCard(item);
    section.addItem(card);
  }
}, '.elements');

//Сабмит для попапа добавления карточки
function handleProfileFormSubmitAdd({placeName, link}) {
  const card = makeCard({name: placeName, link: link, alt: placeName});
  section.addItem(card);
  popupAddForm.close();
}

section.renderItems();
addButton.addEventListener('click', addOpen);
editButton.addEventListener('click', editProfileOpen);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();
popupWithImage.setEventListeners();
