import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({
  isOpen,
  onClose,
  onLogin,
  passwordError,
  setPasswordError,
}) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    setPasswordError("");
    const { name, value } = e.target;

    const newValues = { ...values, [name]: value }; 
    setValues(newValues);

    const formIsValid =
      newValues.email.trim() !== "" && newValues.password.trim() !== "";
    setIsValid(formIsValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values); 
  };

  return (
    <ModalWithForm
      title="Log In"
      name="login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Log In"
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="modal__input"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label
        className={`modal__label ${passwordError ? "modal__label_error" : ""}`}
      >
        {passwordError || "Password*"}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="modal__input"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      <div className="modal__footer modal__footer_type_login">
        <button
          type="submit"
          className={`modal__button ${
            !isValid ? "modal__button_disabled" : ""
          }`}
          disabled={!isValid}
        >
          Log in
        </button>

        <button type="button" className="modal__link">
          or Register
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
