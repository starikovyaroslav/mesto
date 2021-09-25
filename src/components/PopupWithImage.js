import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.pop-up__img');
    this._popupImageSub = this._popup.querySelector('.pop-up__subtitle');
  }

  open({src, alt}) {
    super.open();
    this._popupImage.src = src;
    this._popupImage.alt = alt;
    this._popupImageSub.textContent = alt;
  }
}
