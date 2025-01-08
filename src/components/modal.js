//открытие попапов
export function openPopup(popupElement) {  
    popupElement.classList.add('popup_is-animated'); //класс для анимации  
    requestAnimationFrame(() => {  
        popupElement.classList.add('popup_is-opened'); 
    });  
}

//закрытие попапов  
export function closePopup(popup) {  
    popup.classList.remove('popup_is-opened');   
    //задержка перед удалением класса анимации  
    setTimeout(() => {  
        popup.classList.remove('popup_is-animated');  
    }, 600);   
}