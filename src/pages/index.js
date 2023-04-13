import './index.css';

import {
  cardTemplateSelector,
  popupEditBtnOpen,
  profileForm,
  nameInput,
  jobInput,
  popupAddBtnOpenNewCard,
  cardForm,
  avatarForm,
  enableValidationForm,
  popupUpdateAvatarBtnOpen
} from '../scripts/utils/constants.js';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import { api } from '../scripts/components/Api.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';

const cards = {};

const userInfo = new UserInfo({
  profileName:'.profile__title',
  profileJob:'.profile__subtitle',
  profileAvatar:'.profile__avatar-image',
});

const renderer = (item) => {
  const cardList = createCard(item)
  cardsSection.addItem(cardList);
};

// Создали и возвращаем готовую карточку с уже установленными обработчиками
function createCard(data) {
  const card = new Card(
    data,
    cardTemplateSelector,
    handleCardClick,
    handleDeleteCard,
    handleLikeClick,
    userInfo._id);

  cards[data._id] = card;

  return card.generateCard();
};

//Первоначальное получение данных от сервера
Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
])
  .then(results => {
    userInfo.setUserInfo(results[0]);
    cardsSection.renderItems(results[1]);
  })
  .catch((err) => {
    console.log(err)
  });

const cardsSection = new Section(renderer, '.elements');

//ФОРМА ОБНАВЛЕНИЯ АВАТАРА ПОЛЬЗОВТЕЛЯ
const popupAvatar = new PopupWithForm('.popup_type_update-avatar',
{
  handleSubmit: (item) => {
    popupAvatar.toggleButtonContent();
      api.changeAvatar(item)
        .then((res) => {
          userInfo.setUserInfo(res);
          popupAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupAvatar.toggleButtonContent();
        });
  }
});

//ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const popupWithFormProfile = new PopupWithForm('.popup_type_edit-profile',
{
  handleSubmit: (item) => {
    popupWithFormProfile.toggleButtonContent();
      api.setUserInfo(item)
        .then((res) => {
          userInfo.setUserInfo(res);
          popupWithFormProfile.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithFormProfile.toggleButtonContent();
        });
    }
});

//ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
const popupWithFormCard = new PopupWithForm('.popup_type_add-card', {
  handleSubmit: (item) => {
    popupWithFormCard.toggleButtonContent();
    api.addNewCard({name: item.name, link: item.link})
      .then((cardData) => {
        const cardElement = createCard(cardData);
        cardsSection.addItemRev(cardElement);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormCard.toggleButtonContent();
    });
  }
});

// ФУНКЦИЯ ПОСТАНОВКИ И УДАЛЕНИЯ ЛАЙКОВ
function handleLikeClick (card) {
  if (card.checkIsLiked()) {
    api.deleteLike(card._id)
      .then((res) => {
        return res["likes"]
      })
      .then((likes) => {
        card.setLikesCard(likes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.addLike(card._id)
      .then((res) => {
        return res["likes"]
      })
      .then((likes) => {
        card.setLikesCard(likes)
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

//УДАЛЕНИЕ КАРТОЧКИ
const handleFormSubmit = (card) => {
  api.deleteCard(card._id)
    .then(() => {
      card.deleteCard();
      popupWithConfirmation.close();
    })
};

//УДАЛЕНИЕ КАРТОЧКИ
const handleDeleteCard = (card) => {
  popupWithConfirmation.setParam(card);
  popupWithConfirmation.open();
};

//ПОПАП ПРОСМОТР КАРТИНКИ
const popupWithImage = new PopupWithImage('.popup_type_increase-card');

//ФУНКЦИЯ ПРОСМОТРА КАРТИНКИ
function handleCardClick(data) {
  popupWithImage.open(data.name, data.link);
};

const popupAvatarFormValid = new FormValidator(enableValidationForm, avatarForm);
const popupEditFormValid = new FormValidator(enableValidationForm, profileForm);
const popupAddFormValid = new FormValidator(enableValidationForm, cardForm);
const popupWithConfirmation = new PopupWithConfirmation('.popup_type_delete-card', {handleSubmit: handleFormSubmit});

popupAvatarFormValid.enableValidation();
popupEditFormValid.enableValidation();
popupAddFormValid.enableValidation();

popupAvatar.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormCard.setEventListeners();
popupWithConfirmation.setEventListeners();
popupWithImage.setEventListeners();

//УСТАНОВКА СЛУШАТЕЛЯ НА КНОПКУ ОБНОВИТЬ АВАТАР ПОЛЬЗОВАТЕЛЯ
popupUpdateAvatarBtnOpen.addEventListener('click', () => {
  popupAvatar.open();
  popupAvatarFormValid.resetValidation();
});

//УСТАНОВКА СЛУШАТЕЛЯ НА КНОПКУ РЕДАКТИРОВАНИЕ ПРОФИЛЯ
popupEditBtnOpen.addEventListener('click', () => {
  const profileUserInfo = userInfo.getUserInfo();
  nameInput.value = profileUserInfo.name;
  jobInput.value = profileUserInfo.job;
  popupWithFormProfile.open();
  popupEditFormValid.resetValidation();
});

//УСТАНОВКА СЛУШАТЕЛЯ НА КНОПКУ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
popupAddBtnOpenNewCard.addEventListener('click', () => {
  popupWithFormCard.open();
  popupAddFormValid.resetValidation();
});
