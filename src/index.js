import "./pages/index.css";

import Card from "./Card.js"
import Section from "./Section.js"
import PopupWithForm from "./PopupWithForm.js";
import FormValidator from "./FormValidator.js";
import UserInfo from "./UserInfo.js";
import handleCardClick from "./Card.js";


import {
  validationSettings,
  formElementAdd,
  formElementEdit
} from "./FormValidator.js"

const editBtn = document.querySelector('.profile__edit');
const addBtn = document.querySelector('.profile__add');

const initialCards = [{

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

let cards = [];
for (const card of initialCards) {
  let cardElement = new Card(card.name, card.link, "#images__card");
  cardElement = cardElement.createCard();
  cards.push(cardElement);
}

const cardLIst = new Section({
    items: cards,
    renderer: (element) => {
      cardLIst.addItem(element);
    },
  },
  ".images__list"
);

cardLIst.renderAllItems();

const formEditValidator = new FormValidator(validationSettings, formElementEdit);
formEditValidator.enableValidation(validationSettings)
const formAddValidator = new FormValidator(validationSettings, formElementAdd);
formAddValidator.enableValidation(validationSettings)

const EditPopup = new PopupWithForm('.popup_form-edit', formSubmitHandlerEdit);
const AddPopup = new PopupWithForm('.popup_form-add', formSubmitHandlerAdd);

const userInfo = new UserInfo({
  name: ".profile__text",
  about: ".profile__occupation"
});

editBtn.addEventListener('click', () => {
  EditPopup.open();
  document.querySelector('.popup__field_name').value = document.querySelector('.profile__text').textContent;
  document.querySelector('.popup__field_about').value = document.querySelector('.profile__occupation').textContent;
});

addBtn.addEventListener('click', () => {
  AddPopup.open();
});

EditPopup.setEventListeners();
AddPopup.setEventListeners();

function formSubmitHandlerAdd(inputValues) {

  let card = new Card(
    inputValues.name,
    inputValues.link,
    "#images__card",
    handleCardClick
  );
  card = card.createCard();
  cardLIst.addItem(card);
  AddPopup.close();
}

function formSubmitHandlerEdit(inputValues) {

  userInfo.setUserInfo(inputValues)
  EditPopup.close();
}