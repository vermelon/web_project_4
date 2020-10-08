import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
    }

    setEventListeners() {
        console.log("setting event listeners")
        super.setEventListeners();
        this._container.addEventListener('click', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._cardId, this._card);
        });
    }

    open(cardId, card) {
        this._cardId = cardId;
        this._card = card;
        super.open();
    }
}