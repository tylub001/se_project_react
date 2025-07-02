import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card?.owner === currentUser?._id;
  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="modal__content modal__content_type_image"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_card"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer_type_card">
          <h2 className="modal__caption">{card.name}</h2>
          {isOwn && (
            <button
              onClick={() => onDeleteClick(card)}
              className="modal__delete-btn"
            >
              Delete item
            </button>
          )}
        </div>
        <p className="modal__weather">Weather: {card.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
