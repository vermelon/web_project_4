import PopupWithImage from "./PopupWithImage.js"

export default class Card {
  constructor(name, link, template, handleCardClick) {
    this._name = name;
    this._link = link;
    this._template = template;
    this.handleCardClick = handleCardClick;
  }

  _handleCardClick(name, link) {
    const popup = new PopupWithImage(".popup_image", name, link);
    popup.setEventListeners();
    popup.open();
  }

  _deleteImage() {
    this._place.remove();

  }

  _getTemplate() {
    const element = document.querySelector(this._template).content.querySelector(".images__card").cloneNode(true);
    this._elementCard = element;
    this._elementImg = element.querySelector(".images__picture");
    this._elementCaption = element.querySelector(".images__text");
    this._like = element.querySelector(".images__like")
    this._deleteBtn = element.querySelector(".images__delete")
    return element;
  }

  _setEventListeners() {
    this._elementImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
    this._like.addEventListener("click", () => {
      this._like.classList.toggle("images__like_active");
    })
    this._deleteBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      this._elementCard.remove();
    });
  }

  createCard() {
    const card = this._getTemplate();
    this._elementImg.style.backgroundImage = `url(${this._link})`
    this._elementCaption.textContent = this._name;
    this._setEventListeners();
    return card;
  }
}