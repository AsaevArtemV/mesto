class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //Проверяет на ошибку
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

//Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      // .then(this._checkResponse) ИСПРАВИТЬ ВО ВСЕХ МЕТОДАХ!!!
      .then(res => this._checkResponse(res))
      .catch(err => console.log(err));
  }

//Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then(res => this._checkResponse(res))
      .catch(err => console.log(err));
  }

//Устанавливает новые имя и профессию текущего пользователя
  setUserInfo({ name, job }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    })
      .then(res => this._checkResponse(res))
      .catch(err => console.log(err));
  }

//Добавление новой карточки
  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(res => this._checkResponse(res))
      .catch(err => console.log(err));
  }

 // добавить лайк карточки
  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
      .catch(err => console.log(err));
  }

  // удалить лайк карточки
  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
      .catch(err => console.log(err));
  }

//Удаление карточки
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
      .catch(err => console.log(err));
  }

//Обновление аватара пользователя
  changeAvatar({ link }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then(res => this._checkResponse(res))
      .catch(err => console.log(err));
  }
}

//Настройки для подключения к серверу
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '84af6c44-a585-423c-871f-7db63185d3ce',
    'Content-Type': 'application/json'
  }
});
