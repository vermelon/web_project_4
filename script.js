const formElement = document.querySelector('.popup__form')
const editBtn = document.querySelector('.profile__edit');
const popup = document. querySelector('.popup_hidden');
const closePopup = document.querySelector('.popup__close')
const nameInput = document.querySelector('.popup__field_name');
const aboutInput = document.querySelector('.popup__field_about')
const nameOutput = document.querySelector('.profile__text')
const aboutOutput = document.querySelector('.profile__occupation')


function toggleDisplay (event) {
    popup.classList.toggle("popup_hidden")
}

function editProfile (event) {
    toggleDisplay (event);
    nameInput.value = nameOutput.textContent;
    aboutInput.value = aboutOutput.textContent;
}    
    //if (popup.classList.contains("popup_hidden")){
    //    popup.classList.remove("popup_hidden")
    //    nameInput.value = nameOutput.textContent;
    //    aboutInput.value = aboutOutput.textContent;

   // }
   // else {
  //      popup.classList.add("popup_hidden")
 //   }
//}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameOutput.textContent = nameInput.value;
    aboutOutput.textContent = aboutInput.value;
    toggleDisplay();
}

// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', formSubmitHandler);
editBtn.addEventListener('click', editProfile)
closePopup.addEventListener('click', toggleDisplay)