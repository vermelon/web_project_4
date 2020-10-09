export default class UserInfo {
    constructor({
      id,
      name,
      about,
      avatar
    }) 
    {
      this._id = id
      this._name = document.querySelector(name);
      this._about = document.querySelector(about);
      this._avatar = document.querySelector(avatar);
    }
  
    getUserInfo() {
      return {
        id: this._id,
        name: this._name.textContent,
        about: this._about.textContent,
        avatar: this._avatar.src
      };
    }
  
    setUserInfo(inputValues) {
      this._name.textContent = inputValues.name;
      this._about.textContent = inputValues.about;
      this._id = inputValues._id;
      this._avatar.src = inputValues.avatar;
    }
  }