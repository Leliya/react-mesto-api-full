import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");
  const [isValidTiTle, setValidTitleStatus] = React.useState({
    validity: false,
    message: "",
  });
  const [isValidLink, setValidLinkStatus] = React.useState({
    validity: false,
    message: "",
  });

  React.useEffect(() => {
    if (isOpen) {
      setTitle("");
      setLink("");
      setValidTitleStatus({ validity: false, message: "" });
      setValidLinkStatus({ validity: false, message: "" });
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      title: title,
      link: link,
    });
  }

  function handleChangeTitle(evt) {
    setTitle(evt.target.value);
    setValidTitleStatus({
      validity: evt.target.validity.valid,
      message: evt.target.validationMessage,
    });
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
    setValidLinkStatus({
      validity: evt.target.validity.valid,
      message: evt.target.validationMessage,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      name="add-photo"
      buttonName="Создать"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={isValidTiTle.validity && isValidLink.validity}
    >
      <>
        <div className="popup__fieldset">
          <input
            type="text"
            className="popup__input popup__input_type_title"
            name="title"
            id="title"
            value={title || ""}
            onChange={handleChangeTitle}
            placeholder="Название"
            minLength={2}
            maxLength={30}
            required
          />
          <span className="popup__input-error title-input-error">
            {isValidTiTle.message}
          </span>
        </div>
        <div className="popup__fieldset">
          <input
            type="url"
            className="popup__input popup__input_type_link"
            name="link"
            id="link"
            value={link || ""}
            onChange={handleChangeLink}
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error link-input-error">
            {isValidLink.message}
          </span>
        </div>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
