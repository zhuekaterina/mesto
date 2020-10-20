import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupElement, {handleFormSubmit}) {
        super(popupElement);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));
        this._form = this._popupElement.querySelector('.popup__form');
        this._saveButton = this._popupElement.querySelector('.popup__button');
        this._saveButtonUsualText = this._saveButton.textContent;
    }
    _getInputValues() {
        const formValues = {};
        this._inputList.forEach((input) => {
            formValues[input.name] = input.value;
        });
        return formValues;
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