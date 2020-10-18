export default class Card {
    constructor(card, cardSelector, handleCardClick) {
        this._card = card;
        this._text = card.name;
        this._image = card.link;
        this._likes = card.likes;
        this._likesNumber = card.likes.length;
        this._cardId = card._id;
        this._cardOwnerId = card.owner._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        //this._addLikeHandler = addLikeHandler;
        //this._deleteLikeHandler = deleteLikeHandler;
        //this._handleDeleteClick = handleDeleteClick;
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
            this._handleDeleteCard()
           // this._handleDeleteClick();
        });
        this._element.querySelector('.element__picture').addEventListener('click', () => {
            this._handleCardClick(this._card);
        });

    }
    _handleLikeIcon() {
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }

   /**  _handleLikeIcon() {
        if (!this._element.querySelector('.element__like-button').classList.contains('element__like-button_active') && navigator.onLine) {
            this._addLikeHandler(this._cardId, this._element.querySelector('.element__likes-number'));
            this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
        } else {
            this._deleteLikeHandler(this._cardId, this._element.querySelector('.element__likes-number'));
            this._element.querySelector('.element__like-button').classList.remove('element__like-button_active');
        }
    }*/

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__picture').src = this._image;
        this._element.querySelector('.element__name').textContent = this._text;
        this._element.querySelector('.element__likes-number').textContent = this._likesNumber;

        return this._element;
    }
    
}