import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

   //popupSelector - Селектор элемента с попапом
   //handleSubmit - Колбек для обработки отправки формы

  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._inputValues = {};
    this._form = this._popup.querySelector('.popup__form');
    this._allInputs = this._form.querySelectorAll('.popup__input');
  }

  // Собирает данные всех полей формы
  _getInputValues() {
    this._allInputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  // Устанавливает слушатель на элементы
  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit();
      this.close();
    });
  }

  // Действия при сабмите формы
  _submit() {
    this._handleSubmit(this._getInputValues());
  }

  // Закрывает попап
  close() {
    super.close();
    this._form.reset();
  }
/*
  // Блокирует кнопку отправки во время выполнения запроса
  // blockedButtonText - Текст, отображаемый на кнопке
  blockSubmitButton(blockedButtonText = 'Сохранение...') {
    this._blockedButtonText = blockedButtonText;
    this._submitButton.disabled = true;
    this._submitButton.textContent = this._blockedButtonText;
  }

  //Возвращает состояние кнопки отправки после блокировки
  unblockSubmitButton() {
    this._submitButton.disabled = false;
    this._submitButton.textContent = this._originalButtonText;
  }

  //Открывает попап
  //open() {
    //super.open();
 // }
 */
}

