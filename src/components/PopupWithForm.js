import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
        this._form = this._popupSelector.querySelector('.popup__form');
        this._saveButton = this._popupSelector.querySelector('.popup__button');
        this._saveButtonUsualText = this._saveButton.textContent;
    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
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
            this._handleFormSubmit(this._getInputValues());
        })
    }
    close() {
        super.close();
        this._form.reset();
    }
}