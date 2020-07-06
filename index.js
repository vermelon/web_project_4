import Card from "./Card.js"

import {FormValidator, formElementAdd, formElementEdit, validationSettings} from "./FormValidator.js"


const editBtn = document.querySelector('.profile__edit');
const addBtn = document.querySelector('.profile__add');
const popupFormEdit = document.querySelector('.popup_form-edit');
const popupFormAdd = document.querySelector('.popup_form-add');
const popupImage = document.querySelector('.images__picture_fullscreen')
const closePopupFormEdit = document.querySelector('.popup__close_form-edit');
const closePopupFormAdd = document.querySelector('.popup__close_form-add');
const nameInput = document.querySelector('.popup__field_name');
const aboutInput = document.querySelector('.popup__field_about');
const titleInput = document.querySelector('.popup__field_title');
const linkInput = document.querySelector('.popup__field_link');
const nameOutput = document.querySelector('.profile__text');
const aboutOutput = document.querySelector('.profile__occupation');
const imagesList = document.querySelector(".images__list");
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

function renderCards(cardsArray) {
  cardsArray.forEach((item) => {
    const card = new Card(item);
    const cardElement = card.createCard(item.link, item.name);
    imagesList.append(cardElement)
    console.log(cardElement)
  })
}

const formEditValidator = new FormValidator(validationSettings, formElementEdit);
formEditValidator.enableValidation(validationSettings)
const formAddValidator = new FormValidator(validationSettings, formElementAdd);
formAddValidator.enableValidation(validationSettings)


document.addEventListener("keydown", (event) => {
  if ((event.key == 'Escape' || event.key == 'Esc' || event.keyCode == 27)) {
    closePopup(popupImage)
  }
})

function closePopup(popup) {
  popup.classList.add("popup_hidden")
}

function toggleDisplayForm(evt, form) {
  evt.preventDefault();
  form.classList.toggle("popup_hidden")
  const elements = form.querySelectorAll(".popup__input-error")
  elements.forEach(element => {
    element.classList.remove("popup__input-error_active")
  })
  const fields = form.querySelectorAll(".popup__field")
  fields.forEach(field => {
    field.classList.remove("popup__field_error")
  }); 
}

function editProfileForm(evt) {
  document.addEventListener("keydown", (event) => {
    if ((event.key == 'Escape' || event.key == 'Esc' || event.keyCode == 27)) {
      closePopup(popupFormEdit)
    }
  })
  popupFormEdit.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup")) {
      closePopup(popupFormEdit)
    }
  })

  nameInput.value = nameOutput.textContent;
  aboutInput.value = aboutOutput.textContent;
  toggleDisplayForm(evt, popupFormEdit);
}

function addPictureForm(evt) {

  document.addEventListener("keydown", (event) => {
    if ((event.key == 'Escape' || event.key == 'Esc' || event.keyCode == 27)) {
      closePopup(popupFormAdd)
    }
  })
  popupFormAdd.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup")) {
      closePopup(popupFormAdd)
    }
  })
  titleInput.value = ""
  linkInput.value = ""

  toggleDisplayForm(evt, popupFormAdd);
}

function formSubmitHandlerEdit(evt) {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  aboutOutput.textContent = aboutInput.value;
  toggleDisplayForm(evt, popupFormEdit);
}

function formSubmitHandlerAdd(evt) {
  const data = {name: titleInput.value, link: linkInput.value}
  evt.preventDefault();
  const card = new Card(data);
  const cardElement = card.createCard(data.link, data.name);
  imagesList.prepend(cardElement)
  toggleDisplayForm(evt, popupFormAdd);
}


formElementEdit.addEventListener('submit', (event) => {
  formSubmitHandlerEdit(event)
});
formElementAdd.addEventListener('submit', (event) => {
  formSubmitHandlerAdd(event)
})
editBtn.addEventListener('click', editProfileForm)
addBtn.addEventListener('click', addPictureForm)
closePopupFormEdit.addEventListener('click', (event) => {
  toggleDisplayForm(event, popupFormEdit)
})
closePopupFormAdd.addEventListener('click', (event) => {
  toggleDisplayForm(event, popupFormAdd)
})

renderCards(initialCards);