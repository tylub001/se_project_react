import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onDeleteClick }) {
  
  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}
      onClick={onClose}
    >
      <div className="modal__content modal__content_type_image" onClick={(e) => e.stopPropagation()}>
       
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_card"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
            <button onClick={() => onDeleteClick(card)} className="modal__delete-btn">Delete item</button>
 </div>
          <p className="modal__weather">Weather: {card.weather}</p>
         
       
      </div>
    </div>
  );
}

export default ItemModal;
