let popupForm = document.querySelector('.popup__form');
let userName = popupForm.querySelector('#name');
let userJob = popupForm.querySelector('#job');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let currentUserName = profile.querySelector('.profile__name');
let currentUserJob = profile.querySelector('.profile__job');
let saveButton = popup.querySelector('.popup__save-button');

function openPopup() {
    popup.classList.add('popup_opened');
    userName.value = currentUserName.textContent;
    userJob.value = currentUserJob.textContent;
}

editButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

function formSubmitHandler(evt) {
    evt.preventDefault();
    currentUserName.textContent = userName.value;
    currentUserJob.textContent = userJob.value;
    closePopup();
}

saveButton.addEventListener('click', formSubmitHandler);