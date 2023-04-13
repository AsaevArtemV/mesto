import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

   //popupSelector - Селектор элемента с попапом
   //handleSubmit - Колбек для обработки отправки формы

   constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._submitButton = this._popup.querySelector('.popup__save-button');
    this._inputValues = {};
    this._allInputs = this._popup.querySelectorAll('.popup__input');
  }

  // Собирает данные всех полей формы
  _getInputValues() {
    this._allInputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  // Устанавливает слушатель на элементы
  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit();
      this.close();
    });
  }

  // Действия при сабмите формы
  _submit() {
    this._handleSubmit(this._getInputValues());
  }

  toggleButtonContent() {
    const buttonContent = this._submitButton.innerText;
    if (buttonContent === 'Сохранить') {
      this._submitButton.innerText = 'Сохранение...';
      }
    if (buttonContent === 'Сохранение...') {
      this._submitButton.innerText = 'Сохранить';
    }
      if (buttonContent === 'Создать') {
      this._submitButton.innerText = 'Создание...';
    }
    if (buttonContent === 'Создание...') {
      this._submitButton.innerText = 'Создать';
    }
  }

  // Закрывает попап
  close() {
    super.close();
    this._form.reset();
  }
}
