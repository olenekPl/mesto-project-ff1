import './pages/index.css';    
import { createCard, deleteCard, handleLike } from './components/card.js';  
import { openPopup, closePopup } from './components/modal.js';   
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addCard, deleteCardFromApi, updateAvatar } from './components/api.js';

//настройки валидации  
const validationConfig = {  
    formSelector: '.popup__form',  
    inputSelector: '.popup__input',  
    submitButtonSelector: '.popup__button',  
    inactiveButtonClass: 'popup__button_disabled',  
    inputErrorClass: 'popup__input_type_error',  
    errorClass: 'popup__error_visible'  
};  

//включаем валидацию  
enableValidation(validationConfig);

const placesList = document.querySelector('.places__list');  
const editButton = document.querySelector('.profile__edit-button');  
const addButton = document.querySelector('.profile__add-button');  
const editPopup = document.querySelector('.popup_type_edit');  
const newCardPopup = document.querySelector('.popup_type_new-card');  
const profileTitle = document.querySelector('.profile__title');  
const profileDescription = document.querySelector('.profile__description');  
const formEdit = editPopup.querySelector('.popup__form');  
const newCardFormElement = newCardPopup.querySelector('.popup__form');  
const avatarPopup = document.querySelector('.popup_type_change-avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');   
const avatarLinkInput = avatarPopup.querySelector('#avatar-input');   
const avatarInputError = avatarPopup.querySelector('.avatar-input-error');

//функция для вывода данных пользователя  
function displayUserInfo(user) {  
    profileTitle.textContent = user.name;  
    profileDescription.textContent = user.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${user.avatar})`;  
}  

//получаем данные пользователя и карточки  
Promise.all([getUserInfo(), getInitialCards()])  
  .then(([user, cards]) => {  
    displayUserInfo(user);  
    renderCards(cards, placesList, user._id);  //рендерим карточки на основе полученных данных  
  })  
  .catch(err => console.error(err)); 

//удаление карточки  
function handleDeleteCard(cardElement, cardId) {  
    openDeletePopup(cardElement, cardId, (id) => {  
        deleteCardFromApi(id)  
            .then(() => {  
                deleteCard(cardElement); //удаляем карточку из DOM  
                closePopup(document.querySelector('.popup_type_delete'));  
            })  
            .catch(err => console.error(err));  
    });  
} 

//открытие попапа удаления карточки  
function openDeletePopup(cardElement, cardId, handleConfirmDelete) {  
    const deletePopup = document.querySelector('.popup_type_delete');  
    openPopup(deletePopup);  

    //обработчик на кнопку подтверждения  
    const confirmDeleteButton = deletePopup.querySelector('#confirm-delete');  
    confirmDeleteButton.onclick = () => {  
        handleConfirmDelete(cardId);  
    };  
}

//обработка клика по изображению  
function handleImageClick(card) {  
    const imagePopup = document.querySelector('.popup_type_image');  
    const imageElement = imagePopup.querySelector('.popup__image');  
    const captionElement = imagePopup.querySelector('.popup__caption');  

    imageElement.src = card.link;  
    captionElement.textContent = card.name;  

    openPopup(imagePopup);   
}  

//вывод карточек на страницу  
function renderCards(cards, container, currentUserId) {  
    cards.forEach(card => {  
        const cardElement = createCard(card, handleDeleteCard, handleLike, handleImageClick, currentUserId);  
        container.append(cardElement);  
    });  
}   

//обработчик событий для открытия попапов  
editButton.addEventListener('click', function () {  
    openPopup(editPopup);  
    const nameInput = editPopup.querySelector('.popup__input_type_name');  
    const jobInput = editPopup.querySelector('.popup__input_type_description');  
    
    nameInput.value = profileTitle.textContent;  
    jobInput.value = profileDescription.textContent; 
    
    //очищаем ошибки валидации перед открытием попапа  
    clearValidation(formEdit, validationConfig); 
});  
  
addButton.addEventListener('click', function () {  
    openPopup(newCardPopup);  

    //очищаем ошибки и поля при открытии нового попапа  
    clearValidation(newCardFormElement, validationConfig);
});  

//обработчик для смены аватара  
document.querySelector('.profile__image').addEventListener('click', () => {  
    openPopup(avatarPopup);  
    clearValidation(avatarForm, validationConfig);  
});  

//обработчик отправки формы смены аватара  
avatarForm.addEventListener('submit', (evt) => {  
    evt.preventDefault();  
    const avatarLink = avatarLinkInput.value; 
    const submitButton = avatarForm.querySelector('.popup__button'); 

    //меняем текст кнопки    
    submitButton.textContent = 'Сохранение...';  
    submitButton.disabled = true;

    updateAvatar(avatarLink)  
        .then(() => {  
            document.querySelector('.profile__image').style.backgroundImage = `url(${avatarLink})`;  
            closePopup(avatarPopup);  
        })  
        .catch(err => {  
            avatarInputError.textContent = err;   
            avatarInputError.classList.add('popup__error_visible');  
        })
        .finally(() => {  
            //возвращаем базовое состояние кнопки   
            submitButton.textContent = 'Сохранить';  
            submitButton.disabled = false;  
        });
});

//закрытие попапов на крестик  
const closeButtons = document.querySelectorAll('.popup__close');  
closeButtons.forEach(button => {  
    button.addEventListener('click', function () {  
        const popup = button.closest('.popup');  
        closePopup(popup);  
        //сброс полей формы в зависимости от попапа  
        if (popup === newCardPopup) {  
            newCardFormElement.reset(); //очищаем поля новой карточки  
        }  
    });  
});   

//закрытие попапов на оверлей  
const popups = document.querySelectorAll('.popup');   
popups.forEach(popup => {  
    popup.addEventListener('click', function (event) {  
        if (event.target === popup) {  
            closePopup(popup);  
        }  
    });  
});   

//обработчик отправки формы редактирования профиля  
function handleProfileFormSubmit(evt) {  
    evt.preventDefault(); //отменяем стандартное поведение формы  

    const nameInput = formEdit.querySelector('.popup__input_type_name');  
    const jobInput = formEdit.querySelector('.popup__input_type_description');  

    //получаем значения из полей  
    const nameValue = nameInput.value;  
    const jobValue = jobInput.value;  

    const submitButton = formEdit.querySelector('.popup__button');
   
    submitButton.textContent = 'Сохранение...';  
    submitButton.disabled = true;

    //отправляем запрос на обновление данных на сервере  
    updateUserInfo(nameValue, jobValue)  
      .then(updatedUser => {  
        //вставляем новые значения из ответа сервера  
        displayUserInfo(updatedUser);  
        //закрываем попап   
        closePopup(editPopup);  
    })  
      .catch(err => console.error(err))
      .finally(() => {  
        //возвращаем базовое состояние кнопки  
        submitButton.textContent = 'Сохранить';  
        submitButton.disabled = false;  
    });       
}  

//прикрепляем обработчик к форме редактирования профиля   
formEdit.addEventListener('submit', handleProfileFormSubmit);   

//обработчик событий для добавления новой карточки  
function handleNewCardSubmit(evt) {  
    evt.preventDefault(); //отменяем стандартное поведение формы  

    const placeNameInput = newCardFormElement.querySelector('.popup__input_type_card-name');  
    const linkInput = newCardFormElement.querySelector('.popup__input_type_url');  

    const newCardName = placeNameInput.value;  
    const newCardLink = linkInput.value;  

    const submitButton = newCardFormElement.querySelector('.popup__button');  
       
    submitButton.textContent = 'Сохранение...';  
    submitButton.disabled = true;  

    //отправляем запрос на создание новой карточки  
    addCard(newCardName, newCardLink)  
      .then(cardData => {  
        //создаем элемент карточки и добавляем его в начало списка  
        const cardElement = createCard(cardData, deleteCard, handleLike, handleImageClick, cardData.owner._id);  
        placesList.prepend(cardElement);  

        //закрываем попап и очищаем поля формы  
        closePopup(newCardPopup);  
        newCardFormElement.reset();  
      })  
      .catch(err => console.error(err))
      .finally(() => {  
        //возвращаем базовое состояние кнопки  
        submitButton.textContent = 'Создать';  
        submitButton.disabled = false;  
    }); 
}  

//прикрепляем обработчик к форме добавления новой карточки   
newCardFormElement.addEventListener('submit', handleNewCardSubmit);