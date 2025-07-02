import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister }) {
  const [values, setValues] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value, validationMessage, validity } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validationMessage }));
    setIsValid(validity.valid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.email}</span>
      </label>

      <label className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          required
          value={values.password || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.password}</span>
      </label>

      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.name}</span>
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={values.avatar || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.avatar}</span>
      </label>

      <div className="modal__footer modal__footer_type_register">
        <button
          type="submit"
          className={`modal__button modal__button_type_register ${
            !isValid ? "modal__button_disabled" : ""
          }`}
          disabled={!isValid}
        >
          Next
        </button>

        <button type="button" className="modal__link">
          or Log in
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
