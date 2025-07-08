import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Profile from "../Profile/Profile";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { deleteItem, getItems, addItem } from "../../utils/api";
import auth from "../../utils/auth";
import * as api from "../../utils/api";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [activeModal, setActiveModal] = useState("");
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleLoginClick = () => setActiveModal("login");
  const handleSignUpClick = () => setActiveModal("register");
  const handleEditProfileClick = () => setIsEditProfileModalOpen(true);

  const closeAllModals = () => {
    setActiveModal("");
    setIsEditProfileModalOpen(false);
    setIsConfirmModalOpen(false);
    setCardToDelete(null);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const closeOnEvent = (event) => {
    if (!event) return;

    if (
      event.key === "Escape" ||
      event.target === event.currentTarget ||
      event.type === "click"
    ) {
      setActiveModal("");
    }
  };

  useEffect(() => {
    if (!activeModal) return;
    document.addEventListener("keydown", closeOnEvent);
    return () => document.removeEventListener("keydown", closeOnEvent);
  }, [activeModal]);

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false); //
    setCurrentUser({});
  };

  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");
    const isLiked = likes.some((id) => id === currentUser._id);

    const apiCall = !isLiked
      ? api.addCardLike(_id, token)
      : api.removeCardLike(_id, token);

    apiCall
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch((err) => console.error("Like toggle error:", err));
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    auth
      .register({ name, avatar, email, password })
      .then((user) => {
        setCurrentUser(user);
        return auth.login({ email, password });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        closeAllModals();
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  const handleLogin = ({ email, password }) => {
    auth
      .login({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        fetchUserProfile(data.token);
        setPasswordError("");
        closeAllModals();
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setPasswordError("Incorrect password");
      });
  };

  const fetchUserProfile = (token) => {
    api
      .getUserInfo(token)
      .then((user) => setCurrentUser(user))
      .catch((err) => console.error("Failed to fetch profile:", err));
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    auth
      .checkToken(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.error("Token invalid or expired:", err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser({});
      });
  }, []);

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    api
      .editProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllModals();
      })
      .catch(console.error);
  };

  const openConfirmationModal = (card) => {
    setIsConfirmModalOpen(true);
    setCardToDelete(card);
  };

  const handleCardDelete = () => {
    if (!cardToDelete) return;

    const token = localStorage.getItem("jwt");
    deleteItem(cardToDelete._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDelete._id)
        );
        setIsConfirmModalOpen(false);
        setCardToDelete(null);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

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

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    addItem({ name, imageUrl, weather }, token)
      .then((item) => {
        setClothingItems((prevItems) => [item, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.error("Failed to fetch weather data:", err);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error("Failed to fetch clothing items:", err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content page__content_type_profile">
            <Header
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              onLoginClick={handleLoginClick}
              onSignupClick={handleSignUpClick}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              toggleMobileMenu={toggleMobileMenu}
              isMobileMenuOpened={isMobileMenuOpened}
              isSmallScreen={isSmallScreen}
              onEditProfileClick={handleEditProfileClick}
              onSignOut={handleSignOut}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    isMobileMenuOpened={isMobileMenuOpened}
                    isSmallScreen={isSmallScreen}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    element={
                      <Profile
                        onCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        onCardDelete={openConfirmationModal}
                        onAddItem={handleAddItemModalSubmit}
                        isMobileMenuOpened={isMobileMenuOpened}
                        toggleMobileMenu={toggleMobileMenu}
                        handleAddClick={handleAddClick}
                        currentUser={currentUser}
                        onEditProfileClick={handleEditProfileClick}
                        onSignOut={handleSignOut}
                        handleCardLike={handleCardLike}
                        isLoggedIn={isLoggedIn}
                      />
                    }
                  />
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItemModalSubmit={handleAddItemModalSubmit}
            closeActiveModal={closeActiveModal}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteClick={() => openConfirmationModal(selectedCard)}
          />
          <DeleteConfirmationModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={handleCardDelete}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeAllModals}
            onRegister={handleRegister}
            onLoginClick={handleLoginClick}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeAllModals}
            onLogin={handleLogin}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
            onSignupClick={handleSignUpClick}
          />
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={closeAllModals}
            onEditProfile={handleEditProfile}
            currentUser={currentUser}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
