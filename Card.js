const popupImageContainer = document.querySelector('.popup_image');
const popupImage = document.querySelector('.images__picture_fullscreen')
const popupImageCaption = document.querySelector('.images__text_fullscreen')
const closePopupImage = document.querySelector('.popup__close_image');
export const imagesList = document.querySelector(".images__list");
export const initialCards = [{

    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {

    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {

    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {

    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {

    name: "Vanois National Park",
    link: "https://code.s3.yandex.net/web-code/vanois.jpg"
  },
  {

    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

export default class Card {
  constructor(data) {
    this._name = data.name
    this._link = data.link
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#images__card")
      .content
      .cloneNode(true);

    return cardElement;
  }

  _deleteImage(event) {
    event.target.parentNode.parentNode.remove()
    event.stopPropagation()
  }

  _handleOpenPopup() {
    popupImageContainer.classList.remove("popup_hidden");
    popupImage.src = this._link;
    popupImage.alt, popupImageCaption.textContent = this._name;
  }

  _handleClosePopup() {
    popupImageContainer.classList.add("popup_hidden");
    popupImage.src = "";
    popupImage.alt, popupImageCaption.textContent = "";
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
    deleteBtn.addEventListener("click", (event) => {
      this._deleteImage(event)
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

export function renderCards(cardsArray) {
  cardsArray.forEach((item) => {
    const card = new Card(item);
    const cardElement = card.createCard(item.link, item.name);
    imagesList.append(cardElement)
  })
}