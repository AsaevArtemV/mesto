import { viewImageCard } from './index.js'

export class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector('.card-template')
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  };

//ДОБАВЛЕНИЕ КАРТОЧИК ИЗ МАССИВА
  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners();

    // Добавим данные
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  };

  //СОБЫТИЕ КНОПКИ ЛАЙКОВ
  _handleLikeClick() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  };

  //СОБЫТИЕ КНОПКИ УДАЛИТЬ КАРТОЧКУ
  _handleDeleteCard() {
    this._element.remove();
  };

  _setEventListeners() {
    this._element.querySelector('.card__delete-button').addEventListener('click', () => this._handleDeleteCard());
    this._element.querySelector('.card__like-button').addEventListener('click', () => this._handleLikeClick());
    this._element.querySelector('.card__image').addEventListener('click', (evt) => viewImageCard(evt));
  }
};
