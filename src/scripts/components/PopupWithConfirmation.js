import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__form').addEventListener('submit',
      (evt) => {
        evt.preventDefault();
        this._handleSubmit(this._param);
      });
    }

  setParam(param) {
    this._param = param;
  }
}
