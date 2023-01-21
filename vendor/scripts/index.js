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

const formElement = document.querySelector('form');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');

    function handleFormSubmit (evt) {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

      console.log(nameInput.value);
      console.log(jobInput.value);

      const profileTitle = document.querySelector('.profile__title');
      const profileSubtitle = document.querySelector('.profile__subtitle');

      profileTitle.textContent = nameInput.value;
      profileSubtitle.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);
