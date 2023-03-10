import { Card } from './Card.js'
import { initialCards } from './initialCards.js'
import { FormValidator } from './FormValidator.js'

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
const popupAddBtnOpenNewCard = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_add-card');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const popupBtnCloseAdd = document.querySelector('.popup__close-button_type_add');

//ПЕРЕМЕННЫЕ ДЛЯ ДОБАВЛЕНИЯ КАРТОЧКИ
const popupFormTypeAddCard = document.querySelector('.popup__form_type_add-card');

//ПЕРЕМЕННЫЕ ДЛЯ ПРОСМОТРА ФОТОГРАФИЙ
const popupIncreaseCard = document.querySelector('.popup_type_increase-card');
const popupBtnCloseIncrease = document.querySelector('.popup__close-button_type_increase');
const popupImg = document.querySelector('.popup__img');
const popupImgName = document.querySelector('.popup__img-name');

const enableValidationForm = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  setPopup: '.popup__set'
});

const popupAddFormValid = new FormValidator(enableValidationForm, popupFormTypeAddCard);
const popupEditFormValid = new FormValidator(enableValidationForm, profileFormEdit);

popupEditFormValid.enableValidation();
popupAddFormValid.enableValidation();

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ДОБАВИТЬ РЕДАКТИРОВАНИЕ ПРОФИЛЯ ПРИ ОТКРЫТИИ (попап)
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', actionHandlerEscape);
};

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ДОБАВИТЬ РЕДАКТИРОВАНИЕ ПРОФИЛЯ ПРИ ЗАКРЫТИИ (попап)
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', actionHandlerEscape);
};

//ФУНКЦИЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function handleOpenProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
  blockSaveButton (popupEditProfile, enableValidationForm);
  //resetError(popupEditProfile, enableValidationForm);
  popupEditFormValid.resetError();
};

//фУНКЦИЯ ДЛЯ ОТПРАВКИ ДАННЫХ НА САЙТ
export function handleSubmitProfileForm(evt) {
  evt.preventDefault(); //эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

initialCards.forEach((item) => {
  // Добавляем в DOM
  document.querySelector('.elements').append(createNewCard(item));
});

function createNewCard(item) {
  const card = new Card(item.name, item.link);
  const cardElement = card.generateCard();
  return cardElement;
};

//ФУНКЦИЯ НА СОБЫТИЕ ПРИ КЛИКЕ ПРОСМОТР КАРТИНКИ (попап)
  export function viewImageCard(evt) {
    popupImg.src = evt.target.closest('.card__image').src;
    popupImgName.alt = evt.target.closest('.card__image').alt;
    popupImgName.textContent = evt.target.closest('.card__image').alt;
    openPopup(popupIncreaseCard);
  };

//ФУНКЦИЯ ОБРАБОТКИ ФОРМЫ (отменяет стандартную отправку формы, вызов функции создания новой карточки, вызов функции закрыть попап)
function handleFormSubmitNewCard(evt) {//функция обработки формы отправки новой карты (объект описывающий событие)
  const name = titleInput.value;
  const link = linkInput.value;
  evt.preventDefault(); //эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки
  createNewCard(name, link);
  closePopup(popupAdd); //закрытие попапа дабавления карты
  document.querySelector('.elements').prepend(createNewCard( {name, link} ));
  popupFormTypeAddCard.reset();
};

//ФУНКЦИЯ БЛОКИРОВАНИЯ КНОПКИ ПРИ ОТКРЫТИИ ФОРМЫ ДОБАВЛЕНИЯ КАРТОЧКИ
function blockSaveButton (item, enable) {
  const popupSaveButton = item.querySelector(enable.submitButtonSelector);
  popupSaveButton.disabled = true;
  popupSaveButton.classList.add(enable.inactiveButtonClass);
};

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ОТКРЫТЬ РЕДАКТИРОВАНИЕ ПРОФИЛЯ (попап)
popupEditBtnOpen.addEventListener('click', handleOpenProfileForm);

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ЗАКРЫТЬ РЕДАКТИРОВАНИЕ ПРОФИЛЯ (попап)
popupBtnCloseEdit.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

//ПОДПИСКА НА СОБЫТИЕ ЗАКРЫТИЯ ОКНА РЕДАКТИРОВАНИЯ ПРОФИЛЯ ПРИ КЛИКИ НА ОВЕРЛЕЙ
popupEditProfile.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup(popupEditProfile);
  }
});

profileFormEdit.addEventListener('submit', handleSubmitProfileForm);

//ОБРАБОТЧИК СОБЫТИЙ ПРИ КЛИКИ НА КНОПКУ ДОБАВИТЬ НОВУЮ КАРТОЧКУ
popupAddBtnOpenNewCard.addEventListener('click', function () {
  titleInput.value = titleInput.textContent;
  linkInput.value = linkInput.textContent;
  openPopup(popupAdd);
  blockSaveButton (popupAdd, enableValidationForm);
  //resetError(popupAdd, enableValidationForm);
  popupAddFormValid.resetError();
});

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ЗАКРЫТЬ НОВУЮ КАРТОЧКУ (попап)
popupBtnCloseAdd.addEventListener('click', function () {
  closePopup(popupAdd);
});

//ПОДПИСКА НА СОБЫТИЕ ЗАКРЫТИЯ ОКНА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ ПРИ КЛИКИ НА ОВЕРЛЕЙ
popupAdd.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup(popupAdd);
  }
});

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ СОХРАНИТЬ (вызов функции обработки формы по нажатия кнопки "сохранить")
popupFormTypeAddCard.addEventListener('submit', handleFormSubmitNewCard);

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ЗАКРЫТЬ ПРОСМОТР КАРТИНКИ (попап)
popupBtnCloseIncrease.addEventListener('click', function () {
  closePopup(popupIncreaseCard);
});

//ПОДПИСКА НА СОБЫТИЕ ЗАКРЫТИЯ ОКНА ПРОСМОТРА КАРТИНКИ ПРИ КЛИКИ НА ОВЕРЛЕЙ
popupIncreaseCard.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup(popupIncreaseCard);
  }
});

function actionHandlerEscape (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
};
