export default class Popup {
    constructor(selector) {
      this._selector = selector;
      this._container = document.querySelector(this._selector);
      this._close = this._container.querySelector(".popup__close");
    }
  
  
    open() {
      this._container.classList.remove("popup_hidden");
    }
    close() {
      this._container.classList.add("popup_hidden");
    }
  
    _handleEscClose() {
      document.addEventListener("keydown", (event) => {
        if ((event.key == 'Escape' || event.key == 'Esc' || event.keyCode == 27)) {
          this.close();
        }
      })
    }
  
    setEventListeners() {
      this._close.addEventListener('click', () => {
        this.close();
      });
      this._handleEscClose();
    }
  }