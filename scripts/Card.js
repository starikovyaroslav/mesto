export class Card {
  constructor(card, template){
    this._card = card;
    this._template = template;
}

  addCard = () => {
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
    /* _elementImage.addEventListener('click', function() {
      openPopup(popupImage);
      popupCapture.src = this._card.link;
      popupCapture.alt = this._card.name;
      popupSubtitle.textContent = this._card.name;
    });
     */
  _setEventListeners = () => {
    this._likeButton.addEventListener('click', this._likeCard);
    this._delButton.addEventListener('click', this._delCard);
    this._elementImage.addEventListener('click', this._openImage);
  }

  _likeCard = e => e.target.classList.toggle('element__like-button_active');

  _delCard = e => e.target.closest('.element').remove();
}
