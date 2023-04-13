// Добавление карточек
export const initialCards = [
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

export const cardsSelector = '.cards';
export const cardTemplateSelector = '#card';

//ПЕРЕМЕННЫЕ ДЛЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
export const popupEditBtnOpen = document.querySelector('.profile__edit-button');
export const profileForm = document.forms["profile-form"];
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');

//ПЕРЕМЕННЫЕ ДЛЯ ПОПАПА С ОБНОВЛЕНИЕМ АВАТАРА
export const popupUpdateAvatarBtnOpen = document.querySelector('.profile__avatar-button');

//ПЕРЕМЕННЫЕ КНОПКИ ДОБАВЛЕНИЯ КАРТОЧЕК
export const popupAddBtnOpenNewCard = document.querySelector('.profile__add-button');
export const avatarForm = document.forms["avatar-form"];

//ПЕРЕМЕННЫЕ ДЛЯ ДОБАВЛЕНИЯ КАРТОЧКИ
export const cardForm = document.forms["card-form"];

export const enableValidationForm = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  setPopup: '.popup__set'
});
