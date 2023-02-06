// Кнопка редактирования профиля
const popupEditBtnOpen = document.querySelector('.profile__edit-button');
const popupContainer = document.querySelector('.popup');
const popupBtnCloseEdit = document.querySelector('.popup__close-button_type_edit');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupBtnSave = document.querySelector('.popup__save-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

//Переменные кнопки добавления карточек
const popupAddBtnOpenNewCard = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_add-card');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const popupBtnCloseAdd = document.querySelector('.popup__close-button_type_add');

//Переменные для добавления карточки
const elements = document.querySelector('.elements');
const cardImageElement = document.querySelector('.card');
const cardTemplate = document.querySelector('.card-template');
const cardImage = document.querySelector('.card__image');
const cardTitle = document.querySelector('.card__title');
const popupFormTypeAddCard = document.querySelector('.popup__form_type_add-card');

//ПЕРЕМЕННЫЕ ДЛЯ ПРОСМОТРА ФОТОГРАФИЙ
const popupIncreaseСard = document.querySelector('.popup_type_increase-card');
const popupBtnCloseIncrease = document.querySelector('.popup__close-button_type_increase');
const popupImg = document.querySelector('.popup__img');
const popupImgName = document.querySelector('.popup__img-name');

//ПРЕМЕННАЯ ДЛЯ ЛАЙКОВ
const cardBtnLike = document.querySelector('.card__like-button');

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ДОБАВИТЬ РЕДАКТИРОВАНИЕ ПРОФИЛЯ (попап)
function openPopup(item) {
  item.classList.add('popup_is-opened');
}

function closePopup(item) {
  item.classList.remove('popup_is-opened');
}

popupEditBtnOpen.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
});

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ЗАКРЫТЬ РЕДАКТИРОВАНИЕ ПРОФИЛЯ (попап)
popupBtnCloseEdit.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

//Функция для отправки данных на сайт
function handleFormSubmit(evt) {
  evt.preventDefault(); //эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formElement.addEventListener('submit', handleFormSubmit);

// Добавление карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

//Функция добавления карточик из массива
initialCards.forEach(function (element) {
    const cardTemplate = document.querySelector('.card-template').content;
    const cardImageElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardImageElement.querySelector('.card__image').src = element.link;
    cardImageElement.querySelector('.card__image').alt = element.name;
    cardImageElement.querySelector('.card__title').textContent = element.name;
    elements.append(cardImageElement);
});

elements.addEventListener('click', cardDelete);

//ФУНКЦИЯ НА СОБЫТИЕ КНОПКИ УДАЛИТЬ КАРТОЧКУ
function cardDelete(evt) {
  if (evt.target.classList.contains('card__delete-button')) {
    const eventTarget = evt.target.closest('.card');
    eventTarget.remove();
  }
};

elements.addEventListener('click', likeCardHeart);

//ФУНКЦИЯ НА СОБЫТИЕ КНОПКИ ЛАЙКОВ
function likeCardHeart(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_active');
  }
};

//ТУТ РАБОТАЮ С ДОБАВЛЕНИЕМ НОВОЙ КАРТОЧКИ
//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ДОБАВИТЬ НОВУЮ КАРТОЧКУ (попап)
popupAddBtnOpenNewCard.addEventListener('click', function () {
  openPopup(popupAdd);
});

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ЗАКРЫТЬ НОВУЮ КАРТОЧКУ (попап)
popupBtnCloseAdd.addEventListener('click', function () {
  closePopup(popupAdd);
});

//ФУНКЦИЯ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ (клонирование, наполнение полей, размещение в DOM)
function addNewImageCard() {
  const cardTemplate = document.querySelector('.card-template').content; //указали весь контент
  const cardImageElement = cardTemplate.querySelector('.card').cloneNode(true); //клонируем весь контент блока
  cardImageElement.querySelector('.card__image').src = linkInput.value; //указываем что здесь будут вноситься изменения ссылки
  cardImageElement.querySelector('.card__image').alt = titleInput.value; //указываем что здесь будут вноситься изменения названия картинки
  cardImageElement.querySelector('.card__title').textContent = titleInput.value; //указываем что здесь будут вноситься изменения описания
  elements.prepend(cardImageElement); //добавления карты в начало контейнера
}

//ФУНКЦИЯ ОБРАБОТКИ ФОРМЫ (отменяет стандартную отправку формы, вызов функции создания новой карточки, вызов функции закрыть попап)
function handleFormSubmitNewCard(evt) {//функция обработки формы отправки новой карты (объект описывающий событие)
  evt.preventDefault(); //эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки
  addNewImageCard();
  closePopup(popupAdd); //закрытие попапа дабавления карты
}

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ СОХРАНИТЬ (вызов функции обработки формы по нажатия кнопки "сохранить")
popupFormTypeAddCard.addEventListener('submit', handleFormSubmitNewCard);

//ПОДПИСКА НА СОБЫТИЕ ПРИ КЛИКЕ ПРОСМОТР КАРТИНКИ (попап)
elements.addEventListener('click', function (evt) {
  if (evt.target.closest('.card__image')) {
    popupImg.src = evt.target.closest('.card__image').src;
    popupImgName.alt = evt.target.closest('.card__image').alt;
    popupImgName.textContent = evt.target.closest('.card__image').alt;
    openPopup(popupIncreaseСard);
  }
});

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ЗАКРЫТЬ ПРОСМОТР КАРТИНКИ (попап)
popupBtnCloseIncrease.addEventListener('click', function () {
  closePopup(popupIncreaseСard);
});
