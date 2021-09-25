export class Card {
  constructor(card, template, handleCardClick){
    this._card = card;
    this._template = template;
    this._openImage = handleCardClick;
}

createCard = () => {
    const element = document
    .querySelector(this._template)
    .content
    .querySelector('.element')
    .cloneNode(true);

    this._element = element;
    this._elementImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._delButton = this._element.querySelector('.element__delete-button');
    this._elementTitle = this._element.querySelector('.element__title');

    this._setEventListeners();

    this._elementImage.src = this._card.link;
    this._elementImage.alt = this._card.name;
    this._elementTitle.textContent = this._card.name;

    return this._element;
  }

  _setEventListeners = () => {
    this._likeButton.addEventListener('click', this._likeCard);
    this._delButton.addEventListener('click', this._delCard);
    this._elementImage.addEventListener('click', this._openImage);
  }

  _likeCard = e => e.target.classList.toggle('element__like-button_active');

  _delCard = () => {
    this._element.remove();
  }
}