import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser.user._id;
  const isLiked = card.likes.some((i) => i._id === currentUser.user._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card, isLiked);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <li className="cards__item">
      <img
        className="cards__image"
        alt={card.name}
        src={card.link}
        onClick={handleClick}
        onError={(event) => (event.target.style.visibility = "hidden")}
      />
      <button
        type="button"
        className={
          isOwn ? "cards__delete" : "cards__delete cards__delete_hidden"
        }
        aria-label="Удалить"
        onClick={handleDeleteClick}
      ></button>
      <div className="cards__caption">
        <h2 className="cards__name">{card.name}</h2>
        <div className="cards__like-elements">
          <button
            type="button"
            className={
              isLiked ? "cards__like cards__like_active" : "cards__like"
            }
            aria-label="Мне нравится"
            onClick={handleLikeClick}
          ></button>
          <span className="cards__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
