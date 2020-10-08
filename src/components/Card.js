export default class Card {
  constructor(name, link, likes, template, handleCardClick, handleDeleteClick, handleLikeClick, currentUserId, userId, cardId) {
    this._name = name;
    this._link = link;
    this._likes = likes; 
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._currentUserId = currentUserId
    this._userId = userId;
    this._cardId = cardId;
  }

  _isLiked() {
   for (let i =0; i<this._likes.length; i++ ){
      if (this._likes[i]._id === this._currentUserId){

    return true
    }
  }
  return false
  }

  _getTemplate(id) {
    const element = document.querySelector(this._template).content.querySelector(".images__card").cloneNode(true);
    this._elementCard = element;
    this._elementImg = element.querySelector(".images__picture");
    this._elementCaption = element.querySelector(".images__text");
    this._likeBtn = element.querySelector(".images__like-button");
    if (this._isLiked()){
      this._likeBtn.classList.add("images__like-button_active")
    }
    this._likesCount = element.querySelector(".images__like-count");
    this._deleteBtn = element.querySelector(".images__delete")
    if (id !== this._userId){
      this._deleteBtn.classList.add("popup_hidden")
    }
    return element;
  }


  _likeHandler() {
    this._likeBtn.classList.toggle("images__like-button_active");
    if (this._isLiked()){
      this._likesCount.textContent= this._likes.length-1
    }
    else {
      this._likesCount.textContent = this._likes.length+1
    }
    this._handleLikeClick(this._cardId, this, this._isLiked())
  }

  _deleteHandler() {
    this._handleDeleteClick(this._cardId, this._elementCard)    
  }

  _setEventListeners() {
    this._elementImg.addEventListener('click', () => { 
      this._handleCardClick(this._name, this._link);
    })
    this._likeBtn.addEventListener("click", () => {
      this._likeHandler();
    })
    this._deleteBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      this._deleteHandler();
    });
  }

  createCard(id) {
    const card = this._getTemplate(id);
    this._elementImg.style.backgroundImage = `url(${this._link})`
    this._elementCaption.textContent = this._name;
    this._likesCount.textContent = this._likes.length;
    this._setEventListeners();
    return card;
  }
}