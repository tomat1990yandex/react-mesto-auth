import React from "react";

function Card({card, onCardClick}) {

  function handleCardClick() {
    onCardClick(card)
  }

  return (
    <div className="element">
      <button type="button" className="element__delete" aria-label="Кнопка удаления карточки"></button>
      <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__group_like">
          <button type="button" className="element__like" aria-label="Кнопка мне нравится"></button>
          <span className="element__like-num">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}


export default Card;
