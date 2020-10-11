import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._container.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._container.addEventListener('submit', (event) => {
            console.log("delete")
            event.preventDefault();
            this._handleFormSubmit(this._cardId, this._card);
        });
    }

    open(cardId, card) {
        this._cardId = cardId;
        this._card = card;
        super.open();
    }
    
  close() {
    super.close();
  }

}