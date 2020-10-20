export default class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this._handleOverlayAndEscClose = this._handleOverlayAndEscClose.bind(this);
        this._closeButton = this._popupElement.querySelector('.popup__close-button');
    }
    open() {
        this._popupElement.classList.add('popup_opened');
        document.body.addEventListener('keydown', this._handleOverlayAndEscClose);
        this._popupElement.addEventListener('click', this._handleOverlayAndEscClose);
    }
    close() {
        this._popupElement.classList.remove('popup_opened');
        document.body.removeEventListener('keydown', this._handleOverlayAndEscClose);
        this._popupElement.removeEventListener('click', this._handleOverlayAndEscClose);
    }
    _handleOverlayAndEscClose(evt) {
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