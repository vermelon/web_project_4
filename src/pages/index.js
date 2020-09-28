import "./index.css";

import Card from "../components/Card.js"
import Section from "../components/Section.js"
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import {validationSettings, editBtn, addBtn, formElementEdit, formElementAdd, initialCards, userName, userAbout} from "../utils/constants.js";

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item.name,
        item.link,
        "#images__card",
        handleCardClick
      )
      const newCard = card.createCard();
      cardList.addItem(newCard);
    },
  },
  ".images__list"
);

cardList.renderAllItems();

const formEditValidator = new FormValidator(validationSettings, formElementEdit);
formEditValidator.enableValidation(validationSettings)
const formAddValidator = new FormValidator(validationSettings, formElementAdd);
formAddValidator.enableValidation(validationSettings)

const editPopup = new PopupWithForm('.popup_form-edit', formSubmitHandlerEdit);
const addPopup = new PopupWithForm('.popup_form-add', formSubmitHandlerAdd);

const userInfo = new UserInfo({
  name: ".profile__text",
  about: ".profile__occupation"
});

editBtn.addEventListener('click', () => {
  editPopup.open();
  const newUserInfo = userInfo.getUserInfo()
  userName.value = newUserInfo.name;
  userAbout.value = newUserInfo.about;
});

addBtn.addEventListener('click', () => {
  addPopup.open();
});

editPopup.setEventListeners();
addPopup.setEventListeners();

const imagePopup = new PopupWithImage(".popup_image");
imagePopup.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

function formSubmitHandlerAdd(inputValues) {

  const card = new Card(
    inputValues.name,
    inputValues.link,
    "#images__card",
    handleCardClick
  )
  const newCard = card.createCard();
  cardList.addItem(newCard);
  addPopup.close();
}

function formSubmitHandlerEdit(inputValues) {

  userInfo.setUserInfo(inputValues)
  editPopup.close();
}