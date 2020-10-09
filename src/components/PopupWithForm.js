import Popup from "./Popup.js"


export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector)
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._container.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputFields = this._container.querySelectorAll(".popup__field");
    this._inputValues = {};
    this._inputFields.forEach((field) => {
      this._inputValues[field.name] = field.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._container.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}