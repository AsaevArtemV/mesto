const popupBtnOpen = document.querySelector('.profile__edit-button');
const popupContainer = document.querySelector('.popup');
const popupBtnClose = document.querySelector('.popup__close-button')
  popupBtnOpen.addEventListener('click', openPopup);
  popupBtnClose.addEventListener('click', closePopup);

    function openPopup () {
      popupContainer.classList.add('popup__is-opened');
    }

    function closePopup () {
      popupContainer.classList.remove('popup__is-opened');
    }
