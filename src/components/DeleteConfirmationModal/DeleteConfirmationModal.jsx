import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
      <div className="modal__content modal__content_type_delete"  onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}></button>
        <p className="modal__text">Are you sure you want to delete this item?</p>
        <p className="modal__sentence">This action is irreversible.</p>
        <div className="modal__buttons">
          <button className="modal__yes-btn" onClick={onConfirm}>Yes, delete item</button>
          <button className="modal__cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;