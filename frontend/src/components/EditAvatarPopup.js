import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = React.useRef();
  const [errorMesage, setErrorMessage] = React.useState("");
  const [isValid, setValidStatus] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
      setErrorMessage("");
      setValidStatus(false);
      // console.log(avatarRef.current.validationMessage)
      // avatarRef.current.validationMessage = ''
    }
  }, [isOpen]);

  function validation() {
    setValidStatus(avatarRef.current.validity.valid);
    setErrorMessage(avatarRef.current.validationMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      name="avatar"
      buttonName="Сохранить"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={isValid}
    >
      <>
        <div className="popup__fieldset">
          <input
            type="url"
            className="popup__input popup__input_type_url"
            name="url"
            id="url"
            placeholder="Ссылка на изображение"
            ref={avatarRef}
            onChange={validation}
            required
          />
          <span className="popup__input-error url-input-error">
            {isValid || errorMesage}
          </span>
        </div>
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
