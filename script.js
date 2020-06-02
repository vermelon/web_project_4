const formElement = document.querySelector('.popup__form')
const editBtn = document.querySelector('.profile__edit');
const addBtn = document.querySelector('.profile__add')
const popupForm = document.querySelector('.popup_form');
const popupImage = document.querySelector('.popup_image')
const closePopupForm = document.querySelector('.popup__close_form')
const closePopupImage = document.querySelector('.popup__close_image')
const popupTitle = document.querySelector('.popup__title')
const nameInput = document.querySelector('.popup__field_name');
const aboutInput = document.querySelector('.popup__field_about')
const nameOutput = document.querySelector('.profile__text')
const aboutOutput = document.querySelector('.profile__occupation')
const popupSave = document.querySelector('.popup__save')
const imagesList = document.querySelector(".images__list");


let initialCards = [{

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
  imagesList.innerHTML = "";
  const imageTemplate = document.querySelector("#images__card").content;
  cardsArray.forEach(element => {
    const imageElement = imageTemplate.cloneNode(true);
    const imgUrl = `url('${element.link}')`
    imageElement.querySelector(".images__picture").style.backgroundImage = imgUrl;
    imageElement.querySelector(".images__delete").addEventListener("click", evt => {
      deleteCard(evt)
    })

    imageElement.querySelector(".images__picture").addEventListener("click", evt => {
      toggleDisplayImage(evt)
    })
    imageElement.querySelector(".images__text").textContent = element.name;

    imageElement.querySelector(".images__like").addEventListener("click", evt => {
      evt.target.classList.toggle("images__like_active");
    });
    imagesList.append(imageElement);
  })
}

function deleteCard(evt) {
  evt.stopPropagation()
  const parentElement = evt.target.parentElement.parentElement
  const text = parentElement.querySelector(".images__text").textContent
  initialCards = initialCards.filter(element => element.name !== text)
  renderCards(initialCards)
}

function toggleDisplayForm(evt) {
  evt.preventDefault();
  popupForm.classList.toggle("popup_hidden")
}

function toggleDisplayImage(evt) {
  popupImage.classList.toggle("popup_hidden")
  const url = evt.path[0].style.backgroundImage
  popupImage.querySelector(".images__picture_fullscreen").src = url.substring(5, url.length - 2);
  popupImage.querySelector(".images__text_fullscreen").textContent = evt.path[1].outerText;
  popupImage.querySelector(".images__picture_fullscreen").alt = evt.path[1].outerText;;
}


function editProfile(evt) {
  popupTitle.textContent = "Edit Profile"
  nameInput.placeholder = "Name";
  aboutInput.placeholder = "About"
  popupSave.textContent = "Save"
  nameInput.value = nameOutput.textContent;
  aboutInput.value = aboutOutput.textContent;
  toggleDisplayForm(evt);
}

function addPicture(evt) {
  popupTitle.textContent = "New Place"
  nameInput.placeholder = "Title";
  aboutInput.placeholder = "Image link"
  popupSave.textContent = "Create"
  nameInput.value = null;
  aboutInput.value = null;
  toggleDisplayForm(evt);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  if (popupTitle.textContent === "Edit Profile") {
    nameOutput.textContent = nameInput.value;
    aboutOutput.textContent = aboutInput.value;
    toggleDisplayForm(evt);
  } else {
    initialCards.unshift({
      name: nameInput.value,
      link: aboutInput.value
    })
    toggleDisplayForm(evt);
    renderCards(initialCards);
  }
}

renderCards(initialCards);
formElement.addEventListener('submit', formSubmitHandler);
editBtn.addEventListener('click', editProfile)
addBtn.addEventListener('click', addPicture)
closePopupForm.addEventListener('click', toggleDisplayForm)
closePopupImage.addEventListener('click', toggleDisplayImage)