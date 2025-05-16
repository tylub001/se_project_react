import { useState } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./Profile.css";

export default function Profile({
  clothingItems,
  onCardClick,
  onCardDelete,
  onAddItem,
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const imageUrl = e.target.imageUrl.value;
    const weather = e.target.weather.value;

    onAddItem({ name, imageUrl, weather });
    e.target.reset();
    setIsAddModalOpen(false);
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
      </section>

      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onCardDelete={onCardDelete}
          onAddClick={handleAddClick}
        />

        <ModalWithForm
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          title="Add New Garment"
          buttonText="Add Garment"
        >
          <label className="modal__label">
            Name:
            <input className="modal__input" type="text" name="name" required />
          </label>
          <label>
            Image URL:
            <input
              className="modal__input modal__input_type_profile"
              type="url"
              name="imageUrl"
              required
            />
          </label>

          <fieldset className="modal__radio-btns">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                name="weather"
                id="hot"
                type="radio"
                className="modal__radio-input"
              />{" "}
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                name="weather"
                id="warm"
                type="radio"
                className="modal__radio-input"
              />{" "}
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                name="weather"
                id="cold"
                type="radio"
                className="modal__radio-input"
              />{" "}
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
      </section>
    </div>
  );
}
