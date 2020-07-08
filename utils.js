
const popupImage = document.querySelector('.images__picture_fullscreen');
const popupImageContainer = document.querySelector('.popup_image');
const popupImageCaption = document.querySelector('.images__text_fullscreen')


export function handleOpenImagePopup(link, name) {
    popupImageContainer.classList.remove("popup_hidden");
    popupImage.src = link;
    popupImage.alt, popupImageCaption.textContent = name;
    console.log(popupImage)
    document.addEventListener("keydown", (event) => {
      if ((event.key == 'Escape' || event.key == 'Esc' || event.keyCode == 27)) {
        closeAllPopup(popupImageContainer)
      }
    })
    popupImageContainer.addEventListener("click", () => {
             closeAllPopup(popupImageContainer)
      
    })
  }

export function handleCloseImagePopup() {
    popupImageContainer.classList.add("popup_hidden");
    popupImage.src = "";
    popupImage.alt = "", 
    popupImageCaption.textContent = "";
  }

export function closeAllPopup(popup) {
    popup.classList.add("popup_hidden")
  }
  
export function toggleDisplayForm(evt, form) {
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