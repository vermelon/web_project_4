import Popup from "./Popup.js"


export default class PopupWithImage extends Popup {
  constructor(selector, name, link) {
    super(selector);
    this._link = link;
    this._name = name;
    this._popupImage = this._container.querySelector(".images__picture_fullscreen");
    this._popupCaption = this._container.querySelector(".images__text_fullscreen");
  }
  open() {
    this._popupImage.src = this._link;
    this._popupImage.alt, this._popupCaption.textContent = this._name;
    super.open();
  }


}