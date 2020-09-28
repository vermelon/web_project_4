

export default class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._submitButton = this._form.querySelector(this._settings.submitButtonSelector)
    this._closeButton = this._form.querySelector(".popup__close");
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState(inputList) {
    this._submitButton.disabled = true;
    if (this._hasInvalidInput(inputList)) {
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
    } else {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  };

  _setEventListeners() {
    this._toggleButtonState(this._inputList);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  };

  resetErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);   
  });
}

  enableValidation() {
    this._setEventListeners();
  }
}