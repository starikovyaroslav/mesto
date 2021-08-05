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

function open(popup) {
  popup.classList.toggle('pop-up_opened');
}

const openEdit = () => {
  open(popupEdit);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = about.textContent;
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  about.textContent = jobInput.value;
  openEdit();
}

//функция закрытия/открытия карточки
function toggleAddCard() {
  open(popupAdd);
}

//Лайк карточки
const likeCard = e => e.target.classList.toggle('element__like-button_active');

//удаление карточки
const delCard = e => e.target.closest('.element').remove();

//фунцкция открытия/закрытия картинки
const openImage = () => open(popupImage);

//Функция добавления карточки
function addCard(item) {
  const element = template.querySelector('.element').cloneNode(true);
  const likeButton = element.querySelector('.element__like-button');
  const delButton = element.querySelector('.element__delete-button');
  const elementImage = element.querySelector('.element__image');
  elementImage.src = item.link;
  elementImage.alt = item.name;
  element.querySelector('.element__title').textContent = item.name;
  likeButton.addEventListener('click', likeCard);
  delButton.addEventListener('click', delCard);

  //открытие картинки
  elementImage.addEventListener('click', function() {
    openImage();
    popupCapture.src = item.link;
    popupCapture.alt = item.name;
    popupSubtitle.textContent = item.name;
  });
  return element;
}

//Здесь подгружается 6 начальных карточек
initialCards.forEach(function(item) {
  elements.append(addCard(item));
});

function handleProfileFormSubmitAdd (evt) {
  evt.preventDefault();
  elements.prepend(addCard({link: linkInput.value, name: addNameInput.value}));
  toggleAddCard();
  formElementAdd.reset();
}

editButton.addEventListener('click', openEdit);
closeButton.addEventListener('click', openEdit);
formElementAdd.addEventListener('submit', handleProfileFormSubmitAdd);
formElementEdit.addEventListener('submit', handleProfileFormSubmit);
closeButtonImage.addEventListener('click', openImage);
addButton.addEventListener('click', toggleAddCard);
closeButtonAdd.addEventListener('click', toggleAddCard);
