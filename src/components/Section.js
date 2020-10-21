export default class Section {
    constructor({renderer}, containerElement) {
        this._renderer = renderer;
        this._container = containerElement;
    }

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        })
    }
    
    renderNewitem(item) {
        this._renderer(item);
    }

    addItem(element) {
        this._container.prepend(element);
    }
}