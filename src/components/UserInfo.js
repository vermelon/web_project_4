export default class UserInfo {
    constructor({
      id,
      name,
      about
    }) 
    {
      this._id = id
      this._name = document.querySelector(name);
      this._about = document.querySelector(about);
    }
  
    getUserInfo() {
      return {
        id: this._id,
        name: this._name.textContent,
        about: this._about.textContent,
      };
    }
  
    setUserInfo(inputValues) {
      this._name.textContent = inputValues.name;
      this._about.textContent = inputValues.about;
      this._id = inputValues._id;
    }
  }