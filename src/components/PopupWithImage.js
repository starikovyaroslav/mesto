import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    super.open();
    const popupSubtitle = this._popup.querySelector('.pop-up__subtitle');
    this._popup.src = e.target.getAttribute("src");
    this._popup.alt = e.target.getAttribute("alt");
    popupSubtitle.textContent = e.target.getAttribute("alt");
  }
}
