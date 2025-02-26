import { putLike, deleteLike } from './api.js';

//создание карточки
export function createCard(card, handleDeleteCard, handleLike, handleImageClick, currentUserId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true).firstElementChild;

    cardElement.querySelector('.card__title').textContent = card.name;  
    cardElement.querySelector('.card__image').src = card.link; 
    const likeButton = cardElement.querySelector('.card__like-button'); 
    const resetButton = cardElement.querySelector('.card__delete-button');
    const imageElement = cardElement.querySelector('.card__image');  
    const likeCountElement = cardElement.querySelector('.card__like-count'); //элемент для отображения количества лайков
    likeCountElement.textContent = card.likes.length; //отображаем количество лайков  

    //устанавливаем состояние кнопки лайка при создании карточки  
    if (card.likes.some(like => like._id === currentUserId)) {  
        likeButton.classList.add('card__like-button_is-active');  
    } 

    //скрываем кнопку удаления, если карточка не принадлежит текущему пользователю  
    if (card.owner._id !== currentUserId) {  
        resetButton.style.display = 'none';  
    } else {  
        resetButton.addEventListener('click', () => {   
            handleDeleteCard(cardElement, card._id);  
        });  
    }

    //лайк
    likeButton.addEventListener('click', () => {  
        handleLike(likeButton, card, likeCountElement);   
    }); 

    //клик на изображение   
    imageElement.addEventListener('click', () => {  
        handleImageClick(card);   
    });    

    return cardElement;  
}  

//обработка лайка 
export function handleLike(likeButton, card, likeCountElement) {  
    const isLiked = likeButton.classList.toggle('card__like-button_is-active'); //переключаем состояние кнопки  
    const likeMethod = isLiked ? putLike : deleteLike;  

    likeMethod(card._id)   
        .then(updatedCard => {  
            likeCountElement.textContent = updatedCard.likes.length;   
        })  
        .catch(err => console.log(err));  
}   

//удалениe карточки  
export function deleteCard(cardElement) {  
    cardElement.remove();  
}    