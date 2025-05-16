import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [nameError, setNameError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [weatherError, setWeatherError] = useState("");

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(value.length < 2 ? "Name must be at least 2 characters" : "");
  };

  const handleImageUrlChange = (e) => {
    const value = e.target.value;
    setImageUrl(value);

    const urlPattern = /^https?:\/\/.+/;
    setUrlError(!urlPattern.test(value) ? "Must be a valid URL" : "");
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
    setWeatherError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!weather) {
      setWeatherError("Please select a weather type");
      return;
    }
    setWeatherError("");
    onAddItemModalSubmit({ name, imageUrl, weather });
    setName("");
    setImageUrl("");
    setWeather("");
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          name="weather"
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          onChange={handleNameChange}
          value={name}
        />
        {nameError && <span className="modal__error">{nameError}</span>}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{""}
        <input
          name="imageUrl"
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="image URL"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
        {urlError && <span className="modal__error">{urlError}</span>}
      </label>
      <fieldset className="modal__radio-btns">
        {weatherError && <span className="modal__error">{weatherError}</span>}
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="hot"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            value={"hot"}
            checked={weather === "hot"}
          />{" "}
          Hot
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="warm"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            value={"warm"}
            checked={weather === "warm"}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="cold"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            value={"cold"}
            checked={weather === "cold"}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
