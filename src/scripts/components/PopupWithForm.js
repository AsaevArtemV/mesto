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
    });
  }

  // Действия при сабмите формы
  _submit() {
    this._handleSubmit(this._getInputValues());
  }

  toggleButtonContent() {
    const content  = this._submitButton.innerText;
    const switchText = text => {
      this._submitButton.innerText = text;
    };
    switch (content) {
      case 'Сохранить':
        switchText('Сохранение...');
        break;
      case 'Сохранение...':
        switchText('Сохранить');
        break;
      case 'Создать':
        switchText('Создание...');
        break;
      case 'Создание...':
        switchText('Создать');
        break;
      default:
        break;
    }
  }

  // Закрывает попап
  close() {
    super.close();
    this._form.reset();
  }
}
