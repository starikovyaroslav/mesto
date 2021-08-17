const showInputError = (formElement, inputElement, errorMessage, key) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(key.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(key.errorClass);
}

const hideInputError = (formElement, inputElement, key) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(key.inputErrorClass);
  errorElement.classList.remove(key.errorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, key) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, key);
  } else {
    hideInputError(formElement, inputElement, key);
  }
}

const hasInvalidInput = inputList => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, key) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(key.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(key.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

const setEventListeners = (formElement, key) => {
  const inputList = Array.from(formElement.querySelectorAll(key.inputSelector));
  const buttonElement = formElement.querySelector(key.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, key);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, key);
        toggleButtonState(inputList, buttonElement, key);
    });
  })

  formElement.addEventListener('reset', () => {
    toggleButtonState(inputList, buttonElement, key);
  });
}

const enableValidation = key => {
  const formList = Array.from(document.querySelectorAll(key.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

      setEventListeners(formElement, key);

  });
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'pop-up__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
})

