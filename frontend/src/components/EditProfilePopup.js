import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isValidName, setValidNameStatus] = React.useState({
    validity: false,
    message: "",
  });
  const [isValidDescription, setValidDescriptionStatus] = React.useState({
    validity: false,
    message: "",
  });

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setValidNameStatus({ validity: false, message: "" });
    setValidDescriptionStatus({ validity: false, message: "" });
  }, [currentUser]);

  function handleChangeName(evt) {
    setName(evt.target.value);
    setValidNameStatus({
      validity: evt.target.validity.valid,
      message: evt.target.validationMessage,
    });
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
    setValidDescriptionStatus({
      validity: evt.target.validity.valid,
      message: evt.target.validationMessage,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="profile"
      buttonName="Сохранить"
      isLoading={isLoading}
      isValid={isValidName.validity && isValidDescription.validity}
    >
      <>
        <div className="popup__fieldset">
          <input
            type="text"
            className="popup__input popup__input_type_name"
            name="name"
            id="name"
            placeholder="Имя"
            value={name || ""}
            onChange={handleChangeName}
            required
            minLength={2}
            maxLength={20}
          />
          <span className="popup__input-error name-input-error">{isValidName.message}</span>
        </div>
        <div className="popup__fieldset">
          <input
            type="text"
            className="popup__input popup__input_type_about"
            name="about"
            id="about"
            placeholder="Профессия"
            value={description || ""}
            onChange={handleChangeDescription}
            required
            minLength={2}
            maxLength={40}
          />
          <span className="popup__input-error about-input-error">{isValidDescription.message}</span>
        </div>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
