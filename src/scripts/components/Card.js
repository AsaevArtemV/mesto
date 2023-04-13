//создание и функционирование карточки
export default class Card {
  constructor(
    {name, link, likes = [], owner, _id},
    cardSelector, handleCardClick, handleDeleteCard, handleLikeClick, userId) {
    //Отображаемый заголовок карточки
    this._name = name;
    //Ссылка на изображение
    this._link = link;
    //Массив с объектами пользователей, поставившими лайк
    this._likes = likes;
    //Объект пользователя-владельца
    this._owner = owner;
    //id карточки
    this._id = _id;
    //ID текущего пользователя
    this._userId = userId;
    //Счётчик лайков
    this._isLiked = this.checkIsLiked(this._likes);
    //Селектор template-элемента с шаблоном карточки
    this._cardSelector = cardSelector;
    //Функция-обработчик для клика по картинке
    this._handleCardClick = handleCardClick;
    //Функция-обработчик для кнопки удаления карточки
    this._handleDeleteCard = handleDeleteCard;
    //Функция-обработчик для лайка карточки
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  //СОЗДАЕТ КАРТОЧИКУ
  generateCard () {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like-button');

    // Заполнение содержимого
    const image = this._element.querySelector('.card__image');
    image.src = this._link;
    image.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    this.setLikesCard();

    this.setLikesCard(this._likes);

    if (this._owner._id !== this._userId) {
      this._element.querySelector('.card__delete-button').remove();
    }

    // Обработчики нажатий
    this._setEventListeners();

    return this._element;
  }

  //Блокирует кнопку лайка
  blockLikeButton() {
    this._likeButton.disabled = true;
  }

  //Разблокирует кнопку лайка
  unblockLikeButton() {
    this._likeButton.disabled = false;
  }

  //Определяет, есть ли лайк пользователя на карточке
  checkIsLiked() {
    return this._likes.some(user => user._id === this._userId);
  }

  _countLikes() {
    this._element.querySelector('.card__like-counter').textContent = this._likes.length;
};

  /**
    * Обрабатывает массив лайков карточки:
    * - при наличии аргумента сохраняет новые лайки
    * - записывает количество лайков в разметку
    * - сохраняет и показывает в разметке текущее состяние лайка пользователя
  */
  setLikesCard(likes) {
    const likeButton = this._element.querySelector('.card__like-button');

    if (likes) {
      this._likes = likes;
      this._isLiked = this.checkIsLiked();
    }

    this._countLikes();

    if (this._isLiked) {
      likeButton.classList.add('card__like-button_active');
    } else {
      likeButton.classList.remove('card__like-button_active');
    }
  }

  //Удаляет карточку
  deleteCard () {
    this._element.remove();
    this._element = null;
  }

  //Обработчики событий
  _setEventListeners() {
    //Открытие формы удаление карточки при клике на значек урны
    if (this._element.querySelector('.card__delete-button')) {
    this._element.querySelector('.card__delete-button').addEventListener('click', () => this._handleDeleteCard(this));
    }

    //Лайк при клики на сердечко
    this._element.querySelector('.card__like-button').addEventListener('click', () => this._handleLikeClick(this));


    //Просмотр карточки
    this._element.querySelector('.card__image').addEventListener('click', () => this._handleCardClick({name:this._name, link:this._link}));
  }
}
