import './index.css';

import {
  initialCards,
  popupEditBtnOpen,
  profileForm,
  nameInput,
  jobInput,
  popupAddBtnOpenNewCard,
  cardForm,
  enableValidationForm
} from '../scripts/utils/constants.js';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';


// Создали и возвращаем готовую карточку с уже установленными обработчиками
function createCard(item) {
  const card = new Card(item.name, item.link, '.card-template', {
    handleCardClick: () => {
      imagePopup.open(item.name, item.link);
    }
  });

  return card.generateCard();
};

const imagePopup = new PopupWithImage('.popup_type_increase-card');

const renderer = (item) => {
  const cardList = createCard(item)
  cardsSection.addItem(cardList);
};

const cardsSection = new Section({
  items: initialCards,
  renderer
}, '.elements');

const userInfo = new UserInfo({
  profileName:'.profile__title',
  profileJob:'.profile__subtitle'
});

const popupWithFormProfile = new PopupWithForm('.popup_type_edit-profile', {
  handleSubmit: (item) => userInfo.setUserInfo(item)
});

const popupWithFormCard = new PopupWithForm('.popup_type_add-card', {
  handleSubmit: (item) => renderer(item)
});

const popupAddFormValid = new FormValidator(enableValidationForm, cardForm);
const popupEditFormValid = new FormValidator(enableValidationForm, profileForm);

cardsSection.renderedItems();
popupEditFormValid.enableValidation();
popupAddFormValid.enableValidation();

popupAddBtnOpenNewCard.addEventListener('click', () => {
  popupWithFormCard.open();
  popupAddFormValid.resetValidation();
});

popupEditBtnOpen.addEventListener('click', () => {
  const profileUserInfo = userInfo.getUserInfo();
  nameInput.value = profileUserInfo.name;
  jobInput.value = profileUserInfo.job;
  popupWithFormProfile.open();
  popupEditFormValid.resetValidation();
});
