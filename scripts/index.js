// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');

//создание карточки
function createCard(card, deleting) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true).firstElementChild;
  
    cardElement.querySelector('.card__title').textContent = card.name;  
    cardElement.querySelector('.card__image').src = card.link;  
    const resetButton = cardElement.querySelector('.card__delete-button');
    
    resetButton.addEventListener('click', () => {   
        deleting(cardElement);  
    });  

    return cardElement;  
}

//удалениe карточки  
function deleteCard(cardElement) {  
    cardElement.remove();  
}

//вывод карточек на страницу  
function renderCards(cards, container, deleting) {  
    cards.forEach(card => {  
        const cardElement = createCard(card, deleting);  
        container.append(cardElement);   
    });  
}

renderCards(initialCards, placesList, deleteCard);