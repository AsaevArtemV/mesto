export default class UserInfo {
  //profileName - Текстовой элемент с именем пользователя
   //profileJob - Текстовой элемент с описанием деятельности пользователя
   //profileAvatar - Аватар пользователя

  constructor({ profileName, profileJob, profileAvatar }) {
    this.name = document.querySelector(profileName);
    this.job = document.querySelector(profileJob);
    this.avatar = document.querySelector(profileAvatar);
  }

  getUserId() {
    return this._id;
  }

  getUserInfo() {
    return {
      name: this.name.textContent,
      job: this.job.textContent,
      avatar: this.avatar.src,
    }
  }

  setUserInfo({
    name = this.name.textContent,
    about = this.job.textContent,
    avatar = this.avatar.src,
    _id,
  }) {
    this.name.textContent = name;
    this.job.textContent = about;
    this.avatar.src = avatar;
    this._id = _id;
  }
}
