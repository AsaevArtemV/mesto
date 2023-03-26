import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._popup.querySelector('.popup__img');
    this._caption = this._popup.querySelector('.popup__img-name');
  }

  // ПРОСМОТР КАРТИНКИ (попап)
  open(name, link) {
    this._img.src = link;
    this._img.alt = `${name}`;
    this._caption.textContent = name;
    super.open();
  }
}
