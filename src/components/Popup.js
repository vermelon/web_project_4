export default class Popup {
    constructor(selector) {
      this._selector = selector;
      this._container = document.querySelector(this._selector);
      this._close = this._container.querySelector(".popup__close");
    }
  
  
    open() {
      this._container.classList.remove("popup_hidden");
      this._handleEscCloseAdd();
    }

    close() {
      this._container.classList.add("popup_hidden");
      this._handleEscCloseRemove();
    }
  
    _handleEscCloseAdd() {
      document.addEventListener("keydown", (event) => {
        if (event.key === 'Escape') {
          this.close();
        }
      })
    } 
    
    _handleEscCloseRemove() {
      document.removeEventListener("keydown", (event) => {
        if (event.key === 'Escape') {
          this.close();
        }
      })
    }

    _handleOverlayClickClose(){
      this._container.addEventListener("click", (event) => {
        if (event.target === this._container){
        this.close();
      }
    })
    }

    _handleClickXClose(){
      this._close.addEventListener('click', () => {
        this.close();

      });
    }
  
    setEventListeners() {
      this._handleOverlayClickClose();
      this._handleClickXClose();
    }
  }