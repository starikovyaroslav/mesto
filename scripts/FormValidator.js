export class FormValidator {
  constructor(config) {
    this._config = config;
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput = inputList => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners = formElement => {
    const inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = formElement.querySelector(this._config.submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
          this._toggleButtonState(inputList, buttonElement);
      });
    })
    formElement.addEventListener('reset', () => {
      this._toggleButtonState(inputList, buttonElement);
    });
  }

  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this._config.formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', evt => {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  }
}

