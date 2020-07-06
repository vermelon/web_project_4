const popupImageContainer = document.querySelector('.popup_image');
const popupImage = document.querySelector('.images__picture_fullscreen')
const popupImageCaption = document.querySelector('.images__text_fullscreen')
const closePopupImage = document.querySelector('.popup__close_image');


export default class Card {
  constructor(data, template) {
    this._name = data.name
    this._link = data.link
    this._template = document.querySelector("#images__card")
  }

  _getTemplate() {
    const _cardElement = this._template.content.cloneNode(true);
    return _cardElement;
  }

  _deleteImage() {
    this.place = this._getTemplate().querySelector('.images__card')
    console.log(this.place)
    this.place.remove()
    event.stopPropagation

}

  _handleOpenPopup() {
    popupImageContainer.classList.remove("popup_hidden");
    popupImage.src = this._link;
    popupImage.alt, popupImageCaption.textContent = this._name;
  }

  _handleClosePopup() {
    popupImageContainer.classList.add("popup_hidden");
    popupImage.src = "";
    popupImage.alt = "", 
    popupImageCaption.textContent = "";
  }

  _setEventListeners() {
    const like = this._element.querySelector(".images__like")
    const deleteBtn = this._element.querySelector(".images__delete")
    this._element.querySelector(".images__picture").addEventListener('click', () => {
      this._handleOpenPopup();
    })
    closePopupImage.addEventListener('click', () => {
      this._handleClosePopup();
    })
    like.addEventListener("click", () => {
      like.classList.toggle("images__like_active");
    })
    deleteBtn.addEventListener("click", () => {
      this._deleteImage()
    }, false);
    popupImage.addEventListener("click", () => {
      if (event.target.classList.contains("popup")) {
        closePopup(popupImage)
      }
    })
  }

  createCard(link, name) {
    this._element = this._getTemplate();
    this._element.querySelector(".images__picture").style.backgroundImage = `url('${link}')`;
    this._element.querySelector(".images__text").textContent = name;
    this._setEventListeners();
    return this._element;
  }
}

