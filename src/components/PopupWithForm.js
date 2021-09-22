import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._form = this._popup.querySelector('form');
  }

  _getInputValues() {
    const inputList = document.querySelectorAll('.form__input');
    const values = {};
    inputList.forEach((input) => {
      values[input.name] = input.value
    });

    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this._form.reset();
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}
