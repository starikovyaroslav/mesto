import "./index.css";
import { editButton, nameInput, jobInput, addButton, formEditProfile, formAddCard, formEditAvatar, profileAvatar, config, profilePhoto } from "../utils/constants.js"
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([resUserData, resCards]) => {
    userInfo.setUserInfo(resUserData.name, resUserData.about, resUserData.avatar, resUserData._id);
    section.renderItems(resCards);
  })
  .catch(err => console.log(err));

const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__subtitle', avatar: '.profile__avatar' });
const popupWithImage = new PopupWithImage('.popup-image');
const popupEditForm = new PopupWithForm('.popup-edit', handleProfileFormSubmit);
const popupAddForm = new PopupWithForm('.popup-add', handleProfileFormSubmitAdd);
const popupAvatarForm = new PopupWithForm('.popup-avatar', handleFormSubmitAvatar);


//Экземпляр валидации для формы редактиварония профиля
const editProfileFormValidator = new FormValidator(formEditProfile, config);

//Экземпляр валидации для формы создания карточки
const addCardFormValidator = new FormValidator(formAddCard, config);

//Экземпляр валидации для формы редактирования аватара
const editAvatarFormValidator = new FormValidator(formEditAvatar , config);

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
      userInfo.setUserInfo(data.name, data.about, data.avatar);
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
    likeButtonClick: (id) => {
      if (item.isLiked()){
        api.deleteLike(id)
          .then(res => item.likeHandler(res.likes))
          .catch(err => console.log(err))
      } else {
        api.like(id)
          .then(res => item.likeHandler(res.likes))
          .catch(err => console.log(err))
      }
    }
  }, userInfo.userId());
  const card = item.createCard();
  return card;
}

//Заполнение страницы дефолтными карточками
const section = new Section({
  renderer: item => {
    const card = makeCard(item);
    section.addItem(card);
  }
}, '.elements');


//Сабмит для попапа добавления карточки
function handleProfileFormSubmitAdd({placeName, link}) {
  popupAddForm.renderLoading(true);
  api.addCard({name: placeName, link: link})
    .then(res => {
      const card = makeCard(res);
      section.addItem(card);
      popupAddForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupAddForm.renderLoading(false))
}

//Функция изменения аватара
function handleFormSubmitAvatar(link) {
  popupAvatarForm.renderLoading(true)
  api.editAvatar(link)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      popupAvatarForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupAvatarForm.renderLoading(false))
}



addButton.addEventListener('click', addOpen);
editButton.addEventListener('click', editProfileOpen);
profileAvatar.addEventListener('click', () => popupAvatarForm.open());
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();
popupWithImage.setEventListeners();
popupDelete.setEventListeners();
popupAvatarForm.setEventListeners()
