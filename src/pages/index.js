import "./index.css";
import { popupEdit, editButton, nameInput, jobInput, addButton, popupAdd, formEditProfile, formAddCard, config } from "../utils/constants.js"
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-28',
  headers: {
    authorization: 'd7e22a8b-edd0-4655-a36c-592649df720b',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__subtitle' });
const popupWithImage = new PopupWithImage('.popup-image');
const popupEditForm = new PopupWithForm('.popup-edit', handleProfileFormSubmit);
const popupAddForm = new PopupWithForm('.popup-add', handleProfileFormSubmitAdd);

api.getUserInfo()
  .then(res => userInfo.setUserInfo(res.name, res.about, res.avatar, res._id))
  .catch(err => console.log(err));


//Экземпляр валидации для формы редактиварония профиля
const editProfileFormValidator = new FormValidator(formEditProfile, config);

//Экземпляр валидации для формы создания карточки
const addCardFormValidator = new FormValidator(formAddCard, config);

const editProfileOpen = () => {
  editProfileFormValidator.resetPopupValidationState();
  popupEditForm.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().about;
}

function addOpen() {
  addCardFormValidator.resetPopupValidationState();
  popupAddForm.open();
}

//Сабмит для попапа редактирования профиля
function handleProfileFormSubmit({ name, about }) {
  popupEditForm.renderLoading(true); //активируется сообщение о сохранении
  api.setUserInfo({ name, about })
    .then(data => {
      userInfo.setUserInfo(data);
      popupEditForm.close();
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => popupEditForm.renderLoading(false))
}


const handleCardClick = (e) => {
  const src = e.target.getAttribute("src");
  const alt = e.target.getAttribute("alt");
  popupWithImage.open({ src: src, alt: alt });
}

const popupDelete = new PopupWithConfirmation('.popup-del', {
  handleDeleteCard: (id, card) => {
    api.deleteCard(id)
      .then(res => {
        card.remove();
        popupDelete.close();
      })
      .catch(err => console.log(err))
  }
});

//Создание карточки
const makeCard = (data) => {
  const item = new Card(data, '#element-template', {
    handleCardClick: handleCardClick,
    delButtonClick: (id, card) => {
      popupDelete.open(id, card);
    },
    likeButtonClick: (likeButton, id) => {
      if (likeButton.classList.contains('element__like-button_active')){
        api.deleteLike(id)
          .then(res => item.likeHandler(res.likes))
          .catch(err => console.log(err))
      } else {
        api.like(id)
          .then(res => item.likeHandler(res.likes))
          .catch(err => console.log(err))
      }
    }
  });
  const card = item.createCard();
  return card;
}

/* function likeButtonClick(likeButton, id) {
  if (likeButton.classList.contains('element__like-button_active')){
    api.deleteLike(id)
      .then(res => card.likeHandler(res.likes))
      .catch(err => console.log(err))
  } else {
    api.like(id)
      .then(res => card.likeHandler(res.likes))
      .catch(err => console.log(err))
  }
} */

//Заполнение страницы дефолтными карточками
const section = new Section({
  renderer: item => {
    const card = makeCard(item);
    section.addItem(card);
  }
}, '.elements');

api.getInitialCards()
  .then(res => section.renderItems(res))
  .catch(err => console.log(err));

//Сабмит для попапа добавления карточки
function handleProfileFormSubmitAdd({placeName, link}) {
  const card = makeCard({name: placeName, link: link, alt: placeName});
  section.addItem(card);
  popupAddForm.close();
}

addButton.addEventListener('click', addOpen);
editButton.addEventListener('click', editProfileOpen);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();
popupWithImage.setEventListeners();
popupDelete.setEventListeners();
