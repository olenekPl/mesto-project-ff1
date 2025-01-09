import './pages/index.css';  
import { initialCards } from './scripts/cards.js';  
import { createCard, deleteCard, handleLike } from './components/card.js';  
import { openPopup, closePopup } from './components/modal.js';   

const placesList = document.querySelector('.places__list');  
const editButton = document.querySelector('.profile__edit-button');  
const addButton = document.querySelector('.profile__add-button');  
const editPopup = document.querySelector('.popup_type_edit');  
const newCardPopup = document.querySelector('.popup_type_new-card');  
const profileTitle = document.querySelector('.profile__title');  
const profileDescription = document.querySelector('.profile__description');  
const formEdit = editPopup.querySelector('.popup__form');  
const newCardFormElement = newCardPopup.querySelector('.popup__form');  

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
function renderCards(cards, container) {  
    cards.forEach(card => {  
        const cardElement = createCard(card, deleteCard, handleLike, handleImageClick);  
        container.prepend(cardElement);  
    });  
}  

//инициализация карточек  
renderCards(initialCards, placesList);  

//обработчик событий для открытия попапов  
editButton.addEventListener('click', function () {  
    openPopup(editPopup);  
    const nameInput = editPopup.querySelector('.popup__input_type_name');  
    const jobInput = editPopup.querySelector('.popup__input_type_description');  
    
    nameInput.value = profileTitle.textContent;  
    jobInput.value = profileDescription.textContent;  
});  
  
addButton.addEventListener('click', function () {  
    openPopup(newCardPopup);  
});  

//закрытие попапов на крестик  
const closeButtons = document.querySelectorAll('.popup__close');  
closeButtons.forEach(button => {  
    button.addEventListener('click', function () {  
        const popup = button.closest('.popup');  
        closePopup(popup);  
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

    //вставляем новые значения  
    profileTitle.textContent = nameValue;  
    profileDescription.textContent = jobValue;  

    //закрываем попап  
    closePopup(editPopup);  
}  

//прикрепляем обработчик к форме редактирования профиля   
formEdit.addEventListener('submit', handleProfileFormSubmit);   

//обработчик событий для добавления новой карточки  
function handleNewCardSubmit(evt) {  
    evt.preventDefault(); //отменяем стандартное поведение формы  

    const placeNameInput = newCardFormElement.querySelector('.popup__input_type_card-name');  
    const linkInput = newCardFormElement.querySelector('.popup__input_type_url');  

    const newCard = {  
        name: placeNameInput.value,  
        link: linkInput.value,  
    };  

    //создаем новую карточку и добавляем ее в начало списка  
    const cardElement = createCard(newCard, deleteCard, handleLike, handleImageClick);  
    placesList.prepend(cardElement);  

    //закрываем попап и очищаем поля формы  
    closePopup(newCardPopup);  
    newCardFormElement.reset();  
}  

//прикрепляем обработчик к форме добавления новой карточки   
newCardFormElement.addEventListener('submit', handleNewCardSubmit);