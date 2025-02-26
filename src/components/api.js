const config = {  
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-32",  
  headers: {  
    authorization: "585cd5f3-acb4-4006-9976-f4270527c69f",  
    "Content-Type": "application/json",  
  },  
};  

//функция для обработки ответа  
const handleResponse = (res) => {  
  if (!res.ok) {  
    return Promise.reject(`Ошибка: ${res.status}`);  
  }  
  return res.json();  
};  

export const getUserInfo = () => {  
  return fetch(`${config.baseUrl}/users/me`, {  
    headers: config.headers,  
  }).then(handleResponse);  
};  

export const getInitialCards = () => {  
  return fetch(`${config.baseUrl}/cards`, {  
    headers: config.headers,  
  }).then(handleResponse);  
};  

export const updateUserInfo = (name, about) => {  
  return fetch(`${config.baseUrl}/users/me`, {  
    method: "PATCH",  
    headers: config.headers,  
    body: JSON.stringify({  
      name: name,  
      about: about,  
    }),  
  }).then(handleResponse);  
};  

export const addCard = (name, link) => {  
  return fetch(`${config.baseUrl}/cards`, {  
    method: "POST",  
    headers: config.headers,  
    body: JSON.stringify({  
      name: name,  
      link: link,  
    }),  
  }).then(handleResponse);  
};  

export const deleteCardFromApi = (cardId) => {  
  return fetch(`${config.baseUrl}/cards/${cardId}`, {  
    method: "DELETE",  
    headers: config.headers,  
  }).then(handleResponse);  
};  

//функция для лайка карточки
export const putLike = (cardId) => {  
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {  
    method: "PUT",  
    headers: config.headers,  
  }).then(handleResponse);  
};  

//функция для удаления лайка карточки
export const deleteLike = (cardId) => {  
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {  
    method: "DELETE",  
    headers: config.headers,  
  }).then(handleResponse);  
};  

//функция для обновления аватара
export const updateAvatar = (avatarLink) => {  
  return fetch(`${config.baseUrl}/users/me/avatar`, {  
    method: "PATCH",  
    headers: config.headers,  
    body: JSON.stringify({ avatar: avatarLink }),  
  }).then(handleResponse);  
};  