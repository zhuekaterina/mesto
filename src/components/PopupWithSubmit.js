import Popup from './Popup.js';
export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, {handleSubmit}){
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popupSelector.querySelector('.popup__form');
        this._saveButton = this._popupSelector.querySelector('.popup__button');
        this._saveButtonUsualText = this._saveButton.textContent;
    }

    open(card) {
        super.open();
        this._card = card;
    }

    addSubmitText() {
        this._saveButton.textContent = 'Сохранение...';
    }

    removeSubmitText() {
        this._saveButton.textContent = this._saveButtonUsualText;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._card);
        })
    }
    
}