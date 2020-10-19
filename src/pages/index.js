import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {elementsContainer, 
    addCardForm,
    popupUserForm,
    userName,
    userJob,
    popupUser,
    profile,
    profileName,
    profileJob,
    profileInfo,
    editUserButton,
    addCardButton,
    popupCard,
    popupZoom,
    popupRemoval,
    popupAvatar,
    avatarEditButton,
    avatarEditForm,
    profileAvatar,
    object} from '../utils/constants.js';

//Api
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
    headers: {
      authorization: '9e2464ed-9bf4-456d-960e-bc935e02e4f4',
      'Content-Type': 'application/json'
    }
}); 

//Получение изначальной информации о пользователе
api
.getUserInfo()
.then((info) => {
    profileName.textContent = info.name;
    profileJob.textContent = info.about;
    profileAvatar.src = `${info.avatar}`;
    profile.id = info._id;
})
.catch((err) => {
    console.log(err);
});

//Выгрузка всех загруженных на сервер карточек
api
.getInitialCards()
.then((initialCards) => {
    const initialCardsList = new Section({
        items: initialCards,
        renderer: (item) => {
            initialCardsList.addItem(renderCard(item, '#elementTemplate'));
        }},
        elementsContainer
    );
    initialCardsList.renderItems();
})
.catch((err) => {
    console.log(err);
});

//Попап с открытием изображения
const popupZoomImage = new PopupWithImage(popupZoom);
popupZoomImage.setEventListeners();

//Попап с открытием формы пользователя
const popupWithUserForm = new PopupWithForm(popupUser, 
    {handleFormSubmit: (data) => {
        popupWithUserForm.addSubmitText();
        api
        .editUserInfo(data)
        .then((readyInfo) => {
            userProfileInfo.setUserInfo(readyInfo);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupWithUserForm.close();
        })
    }
    })
popupWithUserForm.setEventListeners();

//Попап с добавлением новой карточки
const popupWithCardForm = new PopupWithForm(popupCard, 
    {handleFormSubmit: (data) => {
        popupWithCardForm.addSubmitText();
        api
        .addNewCard(data)
        .then((readyInfo) => {
            elementsContainer.prepend(renderCard(readyInfo, '#elementTemplate'));
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            saveButtonDisabled(popupCard);
            popupWithCardForm.close();
        })
    }
    });
popupWithCardForm.setEventListeners();

//Попап для обновления аватара
const popupEditAvatar = new PopupWithForm(popupAvatar, {
    handleFormSubmit: (data) => {
        popupEditAvatar.addSubmitText();
        api
        .editAvatar(data)
        .then(() => {
            userProfileInfo.setUserAvatar(`${data.avatar}`);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupEditAvatar.close();
        })
    }
});
popupEditAvatar.setEventListeners();

//Попап с подтверждением удаления карточки
const popupCardRemoval = new PopupWithSubmit(popupRemoval, {
    handleSubmit: (card) => {
        popupCardRemoval.addSubmitText();
        api
        .deleteCard(card.returnId())
        .then(() => {
            card.handleDeleteCard();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupCardRemoval.close();
        })
    }
});
popupCardRemoval.setEventListeners(); 

const userProfileInfo = new UserInfo(profileInfo);

//Подготовка добавления карточки в разметку
const renderCard = (element, elementSelector) => {
    const card = new Card(element, elementSelector, {
        handleCardClick: (item) => {
            popupZoomImage.open(item);
        }
    }, {
        handleDeleteClick: () => {
            popupCardRemoval.open(card);
        }
    }, {
        handleLikeClick: (cardId, likesNumber) => {
            api
            .addLike(cardId)
            .then((data) => {
                likesNumber.textContent = data.likes.length;
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, {
        handleDeleteLikeClick: (cardId, likesNumber) => {
            api
            .deleteLike(cardId)
            .then((data) => {
                likesNumber.textContent = data.likes.length;
            })
            .catch((err) => {
                console.log(err);
            });
        }
    },
    profile.id);
    const cardElement = card.generateCard();
    return cardElement;
} 

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

//Открытие формы редактирования информации о пользователе
editUserButton.addEventListener('click', evt => {
    evt.preventDefault();
    const {name, about} = userProfileInfo.getUserInfo();
    userName.value = name;
    userJob.value = about;
    popupWithUserForm.removeSubmitText();
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
    popupWithCardForm.removeSubmitText();
    popupWithCardForm.open();
    saveButtonDisabled(popupCard);
    addFormValidate.discardErrors();
});

//Открытие формы редактирования аватара
avatarEditButton.addEventListener('click', evt => {
    evt.preventDefault();
    popupEditAvatar.removeSubmitText();
    popupEditAvatar.open()
    saveButtonDisabled(popupAvatar);
    avatarFormValidate.discardErrors();
});

//Валидация формы пользователя
const editFormValidate = new FormValidator(object, popupUserForm);
editFormValidate.enableValidation();

//Валидация формы добавления карточки
const addFormValidate = new FormValidator(object, addCardForm);
addFormValidate.enableValidation();

const avatarFormValidate = new FormValidator(object, avatarEditForm);
avatarFormValidate.enableValidation();
