import React, {useEffect, useState} from "react";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUserData()
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => console.log(err));
  }, [])

  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  function handleCardClick(props) {
    setSelectedCard(props);
  }

  function handleUpdateUser(user) {
    api.editProfile(user.name, user.about)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(user) {
    api.uploadAvatar(user.avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
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

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getCards()
      .then(res => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  function handleAddPlace(card) {
    api.addNewCard(card.name, card.link)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header/>
        <Main
          isEditAvatarPopupOpen={handleEditAvatarClick}
          isEditProfilePopupOpen={handleEditProfileClick}
          isAddPlacePopupOpen={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer/>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

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
    </CurrentUserContext.Provider>
  );
}

export default App;
