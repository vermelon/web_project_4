let formElement = document.querySelector('.popup__form')
let editBtn = document.querySelector('.profile__edit');
let popup = document. querySelector('.popup');
let closePopup = document.querySelector('.popup__close_button')
let nameInput = document.getElementById("name");
let aboutInput = document.getElementById('about')
let nameOutput = document.querySelector('.profile__name_text')
let aboutOutput = document.querySelector('.profile__occupation')


function displayEdit (event) {
    if (popup.classList.contains("popup__hidden")){
        popup.classList.remove("popup__hidden")
        nameInput.value = nameOutput.textContent;
        aboutInput.value = aboutOutput.textContent;

    }
    else {
        popup.classList.add("popup__hidden")
    }
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameOutput.textContent = nameInput.value;
    aboutOutput.textContent = aboutInput.value;
    displayEdit();
}

// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', formSubmitHandler);
editBtn.addEventListener('click', displayEdit)
closePopup.addEventListener('click', displayEdit)