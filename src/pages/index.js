import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {elementsContainer, 
    addCardForm,
    popupUserForm,
    userName,
    userJob,
    popupUser,
    profileInfo,
    newProfileInfo,
    editUserButton,
    addCardButton,
    popupCard,
    popupZoom,
    newCardImage,
    newCardName,
    object,
    newCard} from '../utils/constants.js';

const popupZoomImage = new PopupWithImage(popupZoom);
popupZoomImage.setEventListeners();
const popupWithUserForm = new PopupWithForm(popupUser, formSubmitHandler);
popupWithUserForm.setEventListeners();
const popupWithCardForm = new PopupWithForm(popupCard, addCardFormSubmit);
popupWithCardForm.setEventListeners();
const userProfileInfo = new UserInfo(profileInfo);

function handleCardClick(item) {
    popupZoomImage.open(item);
}

const renderCard = (element, elementSelector) => {
    const card = new Card(element, elementSelector, handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
} 

const initialCardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        initialCardsList.addItem(renderCard(item, '#elementTemplate'));
    }},
    elementsContainer
);
initialCardsList.renderItems();

//Функция включения работы кнопки сохранения
function saveButtonDisabled(popup) {
    const saveButton = popup.querySelector('.popup__button');
    saveButton.classList.add('popup__button_disabled');
    saveButton.setAttribute('disabled', true);
}

//Функция отключения работы кнопки сохранения
function saveButtonUnabled(popup) {
    const saveButton = popup.querySelector('.popup__button');
    saveButton.classList.remove('popup__button_disabled');
    saveButton.removeAttribute('disabled', true);
}

//Функция сабмита формы пользователя
function formSubmitHandler() {
    newProfileInfo.newName = userName.value;
    newProfileInfo.newInfo = userJob.value;
    userProfileInfo.setUserInfo(newProfileInfo);
}

//Функция сабмита формы добавления карты
function addCardFormSubmit() {
    newCard.name = newCardName.value;
    newCard.link = newCardImage.value;
    elementsContainer.prepend(renderCard(newCard, '#elementTemplate'));
    saveButtonDisabled(popupCard);
}

//Открытие формы пользователя
editUserButton.addEventListener('click', evt => {
    evt.preventDefault();
    const {name, info} = userProfileInfo.getUserInfo();
    userName.value = name;
    userJob.value = info;
    popupWithUserForm.open();
    saveButtonUnabled(popupUser);
    editFormValidate.discardErrors();
});

//Открытие формы добавления карточки по нажатию на кнопку +
addCardButton.addEventListener('click', evt => {
    evt.preventDefault();
    const inputNewCard = addCardForm.querySelectorAll('.popup__input');
    inputNewCard.forEach((inputElement) => {
        inputElement.value = '';
    });
    popupWithCardForm.open();
    saveButtonDisabled(popupCard);
    addFormValidate.discardErrors();
});

//Валидация формы пользователя
const editFormValidate = new FormValidator(object, popupUserForm);
editFormValidate.enableValidation();

//Валидация формы добавления карточки
const addFormValidate = new FormValidator(object, addCardForm);
addFormValidate.enableValidation();

