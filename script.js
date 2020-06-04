const formElementEdit = document.querySelector('.popup__form_edit');
const formElementAdd = document.querySelector('.popup__form_add');
const editBtn = document.querySelector('.profile__edit');
const addBtn = document.querySelector('.profile__add');
const popupFormEdit = document.querySelector('.popup_form-edit');
const popupFormAdd = document.querySelector('.popup_form-add');
const popupImage = document.querySelector('.popup_image');
const closePopupFormEdit = document.querySelector('.popup__close_form-edit');
const closePopupFormAdd = document.querySelector('.popup__close_form-add');
const closePopupImage = document.querySelector('.popup__close_image');
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

function deleteImage(evt) {
  evt.stopPropagation()
  evt.target.parentNode.parentNode.remove()
}

function toggleDisplayImage(evt) {
  popupImage.classList.toggle("popup_hidden")
  const url = evt.target.style.backgroundImage
  const caption = evt.target.parentNode.querySelector(".images__text").textContent
  popupImage.querySelector(".images__picture_fullscreen").src = url.substring(5, url.length - 2);
  popupImage.querySelector(".images__text_fullscreen").textContent = caption;
  popupImage.querySelector(".images__picture_fullscreen").alt = caption;
}

function createCard(name, link) {
  const imageTemplate = document.querySelector("#images__card").content;
  const imageElement = imageTemplate.cloneNode(true);
  const imgUrl = `url('${link}')`;
  const imagesPicture = imageElement.querySelector(".images__picture");
  const deleteBtn = imageElement.querySelector(".images__delete");
  imagesPicture.style.backgroundImage = imgUrl;
  deleteBtn.addEventListener("click", (evt) => {
    deleteImage(evt)
  }, false);
  imageElement.querySelector(".images__picture").addEventListener("click", (evt) => {
    toggleDisplayImage(evt);
  })
  imageElement.querySelector(".images__text").textContent = name;
  imageElement.querySelector(".images__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("images__like_active");
  })
  return imageElement
}

function renderCards(cardsArray) {
  imagesList.innerHTML = "";
  cardsArray.forEach((element) => imagesList.append(createCard(element.name, element.link)));
}

function toggleDisplayForm(evt, form) {
  evt.preventDefault();
  form.classList.toggle("popup_hidden")
}

function editProfileForm(evt) {
  nameInput.value = nameOutput.textContent;
  aboutInput.value = aboutOutput.textContent;
  toggleDisplayForm(evt, popupFormEdit);
}

function addPictureForm(evt) {
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
  const newCard = createCard(titleInput.value, linkInput.value)
  imagesList.prepend(newCard)
  toggleDisplayForm(evt, popupFormAdd);
}

renderCards(initialCards);
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
closePopupImage.addEventListener('click', toggleDisplayImage)