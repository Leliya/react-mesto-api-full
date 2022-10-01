import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationDeletePopup({ isOpen, onClose, onDeleteCard, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Вы уверены?"
      name="delete"
      buttonName="Да"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={true}
    />
  );
}

export default ConfirmationDeletePopup;
