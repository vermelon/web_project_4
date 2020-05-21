const formElement = document.querySelector('.popup__form')
const editBtn = document.querySelector('.profile__edit');
const popup = document. querySelector('.popup__hidden');
const closePopup = document.querySelector('.popup__close')
const nameInput = document.getElementById("name");
const aboutInput = document.getElementById('about')
const nameOutput = document.querySelector('.profile__text')
const aboutOutput = document.querySelector('.profile__occupation')


function displayEdit (event) {
    if (popup.classList.contains("popup__hidden")){
        popup.classList.add("popup")
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