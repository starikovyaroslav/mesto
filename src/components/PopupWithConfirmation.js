import Popup from "./Popup"

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, {handleDeleteCard}) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
    this._form = this._popup.querySelector('.form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleDeleteCard(this.id, this.card);
    })
  }

  open(id, card) {
    super.open();
    this.id = id;
    this.card = card;
  }
}
