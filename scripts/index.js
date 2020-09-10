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
const saveCardButton = popupCard.querySelector('.popup-card__save-button');
const popupZoom = document.querySelector('.popup-zoom');
const popupZoomImage = popupZoom.querySelector('.popup-zoom__image');
const popupZoomName = popupZoom.querySelector('.popup-zoom__name');
const closeZoomButton = popupZoom.querySelector('.popup-zoom__close-button');
const cardElement = document.querySelector('#elementTemplate');

function closeEscAndOverlayEvt(evt) {
    const popupOpened = document.querySelector('.popup_opened');
    if (evt.key === "Escape" || evt.target === popupOpened) {
        closeModalWindow(popupOpened);
    }
}

function openModalWindow(modalWindow) {
    modalWindow.classList.add('popup_opened');
    const inputList = Array.from(modalWindow.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        hideInputError(modalWindow, inputElement);
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

function handleLikeIcon() {
    const element = event.target.closest('.element');
    const likeButton = element.querySelector('.element__like-button');
    likeButton.classList.add('element__like-button_active');
}

function handleDeleteCard() {
    const element = event.target.closest('.element');
    element.remove();
}

function handlePreviewPicture(picture, name) {
    popupZoomImage.src = picture;
    popupZoomName.textContent = name;
    openModalWindow(popupZoom);
}

function addCard(name, link) {
    const cardElement = document.querySelector('#elementTemplate').content.cloneNode(true);
    const cardImage = cardElement.querySelector('.element__picture');
    const cardName = cardElement.querySelector('.element__name');
    cardImage.src = link;
    cardName.textContent = name;

    const cardLikeButton = cardElement.querySelector('.element__like-button');
    const cardDeleteButton = cardElement.querySelector('.element__delete-button');
    
    cardDeleteButton.addEventListener('click', handleDeleteCard);
    cardLikeButton.addEventListener('click', handleLikeIcon);
    cardImage.addEventListener('click', evt => {
        evt.preventDefault()
        const element = event.target.closest('.element');
        const elementPicture = element.querySelector('.element__picture').src;
        const elementName = element.querySelector('.element__name').textContent;
        handlePreviewPicture(elementPicture, elementName);
    })

    return cardElement;
}

function addCardFormSubmit(evt) {
    evt.preventDefault();
    const newCardImage = addCardForm.querySelector('#card-link').value;
    const newCardName = addCardForm.querySelector('#card-name').value;
    elementsContainer.prepend(addCard(newCardName, newCardImage));
    addCardForm.reset();
    closeModalWindow(popupCard);
    saveButtonDisabled(popupCard);
}

initialCards.forEach((element) => {
    elementsContainer.append(addCard(element.name, element.link));
}); 

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