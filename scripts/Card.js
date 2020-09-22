import {popupZoom} from './index.js';
import {openModalWindow} from './index.js';


export default class Card {
    constructor(data, cardSelector) {
        this._text = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
            this._handleLikeIcon();
        });
        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._handleDeleteCard();
        });
        this._element.querySelector('.element__picture').addEventListener('click', () => {
            this._handlePreviewPicture();
        });
    }

    _handleLikeIcon() {
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    _handlePreviewPicture() {
        document.querySelector('.popup-zoom__image').src = this._element.querySelector('.element__picture').src;
        document.querySelector('.popup-zoom__name').textContent = this._element.querySelector('.element__name').textContent;
        document.querySelector('.popup-zoom__image').alt = `${this._element.querySelector('.element__name').textContent}.`;
        openModalWindow(popupZoom);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__picture').src = this._image;
        this._element.querySelector('.element__name').textContent = this._text;
        
        return this._element;
    }
    
}