import { openPopup } from './modal.js';
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
    const isLiked = likeButton.classList.toggle('card__like-button_is-active'); // Переключаем состояние кнопки  

    if (isLiked) {  
        putLike(card._id)  
            .then(updatedCard => {  
                // Обновляем количество лайков на основе ответа сервера  
                card.likes = updatedCard.likes;  
                likeCountElement.textContent = card.likes.length;  
            })  
            .catch(err => console.error(err));  
    } else {  
        deleteLike(card._id)  
            .then(updatedCard => {  
                // Обновляем количество лайков на основе ответа сервера  
                card.likes = updatedCard.likes;  
                likeCountElement.textContent = card.likes.length;  
            })  
            .catch(err => console.error(err));  
    }  
}

//удалениe карточки  
export function deleteCard(cardElement) {  
    cardElement.remove();  
}

//открытие попапа удаления карточки  
export function openDeletePopup(cardElement, cardId, handleConfirmDelete) {  
    const deletePopup = document.querySelector('.popup_type_delete');  
    openPopup(deletePopup);  

    //обработчик на кнопку подтверждения  
    const confirmDeleteButton = deletePopup.querySelector('#confirm-delete');  
    confirmDeleteButton.onclick = () => {  
        handleConfirmDelete(cardId);  
    };  
}    