//функция для показа ошибки  
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {  
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);  
  inputElement.classList.add(validationConfig.inputErrorClass);  
  errorElement.textContent = errorMessage;  
  errorElement.classList.add(validationConfig.errorClass);  
};  

//функция для скрытия ошибки  
const hideInputError = (formElement, inputElement, validationConfig) => {  
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);  
  if (errorElement) {  
    inputElement.classList.remove(validationConfig.inputErrorClass);  
    errorElement.classList.remove(validationConfig.errorClass);  
    errorElement.textContent = "";   
  }  
};  

//функция проверки валидности ввода  
const checkInputValidity = (formElement, inputElement, validationConfig) => {    
  if (inputElement.validity.patternMismatch) {   
    inputElement.setCustomValidity(inputElement.dataset.error);   
  } else {   
    inputElement.setCustomValidity("");   
  }

  //показываем или скрываем ошибку  
  if (!inputElement.validity.valid) {  
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);  
  } else {  
    hideInputError(formElement, inputElement, validationConfig);  
  }  
};   

//функция очистки ошибок валидации  
export const clearValidation = (formElement, validationConfig) => {  
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));  
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);  

  inputList.forEach((inputElement) => {  
    hideInputError(formElement, inputElement, validationConfig);  
  });  

  disableSubmitButton(buttonElement, validationConfig);  
};  

//функция проверки наличия недопустимого ввода  
const hasInvalidInput = (inputList) => {  
  return inputList.some((inputElement) => {  
    return !inputElement.validity.valid;  
  });  
};  

//функция отключения кнопки отправки  
const disableSubmitButton = (buttonElement, validationConfig) => {  
  buttonElement.disabled = true;  
  buttonElement.classList.add(validationConfig.inactiveButtonClass);  
};   

//функция переключения состояния кнопки  
const toggleButtonState = (inputList, buttonElement, validationConfig) => {  
  if (hasInvalidInput(inputList)) {  
    disableSubmitButton(buttonElement, validationConfig);  
  } else {  
    buttonElement.disabled = false;  
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);  
  }  
};  

//функция установки слушателей событий  
const setEventListeners = (formElement, validationConfig) => {  
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));  
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);  

  inputList.forEach((inputElement) => {  
    inputElement.addEventListener("input", function () {  
      checkInputValidity(formElement, inputElement, validationConfig);  
      toggleButtonState(inputList, buttonElement, validationConfig);  
    });  
  });  

  toggleButtonState(inputList, buttonElement, validationConfig); 
};   

//функция для включения валидации  
export const enableValidation = (validationConfig) => {  
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));  

  formList.forEach((formElement) => {  
    formElement.addEventListener("submit", function (evt) {  
      evt.preventDefault();  
    });  

    setEventListeners(formElement, validationConfig);  
  });  
}; 