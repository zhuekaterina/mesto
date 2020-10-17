export const initialCards = [ 
    { 
        name: 'Архыз', 
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' 
    }, 
    { 
        name: 'Челябинская область', 
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg' 
    }, 
    { 
        name: 'Иваново', 
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg' 
    }, 
    { 
        name: 'Камчатка', 
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg' 
    }, 
    { 
        name: 'Холмогорский район', 
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg' 
    }, 
    { 
        name: 'Байкал', 
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg' 
    } 
];
export const elementsContainer = document.querySelector('.elements');
export const addCardForm = document.querySelector('.popup-card__form');
export const popupUserForm = document.querySelector('.popup-user__form');
export const userName = popupUserForm.querySelector('#user-name');
export const userJob = popupUserForm.querySelector('#user-job');
export const popupUser = document.querySelector('.popup-user');
export const profile = document.querySelector('.profile');
export const editUserButton = profile.querySelector('.profile__edit-button');
export const addCardButton = profile.querySelector('.profile__add-button');
export const popupCard = document.querySelector('.popup-card');
export const closeCardButton = popupCard.querySelector('.popup-card__close-button');
export const popupZoom = document.querySelector('.popup-zoom');
export const newCardImage = addCardForm.querySelector('#card-link');
export const newCardName = addCardForm.querySelector('#card-name');
export const popupRemoval = document.querySelector('.popup-removal');
export const object = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

export const newCard = [{
    name: '',
    link: ''
}];

export const profileInfo = {
    name: '.profile__name',
    info: '.profile__job'
}

export const newProfileInfo = {
    newName: '',
    newInfo: ''
}