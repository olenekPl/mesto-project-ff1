import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, handleLike } from './components/card.js';  
import { openPopup, closePopup } from './components/modal.js';   

//обрабатка клика по изображению  
function handleImageClick(card) {  
    const imagePopup = document.querySelector('.popup_type_image');  
    const imageElement = imagePopup.querySelector('.popup__image');  
    const captionElement = imagePopup.querySelector('.popup__caption');  

    imageElement.src = card.link;  
    captionElement.textContent = card.name;  

    openPopup(imagePopup);   
}  

const placesList = document.querySelector('.places__list');  

//вывод карточек на страницу  
function renderCards(cards, container) {  
    cards.forEach(card => {  
        const cardElement = createCard(card, deleteCard, handleLike, handleImageClick);  
        container.prepend(cardElement);  
    });  
}  

//инициализация карточек  
renderCards(initialCards, placesList);  

const editButton = document.querySelector('.profile__edit-button');  
const addButton = document.querySelector('.profile__add-button');  

const editPopup = document.querySelector('.popup_type_edit');  
const newCardPopup = document.querySelector('.popup_type_new-card');  

//обработчик событий для открытия попапов  
editButton.addEventListener('click', function () {  
    openPopup(editPopup);  
    const formElement = editPopup.querySelector('.popup__form');  
    const nameInput = formElement.querySelector('.popup__input_type_name');  
    const jobInput = formElement.querySelector('.popup__input_type_description');  
    
    nameInput.value = document.querySelector('.profile__title').textContent;  
    jobInput.value = document.querySelector('.profile__description').textContent;  
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

//закрытие попапов по Esc  
document.addEventListener('keydown', function (evt) {  
    if (evt.key === "Escape") {  
        const openPopup = document.querySelector('.popup_is-opened');  
        if (openPopup) {  
            closePopup(openPopup);  
        }  
    }  
});  

//находим форму в DOM для редактирования профиля  
const formElement = editPopup.querySelector('.popup__form');  
const nameInput = formElement.querySelector('.popup__input_type_name');  
const jobInput = formElement.querySelector('.popup__input_type_description');  

//обработчик «отправки» формы редактирования профиля  
function handleFormSubmit(evt) {  
    evt.preventDefault(); //отменяем стандартное поведение формы  

    //получаем значения из полей  
    const nameValue = nameInput.value;  
    const jobValue = jobInput.value;  

    //выбираем элементы, куда должны быть вставлены новые значения  
    const profileTitle = document.querySelector('.profile__title');  
    const profileDescription = document.querySelector('.profile__description');  

    //вставляем новые значения  
    profileTitle.textContent = nameValue;  
    profileDescription.textContent = jobValue;  

    //закрываем попап  
    closePopup(editPopup);  
}  

//прикрепляем обработчик к форме   
formElement.addEventListener('submit', handleFormSubmit);   

//обработчик событий для добавления новой карточки  
const newCardFormElement = newCardPopup.querySelector('.popup__form');  

function handleNewCardSubmit(evt) {  
    evt.preventDefault(); //отменяем стандартное поведение формы  

    //получаем значения из полей  
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

//прикрепляем обработчик к форме 
newCardFormElement.addEventListener('submit', handleNewCardSubmit);