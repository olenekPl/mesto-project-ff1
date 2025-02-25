//функция для показа ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
};

//функция для скрытия ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove("popup__input_type_error");
    errorElement.classList.remove("popup__error_visible");
    errorElement.textContent = "";
  }
};

//регулярное выражение для проверки допустимых символов
const regex = /^[A-Za-zа-яА-ЯёЁ0-9ёЁ -]+$/;
//регулярное выражение для URL
const urlRegex = /(http|https):\/\/[^\s/$.?#].[^\s]*/;

//функция проверки валидности ввода
const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.name === "avatar") {
    //проверка валидности URL для аватара
    if (!urlRegex.test(inputElement.value.trim())) {
      inputElement.setCustomValidity(inputElement.dataset.error);
    } else {
      inputElement.setCustomValidity(""); //очистка сообщения
    }
  } else if (
    inputElement.name === "name" ||
    inputElement.name === "description" ||
    inputElement.name === "place-name"
  ) {
    //проверка, заполнено ли поле и соответствует ли оно паттерну
    if (inputElement.value.trim() === "") {
      //если пустое, не устанавливаем кастомное сообщение
      inputElement.setCustomValidity("");
    } else if (!regex.test(inputElement.value)) {
      //если не соответствует регулярному выражению, устанавливаем кастомное сообщение
      inputElement.setCustomValidity(inputElement.dataset.error);
    } else {
      //если соответствует, очищаем кастомное сообщение
      inputElement.setCustomValidity("");
    }
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//функция проверки наличия недопустимого ввода
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//функция переключения состояния кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_disabled");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_disabled");
  }
};

//функция установки слушателей событий
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });

  toggleButtonState(inputList, buttonElement);
};

//функция очистки ошибок валидации
export const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });

  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
};

//функция для включения валидации
export const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};
