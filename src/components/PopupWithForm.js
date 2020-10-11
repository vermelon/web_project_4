import Popup from "./Popup.js"


export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm, cardList) {
    super(selector)
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._container.querySelector('.popup__form');
    this._cardList = cardList;
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
      this._handleSubmitForm(this._getInputValues(), this._cardList, this);
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}