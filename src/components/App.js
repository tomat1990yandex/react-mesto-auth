import React, {useState} from "react";
import '../index.css';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


function App() {

  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  function handleCardClick(props) {
    setSelectedCard(props);
  }

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsProfilePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <Header/>
      <Main
        onEditAvatarPopupOpen={handleEditAvatarClick}
        onEditProfilePopupOpen={handleEditProfileClick}
        onAddPlacePopupOpen={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer/>

      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        title="Обновить аватар"
        name="avatar-edit"
        buttonName="Сохранить"
      >
        <input
          className="popup__input"
          type="url"
          name="link"
          required
          placeholder="Ссылка на фотографию"
        />
        <span
          id="name-input-error"
          className="popup__field-error popup__name-error"
        >
        </span>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        title="Новое место"
        name="add-place"
        buttonName="Создать"
      >
        <input
          required
          name="name"
          type="text"
          className="popup__input"
          placeholder="Название"
          minLength="2"
          maxLength="30"
        />
        <span
          id="card-name-input-error"
          className="popup__field-error popup__name-add-error">
        </span>
        <input
          required
          name="link"
          type="url"
          className="popup__input"
          placeholder="Ссылка на картинку"
        />
        <span
          id="card-link-input-error"
          className="popup__field-error popup__link-add-error">
        </span>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name="edit"
        title="Редактировать профиль"
        buttonName="Сохранить"
      >
        <input
          required
          name="name"
          type="text"
          className="popup__input"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
        />
        <span
          id="name-input-error"
          className="popup__field-error popup__name-error">
        </span>
        <input
          required
          name="about"
          type="text"
          className="popup__input"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
        />
        <span
          id="profession-input-error"
          className="popup__field-error popup__profession-error">
        </span>

      </PopupWithForm>

      <PopupWithForm
        onClose={closeAllPopups}
        name="confirm"
        title="Вы уверены?"
        buttonName="Да"
      >
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>
);
}

export default App;
