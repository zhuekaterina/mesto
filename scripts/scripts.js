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

const elementsContainer = document.querySelector('.elements');
const addCardForm = document.querySelector('.popup-card__form');

function addItemToContainer(initialCards) {
    const cardElement = document.querySelector('#elementTemplate').content.cloneNode(true);
    cardElement.querySelector('.element__picture').src = initialCards.link;
    cardElement.querySelector('.element__name').textContent = initialCards.name;

    cardElement.querySelector('.element__delete-button').addEventListener('click', event => {
        const element = event.target.closest('.element');
        element.remove();
    })

    cardElement.querySelector('.element__like-button').addEventListener('click', event => {
        const element = event.target.closest('.element');
        const likeButton = element.querySelector('.element__like-button');
        likeButton.classList.add('element__like-button_active');
    })

    cardElement.querySelector('.element__picture').addEventListener('click', event => {
        const element = event.target.closest('.element');
        const elementPicture = element.querySelector('.element__picture').src;
        const elementName = element.querySelector('.element__name').textContent;
        const popupZoom = document.querySelector('.popup-zoom');
        popupZoom.querySelector('.popup-zoom__image').src = elementPicture;
        popupZoom.querySelector('.popup-zoom__name').textContent = elementName;
        popupZoom.classList.toggle('popup-zoom');
        popupZoom.classList.toggle('popup-zoom_opened');
    })

    elementsContainer.append(cardElement);
}

initialCards.forEach(addItemToContainer); 

let popupForm = document.querySelector('.popup__form');
let userName = popupForm.querySelector('#name');
let userJob = popupForm.querySelector('#job');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let currentUserName = profile.querySelector('.profile__name');
let currentUserJob = profile.querySelector('.profile__job');
const addCardButton = profile.querySelector('.profile__add-button');
const saveButton = popup.querySelector('.popup__save-button');
let popupCard = document.querySelector('.popup-card');
const closeCardButton = popupCard.querySelector('.popup-card__close-button');
const saveCardButton = popupCard.querySelector('.popup-card__save-button');

function openPopup() {
    popup.classList.toggle('popup');
    popup.classList.toggle('popup_opened');
    userName.value = currentUserName.textContent;
    userJob.value = currentUserJob.textContent;
}

editButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.toggle('popup_opened');
    popup.classList.toggle('popup');
}

closeButton.addEventListener('click', closePopup);

function formSubmitHandler(evt) {
    evt.preventDefault();
    currentUserName.textContent = userName.value;
    currentUserJob.textContent = userJob.value;
    closePopup();
}

saveButton.addEventListener('click', formSubmitHandler);

function openPopupCard() {
    popupCard.classList.toggle('popup-card');
    popupCard.classList.toggle('popup-card_opened');
}

addCardButton.addEventListener('click', openPopupCard);

function closePopupCard() {
    popupCard.classList.toggle('popup-card_opened');
    popupCard.classList.toggle('popup-card');
}

closeCardButton.addEventListener('click', closePopupCard);

addCardForm.addEventListener('submit', event => {
    event.preventDefault();
    const cardImage = addCardForm.querySelector('#card-link').value;
    const cardName = addCardForm.querySelector('#card-name').value;
    const cardElement = document.querySelector('#elementTemplate').content.cloneNode(true);
    cardElement.querySelector('.element__picture').src = cardImage;
    cardElement.querySelector('.element__name').textContent = cardName;

    cardElement.querySelector('.element__delete-button').addEventListener('click', event => {
        const element = event.target.closest('.element');
        element.remove();
    })

    cardElement.querySelector('.element__like-button').addEventListener('click', event => {
        const element = event.target.closest('.element');
        const likeButton = element.querySelector('.element__like-button');
        likeButton.classList.add('element__like-button_active');
    })

    cardElement.querySelector('.element__picture').addEventListener('click', event => {
        const element = event.target.closest('.element');
        const elementPicture = element.querySelector('.element__picture').src;
        const elementName = element.querySelector('.element__name').textContent;
        const popupZoom = document.querySelector('.popup-zoom');
        popupZoom.querySelector('.popup-zoom__image').src = elementPicture;
        popupZoom.querySelector('.popup-zoom__name').textContent = elementName;
        popupZoom.classList.toggle('popup-zoom');
        popupZoom.classList.toggle('popup-zoom_opened');
    })

    elementsContainer.prepend(cardElement);
    addCardForm.reset();
    closePopupCard();
})

const popupZoom = document.querySelector('.popup-zoom');
const closeZoomButton = popupZoom.querySelector('.popup-zoom__close-button');

function closePopupZoom() {
    popupZoom.classList.toggle('popup-zoom_opened');
    popupZoom.classList.toggle('popup-zoom');
}

closeZoomButton.addEventListener('click', closePopupZoom);