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
    profileInfo,
    editUserButton,
    addCardButton,
    popupCard,
    popupZoom,
    popupRemoval,
    popupAvatar,
    avatarEditButton,
    avatarEditForm,
    popupElements} from '../utils/constants.js';

//Api
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
    headers: {
      authorization: '9e2464ed-9bf4-456d-960e-bc935e02e4f4',
      'Content-Type': 'application/json'
    }
}); 

//Экземпляр класса Section
const cardsList = new Section({
    renderer: (item) => {
        cardsList.addItem(renderCard(item, '#elementTemplate'))
    }
  }, elementsContainer);

let userId;
//Получение информации о пользователе и карточек
api
.getAppInfo()
.then(([userInfo, initialCards]) => {
    userProfileInfo.setUserInfo({name: userInfo.name, about: userInfo.about});
    userProfileInfo.setUserAvatar(`${userInfo.avatar}`);
    userId = userInfo._id;
    cardsList.renderItems(initialCards);
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
        });
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
            cardsList.renderNewitem(readyInfo);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupWithCardForm.close();
        });
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
        });
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
            popupCardRemoval.removeSubmitText();
            popupCardRemoval.close();
        });
    }
});
popupCardRemoval.setEventListeners(); 

//Информация о пользователе
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
        handleLikeClick: (cardId) => {
            api
            .addLike(cardId)
            .then((data) => {
                card.countLikes(data.likes);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, {
        handleDeleteLikeClick: (cardId) => {
            api
            .deleteLike(cardId)
            .then((data) => {
                card.countLikes(data.likes); 
            })
            .catch((err) => {
                console.log(err);
            });
        }
    },
    userId);
    const cardElement = card.generateCard();
    return cardElement;
} 

//Открытие формы редактирования информации о пользователе
editUserButton.addEventListener('click', evt => {
    evt.preventDefault();
    const {name, about} = userProfileInfo.getUserInfo();
    userName.value = name;
    userJob.value = about;
    popupWithUserForm.removeSubmitText();
    popupWithUserForm.open();
    editFormValidate.discardErrors(popupUserForm);
});

//Открытие формы добавления карточки по нажатию на кнопку +
addCardButton.addEventListener('click', evt => {
    evt.preventDefault();
    popupWithCardForm.removeSubmitText();
    popupWithCardForm.open();
    addFormValidate.discardErrors();
});

//Открытие формы редактирования аватара
avatarEditButton.addEventListener('click', evt => {
    evt.preventDefault();
    popupEditAvatar.removeSubmitText();
    popupEditAvatar.open()
    avatarFormValidate.discardErrors();
});

//Валидация формы пользователя
const editFormValidate = new FormValidator(popupElements, popupUserForm);
editFormValidate.enableValidation();

//Валидация формы добавления карточки
const addFormValidate = new FormValidator(popupElements, addCardForm);
addFormValidate.enableValidation();

//Валидация формы изменения аватара
const avatarFormValidate = new FormValidator(popupElements, avatarEditForm);
avatarFormValidate.enableValidation();
