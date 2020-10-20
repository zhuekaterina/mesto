export default class Card {
    constructor(card, cardSelector, {handleCardClick}, {handleDeleteClick}, {handleLikeClick}, {handleDeleteLikeClick}, userId) {
        this._card = card;
        this._text = card.name;
        this._image = card.link;
        this._likes = card.likes;
        this._cardId = card._id;
        this._cardOwnerId = card.owner._id;
        this._userId = userId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteLikeClick = handleDeleteLikeClick;
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
        this._likeButton.addEventListener('click', () => {
            this._handleLikeIcon();
        });
        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteClick();
        });
        this._element.querySelector('.element__picture').addEventListener('click', () => {
            this._handleCardClick(this._card);
        });

    }

    _checkLikedCard() {
        return this._likes.some(like => like._id === this._userId);
    }

   _handleLikeIcon() {
        if (!this._likeButton.classList.contains('element__like-button_active') && navigator.onLine) {
            this._handleLikeClick(this._cardId);
            this._likeButton.classList.add('element__like-button_active');
        } else {
            this._handleDeleteLikeClick(this._cardId);
            this._likeButton.classList.remove('element__like-button_active');
        }
    }

    handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    returnId() {
        return this._cardId;
    }

    countLikes(likes) {
        this._likes = likes;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._deleteButton = this._element.querySelector('.element__delete-button');
        this._likeButton = this._element.querySelector('.element__like-button');
        this._likesNumber = this._element.querySelector('.element__likes-number');
        this._likesNumber.textContent = this._likes.length;
        this._setEventListeners();
        this._element.querySelector('.element__picture').src = this._image;
        this._element.querySelector('.element__name').textContent = this._text;
        if (this._checkLikedCard()) {
            this._likeButton.classList.add('element__like-button_active');
        }
        if (this._cardOwnerId === this._userId) {
            this._deleteButton.classList.add('element__delete-button_visible');
        }

        return this._element;
    }
}