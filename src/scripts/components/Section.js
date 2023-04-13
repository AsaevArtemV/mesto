export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
}

  addItem(element) {
    this._container.append(element);
  };

  addItemRev(element) {
    this._container.prepend(element);
  };
}
