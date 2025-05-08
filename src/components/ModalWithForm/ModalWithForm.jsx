import modalclosebtn from "../../assets/modalclosebtn.svg";
import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, title, activeModal, onClose }) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
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
          <button tupe="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
