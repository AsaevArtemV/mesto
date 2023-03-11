import { Card } from './Card.js'
import { initialCards } from './initialCards.js'
import { FormValidator } from './FormValidator.js'

//ПЕРЕМЕННЫЕ ДЛЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const popupEditBtnOpen = document.querySelector('.profile__edit-button');
const profileForm = document.forms["profile-form"];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

//ПЕРЕМЕННЫЕ КНОПКИ ДОБАВЛЕНИЯ КАРТОЧЕК
const element = document.querySelector('.elements');
const popupAddBtnOpenNewCard = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_add-card');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const popupBtnCloseAdd = document.querySelector('.popup__close-button_type_add');

//ПЕРЕМЕННЫЕ ДЛЯ ДОБАВЛЕНИЯ КАРТОЧКИ
const cardForm = document.forms["card-form"];

//ПЕРЕМЕННЫЕ ДЛЯ ПРОСМОТРА ФОТОГРАФИЙ
const popupIncreaseCard = document.querySelector('.popup_type_increase-card');
const popupImg = document.querySelector('.popup__img');
const popupImgName = document.querySelector('.popup__img-name');

const popups = document.querySelectorAll('.popup')

const enableValidationForm = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  setPopup: '.popup__set'
});

const popupAddFormValid = new FormValidator(enableValidationForm, cardForm);
const popupEditFormValid = new FormValidator(enableValidationForm, profileForm);

popupEditFormValid.enableValidation();
popupAddFormValid.enableValidation();

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ДОБАВИТЬ РЕДАКТИРОВАНИЕ ПРОФИЛЯ ПРИ ОТКРЫТИИ (попап)
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape);
};

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ДОБАВИТЬ РЕДАКТИРОВАНИЕ ПРОФИЛЯ ПРИ ЗАКРЫТИИ (попап)
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);
};

//ФУНКЦИЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function handleOpenProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
  popupEditFormValid.resetValidation();
};

//фУНКЦИЯ ДЛЯ ОТПРАВКИ ДАННЫХ НА САЙТ
export function handleSubmitProfileForm(evt) {
  evt.preventDefault(); //эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

//ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧИК ИЗ МАССИВА
initialCards.forEach((item) => {
  // Добавляем в DOM
  element.append(createNewCard(item));
});

//ФУНКЦИЯ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function createNewCard(item) {
  const card = new Card( item.name, item.link, '.card-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

//ФУНКЦИЯ НА СОБЫТИЕ ПРИ КЛИКЕ ПРОСМОТР КАРТИНКИ (попап)
  function handleCardClick(name, link) {
    popupImg.src = link;
    popupImgName.alt = name;
    popupImgName.textContent = name;
    openPopup(popupIncreaseCard);
  };

//ФУНКЦИЯ ОБРАБОТКИ ФОРМЫ (отменяет стандартную отправку формы, вызов функции создания новой карточки, вызов функции закрыть попап)
function handleFormSubmitNewCard(evt) {//функция обработки формы отправки новой карты (объект описывающий событие)
  const name = titleInput.value;
  const link = linkInput.value;
  evt.preventDefault(); //эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки
  closePopup(popupAdd); //закрытие попапа дабавления карты
  element.prepend(createNewCard( {name, link} ));
  cardForm.reset();
};

//ФУНКЦИЯ ЗАКРЫТИЕ ПОПАПА ПРИ НАЖАТИЕ КНОПКУ Escape
function handleEscape (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
};

//ФУНКЦИЯ ЗАКРЫТИЕ ПОПАПА ПРИ КЛИКИ НА ОВЕРЛЕЙ И КРЕСТИК
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ ОТКРЫТЬ РЕДАКТИРОВАНИЕ ПРОФИЛЯ (попап)
popupEditBtnOpen.addEventListener('click', handleOpenProfileForm);

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ СОХРАНИТЬ ОКНА РЕДАКТИРОВАНИЯ ПРОФИЛЯ (вызов функции обработки формы по нажатия кнопки "сохранить")
profileForm.addEventListener('submit', handleSubmitProfileForm);

//ОБРАБОТЧИК СОБЫТИЙ ПРИ КЛИКИ НА КНОПКУ ДОБАВИТЬ НОВУЮ КАРТОЧКУ
popupAddBtnOpenNewCard.addEventListener('click', function () {
  cardForm.reset();
  openPopup(popupAdd);
  popupAddFormValid.resetValidation();
});

//ПОДПИСКА НА СОБЫТИЕ ДЛЯ КНОПКИ СОХРАНИТЬ ОКНА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ (вызов функции обработки формы по нажатия кнопки "сохранить")
cardForm.addEventListener('submit', handleFormSubmitNewCard);
