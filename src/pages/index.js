import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
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
    popupRemoval,
    object,
    newCard} from '../utils/constants.js';

//Api
/** const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
    headers: {
      authorization: '9e2464ed-9bf4-456d-960e-bc935e02e4f4',
      'Content-Type': 'application/json'
    }
}); */
//Попап с открытием изображения
const popupZoomImage = new PopupWithImage(popupZoom);
popupZoomImage.setEventListeners();
//Попап с открытием формы пользователя
const popupWithUserForm = new PopupWithForm(popupUser, formSubmitHandler);
popupWithUserForm.setEventListeners();
//Попап с добавлением новой карточки
const popupWithCardForm = new PopupWithForm(popupCard, addCardFormSubmit);
popupWithCardForm.setEventListeners();
//Попап с подтверждением удаления карточки
const popupCardRemoval = new Popup(popupRemoval);
popupCardRemoval.setEventListeners();

const userProfileInfo = new UserInfo(profileInfo);

//Открытие попапа с картинкой
function handleCardClick(item) {
    popupZoomImage.open(item);
}

const renderCard = (element, elementSelector) => {
    const card = new Card(element, elementSelector, handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
} 
//Добавление изначальных карточек
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
    popupWithUserForm.close();
}

//Функция сабмита формы добавления карты
function addCardFormSubmit() {
    newCard.name = newCardName.value;
    newCard.link = newCardImage.value;
    elementsContainer.prepend(renderCard(newCard, '#elementTemplate'));
    saveButtonDisabled(popupCard);
    popupWithCardForm.close();
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

