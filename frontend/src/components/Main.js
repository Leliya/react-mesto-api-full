import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__user-image">
          <button
            className="profile__avatar-edit"
            type="button"
            aria-label="Изменить аватар"
            onClick={onEditAvatar}
          ></button>
          <img
            src={currentUser.avatar}
            alt="Аватар профиля"
            className="profile__avatar"
          />
        </div>
        <h1 className="profile__name">{currentUser.name}</h1>
        <p className="profile__activity">{currentUser.about}</p>
        <button
          className="profile__edit-button"
          aria-label="Редактировать профиль"
          type="button"
          onClick={onEditProfile}
        ></button>
        <button
          className="profile__add-button"
          aria-label="Добавить фотографию"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="photos">
        <ul className="cards">
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              key={card._id}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
