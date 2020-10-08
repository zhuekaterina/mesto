/** Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
Принимает в конструктор единственный параметр — селектор попапа.
Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. **/

export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popupSelector.classList.add('popup_opened');
        document.body.addEventListener('keydown', this._handleEscClose);
        this._popupSelector.addEventListener('click', this._handleEscClose);
    }
    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.body.removeEventListener('keydown', this._handleEscClose);
        this._popupSelector.removeEventListener('click', this._handleEscClose);
    }
    _handleEscClose(evt) {
        if (evt.key === "Escape" || evt.target === evt.currentTarget) {
            this.close();
        }
    }
    setEventListeners() {
        this._closeButton = this._popupSelector.querySelector('.popup__close-button');
        this._closeButton.addEventListener('click', () => {
            this.close();
        })
    }
}