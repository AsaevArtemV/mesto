//ПЕРЕМЕННЫЕ ДЛЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const popupEditBtnOpen = document.querySelector('.profile__edit-button');
const popupBtnCloseEdit = document.querySelector('.popup__close-button_type_edit');
const profileFormEdit = document.querySelector('.popup__form_type_edit-profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

//ПЕРЕМЕННЫЕ КНОПКИ ДОБАВЛЕНИЯ КАРТОЧЕК
const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');
const popupAddBtnOpenNewCard = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_add-card');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const popupBtnCloseAdd = document.querySelector('.popup__close-button_type_add');

//ПЕРЕМЕННЫЕ ДЛЯ ДОБАВЛЕНИЯ КАРТОЧКИ
const cardsContainer = document.querySelector('.elements');
const popupFormTypeAddCard = document.querySelector('.popup__form_type_add-card');

//ПЕРЕМЕННЫЕ ДЛЯ ПРОСМОТРА ФОТОГРАФИЙ
const popupIncreaseCard = document.querySelector('.popup_type_increase-card');
const popupBtnCloseIncrease = document.querySelector('.popup__close-button_type_increase');
const popupImg = document.querySelector('.popup__img');
const popupImgName = document.querySelector('.popup__img-name');

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ДОБАВИТЬ РЕДАКТИРОВАНИЕ ПРОФИЛЯ ПРИ ОТКРЫТИИ (попап)
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
};

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ДОБАВИТЬ РЕДАКТИРОВАНИЕ ПРОФИЛЯ ПРИ ЗАКРЫТИИ (попап)
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
};

//ФУНКЦИЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function handleOpenProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
};

//фУНКЦИЯ ДЛЯ ОТПРАВУИ ДАННЫХ НА САЙТ
function handleSubmitProfileForm(evt) {
  evt.preventDefault(); //эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

//ФУНКЦИЯ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ (клонирование, наполнение полей, размещение в DOM)
function addNewImageCard() {
  const name = titleInput.value;
  const link = linkInput.value;
  const card = createCard(name, link);
  cardsContainer.prepend(card);
};

//ФУНКЦИЯ ДОБОВЛЕНИЯ КАРТОЧИК В МАССИВ
function renderCards(initialCards) {
  const cards = initialCards.map(function(card) {
    return createCard(card.name, card.link);
  });
  cardsContainer.append(...cards);
};

renderCards(initialCards);

function createCard(name, link) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = name;
  card.querySelector('.card__title').textContent = name;

  const buttonLike = card.querySelector('.card__like-button');
  const buttonDelete = card.querySelector('.card__delete-button');
  const image = card.querySelector('.card__image');

//ФУНКЦИЯ НА СОБЫТИЕ КНОПКИ ЛАЙКОВ
  buttonLike.addEventListener('click', function handleLikeClick(evt) {
    evt.target.classList.toggle('card__like-button_active');
  });

//ФУНКЦИЯ НА СОБЫТИЕ КНОПКИ УДАЛИТЬ КАРТОЧКУ
  buttonDelete.addEventListener('click', function handleDeleteCard(evt) {
    const eventTarget = evt.target.closest('.card');
    eventTarget.remove();
  });

//ФУНКЦИЯ НА СОБЫТИЕ ПРИ КЛИКЕ ПРОСМОТР КАРТИНКИ (попап)
  image.addEventListener('click', function viewImageCard(evt) {
    evt.target.closest('.card__image');
    popupImg.src = evt.target.closest('.card__image').src;
    popupImgName.alt = evt.target.closest('.card__image').alt;
    popupImgName.textContent = evt.target.closest('.card__image').alt;
    openPopup(popupIncreaseCard);
  });

  return card;
};

//ФУНКЦИЯ ОБРАБОТКИ ФОРМЫ (отменяет стандартную отправку формы, вызов функции создания новой карточки, вызов функции закрыть попап)
function handleFormSubmitNewCard(evt) {//функция обработки формы отправки новой карты (объект описывающий событие)
  evt.preventDefault(); //эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки
  addNewImageCard();
  closePopup(popupAdd); //закрытие попапа дабавления карты
  popupFormTypeAddCard.reset()
};

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ОТКРЫТЬ РЕДАКТИРОВАНИЕ ПРОФИЛЯ (попап)
popupEditBtnOpen.addEventListener('click', handleOpenProfileForm);

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ЗАКРЫТЬ РЕДАКТИРОВАНИЕ ПРОФИЛЯ (попап)
popupBtnCloseEdit.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

profileFormEdit.addEventListener('submit', handleSubmitProfileForm);

//ОБРАБОТЧИК СОБЫТИЙ ПРИ КЛИКИ НА КНОПКУ ДОБАВИТЬ НОВУЮ КАРТОЧКУ
popupAddBtnOpenNewCard.addEventListener('click', function () {
  openPopup(popupAdd);
});

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ЗАКРЫТЬ НОВУЮ КАРТОЧКУ (попап)
popupBtnCloseAdd.addEventListener('click', function () {
  closePopup(popupAdd);
});

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ СОХРАНИТЬ (вызов функции обработки формы по нажатия кнопки "сохранить")
popupFormTypeAddCard.addEventListener('submit', handleFormSubmitNewCard);

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ЗАКРЫТЬ ПРОСМОТР КАРТИНКИ (попап)
popupBtnCloseIncrease.addEventListener('click', function () {
  closePopup(popupIncreaseCard);
});
