import Card from './Card.js';
import FormValidator from './FormValidator.js';

const elementsContainer = document.querySelector('.elements');
const addCardForm = document.querySelector('.popup-card__form');
const popupUserForm = document.querySelector('.popup-user__form');
const userName = popupUserForm.querySelector('#user-name');
const userJob = popupUserForm.querySelector('#user-job');
const popupUser = document.querySelector('.popup-user');
const closeUserButton = popupUser.querySelector('.popup-user__close-button');
const profile = document.querySelector('.profile');
const editUserButton = profile.querySelector('.profile__edit-button');
const currentUserName = profile.querySelector('.profile__name');
const currentUserJob = profile.querySelector('.profile__job');
const saveUserButton = popupUser.querySelector('.popup-user__save-button');
const addCardButton = profile.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-card');
const closeCardButton = popupCard.querySelector('.popup-card__close-button');
export const popupZoom = document.querySelector('.popup-zoom');
const closeZoomButton = popupZoom.querySelector('.popup-zoom__close-button');
const newCardImage = addCardForm.querySelector('#card-link');
const newCardName = addCardForm.querySelector('#card-name');
const initialCards = [ 
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

const object = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

initialCards.forEach((element) => {
    const card = new Card(element.name, element.link, '#elementTemplate');
    const cardElement = card.generateCard();
    elementsContainer.append(cardElement);
});

function closeEscAndOverlayEvt(evt) {
    const popupOpened = document.querySelector('.popup_opened');
    if (evt.key === "Escape" || evt.target === popupOpened) {
        closeModalWindow(popupOpened);
    }
}

export function openModalWindow(modalWindow) {
    modalWindow.classList.add('popup_opened');
    const inputList = Array.from(modalWindow.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.classList.remove('popup__input_type_error');
    });
    const inputErrorList = Array.from(modalWindow.querySelectorAll('.popup__error'));
    inputErrorList.forEach((error) => {
        error.textContent = '';
    });
    document.body.addEventListener('keydown', closeEscAndOverlayEvt);
    modalWindow.addEventListener('click', closeEscAndOverlayEvt);
};

function closeModalWindow(modalWindow) {
    modalWindow.classList.remove('popup_opened');
    
    document.body.removeEventListener('keydown', closeEscAndOverlayEvt);
    modalWindow.removeEventListener('click', closeEscAndOverlayEvt);
}

function saveButtonDisabled(popup) {
    const saveButton = popup.querySelector('.popup__button');
    saveButton.classList.add('popup__button_disabled');
    saveButton.setAttribute('disabled', true);
}

function saveButtonUnabled(popup) {
    const saveButton = popup.querySelector('.popup__button');
    saveButton.classList.remove('popup__button_disabled');
    saveButton.removeAttribute('disabled', true);
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    currentUserName.textContent = userName.value;
    currentUserJob.textContent = userJob.value;
    closeModalWindow(popupUser);
}

function addCardFormSubmit(evt) {
    evt.preventDefault();
    const card = new Card(newCardName.value, newCardImage.value, '#elementTemplate');
    const cardElement = card.generateCard();
    elementsContainer.prepend(cardElement);
    addCardForm.reset();
    closeModalWindow(popupCard);
    saveButtonDisabled(popupCard);
}

editUserButton.addEventListener('click', evt => {
    evt.preventDefault();
    userName.value = currentUserName.textContent;
    userJob.value = currentUserJob.textContent;
    openModalWindow(popupUser);
    saveButtonUnabled(popupUser);
});

closeUserButton.addEventListener('click', evt => {
    evt.preventDefault();
    closeModalWindow(popupUser);
});

saveUserButton.addEventListener('click', formSubmitHandler);

addCardButton.addEventListener('click', evt => {
    evt.preventDefault();
    const inputNewCard = addCardForm.querySelectorAll('.popup__input');
    inputNewCard.forEach((inputElement) => {
        inputElement.value = '';
    });
    openModalWindow(popupCard);
});

closeCardButton.addEventListener('click', evt => {
    evt.preventDefault();
    closeModalWindow(popupCard);
    addCardForm.reset();
    saveButtonDisabled(popupCard);
});

closeZoomButton.addEventListener('click', evt => {
    evt.preventDefault();
    closeModalWindow(popupZoom);
});

addCardForm.addEventListener('submit', addCardFormSubmit);

addCardForm.addEventListener('keydown', evt => {
    if (evt.key === "Enter") {
        addCardFormSubmit;
    }
})

const editFormValidate = new FormValidator(object, popupUserForm);
editFormValidate.enableValidation();

const addFormValidate = new FormValidator(object, addCardForm);
addFormValidate.enableValidation();

