function ImagePopup({ card, isOpen, onClose }) {
  function cancelClose(e) {
    e.stopPropagation();
  }
  return (
    <div
      className={`popup popup_type_photo ${
        isOpen ? "popup_opened" : ""
      }`}
      onClick={onClose}
    >
      <figure className="popup__box" onClick={cancelClose}>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption>
          <h2 className="popup__name">{card.name}</h2>
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
