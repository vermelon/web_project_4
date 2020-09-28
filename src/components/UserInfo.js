export default class UserInfo {
    constructor({
      name,
      about
    }) 
    {
      this._name = document.querySelector(name);
      this._about = document.querySelector(about);
    }
  
    getUserInfo() {
      return {
        name: this._name.textContent,
        about: this._about.textContent,
      };
    }
  
    setUserInfo(inputValues) {
      this._name.textContent = inputValues.name;
      this._about.textContent = inputValues.about;
    }
  }