export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
        this._closeButton = this._popupSelector.querySelector('.popup__close-button');
    }
    open() {
        this._popupSelector.classList.add('popup_opened');
        document.body.addEventListener('keydown', this._handleOverlayClose);
        this._popupSelector.addEventListener('click', this._handleOverlayClose);
    }
    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.body.removeEventListener('keydown', this._handleOverlayClose);
        this._popupSelector.removeEventListener('click', this._handleOverlayClose);
    }
    _handleOverlayClose(evt) {
        if (evt.key === "Escape" || evt.target === evt.currentTarget) {
            this.close();
        }
    }
    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.close();
        })
    }
}