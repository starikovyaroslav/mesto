export class Card {
  constructor(card, template, { handleCardClick, delButtonClick, likeButtonClick }, id) {
    this._card = card;
    this._template = template;
    this._openImage = handleCardClick;
    this._id = card._id;
    this._myId = id;
    this._delButtonClick = delButtonClick;
    this._likeButtonClick = likeButtonClick;
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
    this._likeCounter = this._element.querySelector('.element__like-count');

    this._setEventListeners();

    this._elementImage.src = this._card.link;
    this._elementImage.alt = this._card.name;
    this._elementTitle.textContent = this._card.name;
    this._likeCounter.textContent = this._card.likes.length;

    this._cardCheck();

    this._card.likes.forEach(item => { // Эта функция делает кнопки лайка активными после ребута
      if (item._id === this._myId) {
        this._likeButton.classList.add('element__like-button_active');
      }
    });

    return this._element;
  }

  _setEventListeners = () => {
    this._likeButton.addEventListener('click', this._likeCard);
    this._delButton.addEventListener('click', this._delCard);
    this._elementImage.addEventListener('click', this._openImage);
  }

  _likeCard = e => {
    this._likeButtonClick(this._id);
    e.target.classList.toggle('element__like-button_active');
  }


  _delCard = () => {
    this._delButtonClick(this._id, this._element);
  }

  likeHandler(likes) {//Подписывает лайки
    this._likeCounter.textContent = likes.length;
  }

  _cardCheck() { //Проверка карточки на принадлежность к id
    if (this._myId !== this._card.owner._id) {
      this._delButton.remove(); //если карточка не моя, убираем кнопку удаления
    }
  }

  isLiked() {
    if (this._likeButton.classList.contains('element__like-button_active')) {
      return true
    } else return false
  }
}
