//создание карточки
export function createCard(card, deleting, handleLike, handleImageClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true).firstElementChild;
  
    cardElement.querySelector('.card__title').textContent = card.name;  
    cardElement.querySelector('.card__image').src = card.link; 
    const likeButton = cardElement.querySelector('.card__like-button'); 
    const resetButton = cardElement.querySelector('.card__delete-button');
    const imageElement = cardElement.querySelector('.card__image');
    
    //лайк
    likeButton.addEventListener('click', () => {  
        handleLike(likeButton);   
    }); 

    //клик на изображение   
    imageElement.addEventListener('click', () => {  
        handleImageClick(card);   
    });  

    resetButton.addEventListener('click', () => {   
        deleting(cardElement);  
    });  

    return cardElement;  
}  

//обработка лайка
export function handleLike(likeButton) {  
    likeButton.classList.toggle('card__like-button_is-active'); //метод переключает класс у элемента 
}

//удалениe карточки  
export function deleteCard(cardElement) {  
    cardElement.remove();  
}