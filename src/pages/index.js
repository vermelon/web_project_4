import "./index.css";

import Card from "../components/Card.js"
import Section from "../components/Section.js"
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js"
import {validationSettings, editBtn, addBtn, formElementEdit, formElementAdd, userName, userAbout} from "../utils/constants.js";
import PopupConfirm from "../components/PopupConfirm";
const userInfo = new UserInfo({
  id: null,
  name: ".profile__text",
  about: ".profile__occupation"
});

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-5/",
  headers: {
      authorization: "c3db06be-da70-4990-b8ca-8515a1d7c281",
      "Content-Type": "application/json"
  }
});

getUserInfo();

getCards();

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
        userInfo.id,
        item.owner._id,
        item._id
      )
      const newCard = card.createCard(userInfo.id);
      cardList.addItem(newCard);  
    },
  },
  ".images__list"
)
return cardList
})
.then((cardList)=>{
  cardList.renderAllItems();
})
.catch((err) => {
  console.log(err)
})
}

function getUserInfo(){
api.getUserInfo()
.then((result)=> {
  userInfo.setUserInfo(result)
  userInfo.id = result._id
})
  .catch((err)=> {
  console.log(err)
})
}

function updateUserInfo(inputValues){
  api.updateUserInfo(inputValues.name, inputValues.about)
  .then((result)=> {
    userInfo.setUserInfo(result)
  })
  .catch((err)=> {
  console.log(err)
})
}

function addNewCard(inputValues, cardList){
  console.log(inputValues)
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
      null
    )
    let newCard = card.createCard();
    cardList = new CardList (newCard, )
    console.log(newCard);

})
  .catch((err)=> {
  console.log(err)
})
}

function deleteCard(cardId, card) {
  api.deleteCard(cardId)
  .then(() => {
    deletePopup.close();
    card.remove();
    card = null;
  })
  .catch((err)=> {
    console.log(err)
  })
}



function updateLikes(cardId, card, isLiked){
  api.addLike(cardId, isLiked)
    .then((result)=> {
      card._likes = result.likes;
    })
  .catch((err) => {
    console.log(err);
  })  

}

const formEditValidator = new FormValidator(validationSettings, formElementEdit);
formEditValidator.enableValidation(validationSettings)
const formAddValidator = new FormValidator(validationSettings, formElementAdd);
formAddValidator.enableValidation(validationSettings)

const editPopup = new PopupWithForm('.popup_form-edit', formSubmitHandlerEdit);
const addPopup = new PopupWithForm('.popup_form-add', formSubmitHandlerAdd);
const deletePopup = new PopupConfirm('.popup_confirm-delete', formSubmitHandlerDelete)


editBtn.addEventListener('click', () => {
  editPopup.open();
  console.log(userInfo.getUserInfo())
  formEditValidator.disableSubmitButton();
  const newUserInfo = userInfo.getUserInfo();
  userName.value = newUserInfo.name;
  userAbout.value = newUserInfo.about;
});

addBtn.addEventListener('click', () => {
  addPopup.open();
  formAddValidator.disableSubmitButton();
});

editPopup.setEventListeners();
addPopup.setEventListeners();
deletePopup.setEventListeners();

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
  console.log(inputValues)
  addNewCard(inputValues);

  addPopup.close();
}

function formSubmitHandlerEdit(inputValues) {
  updateUserInfo(inputValues)
  editPopup.close();
}

function formSubmitHandlerDelete(cardId, card) {

  deleteCard(cardId, card)

}