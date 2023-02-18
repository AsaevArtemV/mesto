// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const enableValidationForm = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  setPopup: '.popup__set'
});

const showInputError = (formElement, inputElement, errorMessage, enable) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(enable.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(enable.errorClass);
};

const hideInputError = (formElement, inputElement, enable) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(enable.inputErrorClass);
  errorElement.classList.remove(enable.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, enable) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, enable);
  } else {
    hideInputError(formElement, inputElement, enable);
  }
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some ((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, enable) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList, enable)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(enable.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(enable.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, enable) => {
  const inputList = Array.from(formElement.querySelectorAll(enable.inputSelector));
  const buttonElement = formElement.querySelector(enable.submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, enable);

  inputList.forEach ((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, enable);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, enable);
    });
  });
};

const enableValidation = (enable) => {
  const formList = Array.from(document.querySelectorAll(enable.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(enable.setPopup));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, enable);
    });
  });
};

enableValidation(enableValidationForm);

function resetError (valid, enable) {
  const errorDelete = Array.from(valid.querySelectorAll(enable.inputSelector));
  errorDelete.forEach(function (item) {
    hideInputError(valid, item, enable);
  });
};
