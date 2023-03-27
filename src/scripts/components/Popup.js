export default class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscape = this._handleEscape.bind(this);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    this._form = this._popup.querySelector('.popup__form');
    this.setEventListeners();
  }

  // ОТКРЫТИЕ ПОПАПА
  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscape);
  }

  // ЗАКРЫТИЕ ПОПАПА
  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscape);
  }

  //ЗАКРЫТИЕ ПОПАПА ПРИ НАЖАТИЕ КНОПКУ Escape
  _handleEscape(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

// СЛУШАТЕЛИ ДЛЯ ЗАКРЫТИЕ ПОПАПА ПРИ КЛИКИ НА ОВЕРЛЕЙ И КРЕСТИК
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) this.close();
    });

    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
  }
}
