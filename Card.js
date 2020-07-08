import { handleCloseImagePopup, handleOpenImagePopup } from "./utils.js";

const closePopupImage = document.querySelector('.popup__close_image');


export default class Card {
  constructor(data, _template) {
    this._name = data.name
    this._link = data.link
    this._template = document.querySelector("#images__card")
  }

  _deleteImage() {
    this._place.remove();
    event.stopPropagation();  
}
  _setEventListeners() {
    const like = this._element.querySelector(".images__like")
    const deleteBtn = this._element.querySelector(".images__delete")
    this._element.querySelector(".images__picture").addEventListener('click', () => {
      handleOpenImagePopup(this._link, this._name);
    })
    closePopupImage.addEventListener('click', () => {
      handleCloseImagePopup();
    })
    like.addEventListener("click", () => {
      like.classList.toggle("images__like_active");
    })
    deleteBtn.addEventListener("click", () => {
      this._deleteImage()
    }, false);
  }

  createCard(link, name) {
    this._element = this._template.content.cloneNode(true);
    this._element.querySelector(".images__picture").style.backgroundImage = `url('${link}')`;
    this._element.querySelector(".images__text").textContent = name;
    this._setEventListeners();
    this._place = this._element.querySelector(".images__card");
    return this._element;
  }
}

