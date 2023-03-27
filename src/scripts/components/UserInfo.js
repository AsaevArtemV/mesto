export default class UserInfo {
  //profileName - Текстовой элемент с именем пользователя
   //profileJob - Текстовой элемент с описанием деятельности пользователя

  constructor( {profileName, profileJob} ) {
    this._name = document.querySelector(profileName);
    this._job = document.querySelector(profileJob);
  }

  //Возвращает объект с данными пользователя
  getUserInfo() {
    const profileUserInfo = {
      name: this._name.textContent,
      job: this._job.textContent
    }
    
    return profileUserInfo
  }

  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(item) {
    this._name.textContent = item.name;
    this._job.textContent = item.job;
  }
}
