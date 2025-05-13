import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { defaultClothingItems } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowWidth;
  };
  const windowWidth = useWindowWidth();
  const isSmallScreen = windowWidth < 768;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened((prevState) => !prevState);
  };

  useEffect(() => {
    if (windowWidth >= 768 && isMobileMenuOpened) {
      setIsMobileMenuOpened(false);
    }
  }, [windowWidth, isMobileMenuOpened]);

  const closeActiveModal = (event) => {
    setActiveModal("");
    if (event?.key === "Escape") {
      setActiveModal("");
    }
    if (event?.target.classList.contains("modal_opened")) {
      setActiveModal("");
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        closeActiveModal(event);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleAddClick={handleAddClick}
          weatherData={weatherData}
          toggleMobileMenu={toggleMobileMenu}
          isMobileMenuOpened={isMobileMenuOpened}
          isSmallScreen={isSmallScreen}
        />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          isMobileMenuOpened={isMobileMenuOpened}
          isSmallScreen={isSmallScreen}
          clothingItems={clothingItems}
        />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        isOpen={activeModal === "add-garment"}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            name="weather"
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            name="weather"
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="image URL"
          />
        </label>
        <fieldset className="modal__radio-btns">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
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
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
