import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onEditProfile, currentUser }) {
  const [values, setValues] = useState({ name: "", avatar: "" });

  useEffect(() => {
    if (currentUser && isOpen) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile(values);
  };

const isFormValid = values.name.trim() !== "";

  return (
    <ModalWithForm
      title="Edit Profile"
      name="edit-profile"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name*
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          className="modal__input"
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          className="modal__input"
          required
        />
      </label>

      <button
        type="submit"
        className="modal__button_type_edit"
        disabled={!isFormValid}
      >
        Save changes
      </button>
    </ModalWithForm>
  );
}

export default EditProfileModal;
