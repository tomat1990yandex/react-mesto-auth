import React, {useEffect, useState} from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main({onEditAvatarPopupOpen, onEditProfilePopupOpen, onAddPlacePopupOpen, onCardClick}) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserData()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => console.log(err));
    api.getInitialCards()
      .then(res => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__box">
          <div className="profile__box-pic" onClick={onEditAvatarPopupOpen}>
            <img className="profile__avatar" src={`${userAvatar}`} alt="Аватар профиля"></img>
            <button className="profile__change-btn" type="button"
                    aria-label="Изменить аватар пользователя"></button>
          </div>
          <div className="profile__info">
            <div className="profile__box-title">
              <h1 className="profile__name">{userName}</h1>
              <button type="button" className="profile__edit" id="ButtonEdit"
                      aria-label="Кнопка редактировать" onClick={onEditProfilePopupOpen}></button>
            </div>
            <p className="profile__profession">{userDescription}</p>
          </div>
        </div>
        <button type="button" className="profile__add" id="ButtonAdd" aria-label="Кнопка добавить"
                onClick={onAddPlacePopupOpen}></button>
      </section>

      <section className="elements">
        {
          cards.map(card => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
            />
          ))
        }
      </section>
    </main>
  );
}

export default Main;
