const popupBtnOpen = document.querySelector('.profile__edit-button');
const popupContainer = document.querySelector('.popup');
const popupBtnClose = document.querySelector('.popup__close-button')
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupBtnSave = document.querySelector('.popup__save-button');

  popupBtnOpen.addEventListener('click', openPopup);
  popupBtnClose.addEventListener('click', closePopup);

    function openPopup () {
      popupContainer.classList.add('popup_is-opened');

      nameInput.value = profileTitle.textContent;
      jobInput.value = profileSubtitle.textContent;
    }

    function closePopup () {
      popupContainer.classList.remove('popup_is-opened');
    }


    function handleFormSubmit (evt) {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

      //console.log(nameInput.value);
      //console.log(jobInput.value);

      profileTitle.textContent = nameInput.value;
      profileSubtitle.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);
popupBtnSave.addEventListener('click', closePopup);
