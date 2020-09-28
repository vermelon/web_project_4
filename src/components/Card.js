export default class Card {
  constructor(name, link, template, handleCardClick) {
    this._name = name;
    this._link = link;
    this._template = template;
    this.handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const element = document.querySelector(this._template).content.querySelector(".images__card").cloneNode(true);
    this._elementCard = element;
    this._elementImg = element.querySelector(".images__picture");
    this._elementCaption = element.querySelector(".images__text");
    this._likeBtn = element.querySelector(".images__like")
    this._deleteBtn = element.querySelector(".images__delete")
    return element;
  }

  _likeHandler() {
    this._likeBtn.classList.toggle("images__like_active");
  }

  _deleteHandler(event) {
    event.stopPropagation();
    this._elementCard.remove();
    this._elementCard = null;
  }

  _setEventListeners() {
    this._elementImg.addEventListener('click', () => { 
      console.log("this " + this)
      this.handleCardClick(this._name, this._link);
    })
    this._likeBtn.addEventListener("click", () => {
      this._likeHandler();
    })
    this._deleteBtn.addEventListener("click", (event) => {
      this._deleteHandler(event);
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