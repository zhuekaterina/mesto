export default class Section {
    constructor({items, renderer}, containerElement) {
        this._items = items;
        this._renderer = renderer;
        this._container = containerElement;
    }

    renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        })
    }
    
    renderNewitems() {
        this._renderer(item);
    }

    addItem(element) {
        this._container.prepend(element);
    }
}