export class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  };

//ДОБАВЛЕНИЕ КАРТОЧИК ИЗ МАССИВА
  generateCard() {
    // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like-button');

    this._setEventListeners();

    // Добавим данные
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  };

  //СОБЫТИЕ КНОПКИ ЛАЙКОВ
  _handleLikeClick() {
    this._likeButton.classList.toggle('card__like-button_active');
  };

  //СОБЫТИЕ КНОПКИ УДАЛИТЬ КАРТОЧКУ
  _handleDeleteCard() {
    this._element.remove();
  };

  _setEventListeners() {
    this._element.querySelector('.card__delete-button').addEventListener('click', () => this._handleDeleteCard());
    this._likeButton.addEventListener('click', () => this._handleLikeClick());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }
};
