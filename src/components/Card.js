export default class Card {
    constructor(card, cardSelector, handleCardClick) {
        this._card = card;
        this._text = card.name;
        this._image = card.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
            this._handleCardClick(this._card);
        });

    }

    _handleLikeIcon() {
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }
    
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__picture').src = this._image;
        this._element.querySelector('.element__name').textContent = this._text;
        
        return this._element;
    }
    
}