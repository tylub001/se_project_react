import modalclosebtn from "../../assets/modalclosebtn.svg";
import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, title, activeModal, onClose }) {

  const handleBackgroundClick = (event) => {
    if (event.target.classList.contains("modal_opened")) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${activeModal === "add-garment" ? "modal_opened" : ""}`}
      onClick={handleBackgroundClick} 
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={modalclosebtn}
            alt="close icon"
            className="modal__close-icon"
          />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
