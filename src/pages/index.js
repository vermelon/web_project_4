import "./index.css";

import Card from "../components/Card.js"
import Section from "../components/Section.js"
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js"
import {validationSettings, buttonText,formElementDelete, editBtn, addBtn, editAvatarBtn, formElementEdit, formElementAdd, formElementEditAvatar, userName, userAbout} from "../utils/constants.js";
import PopupConfirm from "../components/PopupConfirm";


const userInfo = new UserInfo({
  id: null,
  name: ".profile__text",
  about: ".profile__occupation",
  avatar: ".profile__image"
});

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-5/",
  headers: {
      authorization: "c3db06be-da70-4990-b8ca-8515a1d7c281",
      "Content-Type": "application/json"
  }
});

function getButtonValue(form) {
  return form.querySelector('.popup__save').value;
}

function isSaving (isLoading, form, initValue){
  const button = form.querySelector('.popup__save');
  if(isLoading){
    button.value = "Saving..."
  }
  else {
    button.value = initValue;
  }
}

getUserInfo();

let cardList = getCards();

function getCards() {
api.getInitialCards() 
.then((result)=> {
   cardList = new Section({
    items: result,
    renderer: (item) => {
      const card = new Card(
        item.name,
        item.link,
        item.likes,
        "#images__card",
        handleCardClick,
        handleDeleteClick,
        handleLikeClick,
        userInfo._id,
        item.owner._id,
        item._id
      )
      const newCard = card.createCard();
      cardList.addItem(newCard);  
    },
  },
  ".images__list"
)
return cardList
})
.then((cardList)=>{
  cardList.renderAllItems();
  return cardList
})
.catch((err) => {
  alert(err)
})
}

function getUserInfo(){
api.getUserInfo()
.then((result)=> {
  userInfo.setUserInfo(result)
})
  .catch((err)=> {
   alert(err)
})
}

function updateLikes(cardId, card, isLiked){
  api.addLike(cardId, isLiked)
    .then((result)=> {
      card._likes = result.likes;
    })
  .catch((err) => {
    alert(err);
  })  
}



const formEditValidator = new FormValidator(validationSettings, formElementEdit);
formEditValidator.enableValidation(validationSettings)
const formAddValidator = new FormValidator(validationSettings, formElementAdd);
formAddValidator.enableValidation(validationSettings)
const formAvatarValidator = new FormValidator(validationSettings, formElementEditAvatar);
formAvatarValidator.enableValidation(validationSettings)

const editPopup = new PopupWithForm('.popup_form-edit', formSubmitHandlerEdit);
const addPopup = new PopupWithForm('.popup_form-add', formSubmitHandlerAdd);
const deletePopup = new PopupConfirm('.popup_confirm-delete', formSubmitHandlerDelete);
const avatarPopup = new PopupWithForm('.popup_form-avatar', formSubmitHandlerEditAvatar);


editBtn.addEventListener('click', () => {
  editPopup.open();
  formEditValidator.disableSubmitButton();
  formEditValidator.resetErrors();
  const newUserInfo = userInfo.getUserInfo();
  userName.value = newUserInfo.name;
  userAbout.value = newUserInfo.about;
});

addBtn.addEventListener('click', () => {
  addPopup.open();
  formAddValidator.disableSubmitButton();
  formAddValidator.resetErrors();
});

editAvatarBtn.addEventListener('click', () => {
  avatarPopup.open();
  formAvatarValidator.disableSubmitButton();
  formAvatarValidator.resetErrors();
})

editPopup.setEventListeners();
addPopup.setEventListeners();
deletePopup.setEventListeners();
avatarPopup.setEventListeners();

const imagePopup = new PopupWithImage(".popup_image");
imagePopup.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

function handleDeleteClick(cardId, card){
  deletePopup.open(cardId, card)
}

function handleLikeClick(cardId, card, isLiked){
  updateLikes(cardId, card, isLiked)
}

function formSubmitHandlerAdd(inputValues) {
  const initValue = getButtonValue(formElementAdd)
  isSaving(true,formElementAdd,initValue)
  api.postNewCard(inputValues.name, inputValues.link)
  .then((result)=> {
    const card = new Card(
      result.name,
      result.link,
      result.likes,
      "#images__card",
      handleCardClick,
      handleDeleteClick,
      handleLikeClick,
      userInfo.id,
      userInfo.id,
      result._id
    )
return card
})
.then((card)=>{
  const newCard = card.createCard();
  cardList.addItem(newCard)
})
  .catch((err)=> {
    isSaving(false,formElementAdd,initValue)
    alert(err)
})
  .finally(()=>{
    isSaving(false,formElementAdd,initValue)
    addPopup.close();
  })
}

function formSubmitHandlerEdit(inputValues) {
  const initValue = getButtonValue(formElementEdit)
  isSaving(true, formElementEdit, initValue);
  api.updateUserInfo(inputValues.name, inputValues.about)
  .then((result)=> {
    userInfo.setUserInfo(result)
  })
  .catch((err)=> {
    isSaving(false, formElementEdit, initValue)
    alert(err)
})
  .finally(()=> {
    isSaving(false, formElementEdit, initValue)
    editPopup.close();
  })
}

function formSubmitHandlerDelete(cardId, card) {
  const initValue = getButtonValue(formElementDelete)
  isSaving(true, formElementDelete, initValue)
  api.deleteCard(cardId)
  .then(() => {
    deletePopup.close();
    card.remove();
    card = null;
  })
  .catch((err)=> {
    isSaving(false, formElementDelete, initValue)
    alert(err)
  })
  .finally(()=>{
    isSaving(false, formElementDelete, initValue)
    deletePopup.close();
  })
}

function formSubmitHandlerEditAvatar(url) {
  const initValue = getButtonValue(formElementEditAvatar)
  isSaving(true,formElementEditAvatar, initValue)
  api.updateAvatar(url.link)
   .then((result)=>{
    userInfo.setUserInfo(result)
   })
   .catch((err)=> {
    isSaving(false, formElementEditAvatar, initValue)
     alert(err)
   })
  .finally(() => {
    isSaving(false, formElementEditAvatar, initValue)
    avatarPopup.close();
  }) 
}