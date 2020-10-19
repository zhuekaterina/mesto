export const elementsContainer = document.querySelector('.elements');
export const addCardForm = document.querySelector('.popup-card__form');
export const popupUserForm = document.querySelector('.popup-user__form');
export const userName = popupUserForm.querySelector('#user-name');
export const userJob = popupUserForm.querySelector('#user-job');
export const popupUser = document.querySelector('.popup-user');
export const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__name');
export const profileJob = profile.querySelector('.profile__job');
export const editUserButton = profile.querySelector('.profile__edit-button');
export const addCardButton = profile.querySelector('.profile__add-button');
export const popupCard = document.querySelector('.popup-card');
export const popupZoom = document.querySelector('.popup-zoom');
export const popupRemoval = document.querySelector('.popup-removal');
export const popupAvatar = document.querySelector('.popup-avatar');
export const avatarEditButton = profile.querySelector('.profile__avatar-edit');
export const avatarEditForm = popupAvatar.querySelector('.popup-avatar__form');
export const profileAvatar = profile.querySelector('.profile__avatar');
export const object = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

export const profileInfo = {
    name: '.profile__name',
    about: '.profile__job',
    avatar: '.profile__avatar'
}