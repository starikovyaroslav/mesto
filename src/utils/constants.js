const popupEdit = document.querySelector('.popup-edit');
const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.pop-up__input_place_name');
const jobInput = document.querySelector('.pop-up__input_place_about');
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup-add');
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

export { popupEdit, editButton, nameInput, jobInput, addButton, popupAdd, formEditProfile, formAddCard, config };
