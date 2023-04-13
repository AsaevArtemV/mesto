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

    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeButtonCoun = this._element.querySelector('.card__like-counter');
    this._deleteBtn = this._element.querySelector('.card__delete-button');
    this._image = this._element.querySelector('.card__image');
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
    // Заполнение содержимого
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    this.setLikesCard();

    this.setLikesCard(this._likes);

    if (this._owner._id !== this._userId) {
      this._deleteBtn.remove();
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
    this._likeButtonCoun.textContent = this._likes.length;
};

  /**
    * Обрабатывает массив лайков карточки:
    * - при наличии аргумента сохраняет новые лайки
    * - записывает количество лайков в разметку
    * - сохраняет и показывает в разметке текущее состяние лайка пользователя
  */
  setLikesCard(likes) {
    if (likes) {
      this._likes = likes;
      this._isLiked = this.checkIsLiked();
    }

    this._countLikes();

    if (this._isLiked) {
      this._likeButton.classList.add('card__like-button_active');
    } else {
      this._likeButton.classList.remove('card__like-button_active');
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
    if (this._deleteBtn) {
      this._deleteBtn.addEventListener('click', () => this._handleDeleteCard(this));
    }

    //Лайк при клики на сердечко
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this));

    //Просмотр карточки
    this._image.addEventListener('click', () => this._handleCardClick({name:this._name, link:this._link}));
  }
}
