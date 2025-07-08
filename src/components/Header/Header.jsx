import "./Header.css";
import logo from "../../assets/logo.svg";
import cornerbutton from "../../assets/cornerbutton.svg";
import closeDark from "../../assets/closeDark.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  toggleMobileMenu,
  isMobileMenuOpened,
  isLoggedIn,
  onLoginClick,
  onSignupClick,
  onEditProfileClick,
  onSignOut
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const renderAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="header__avatar"
        />
      );
    }
    const firstLetter = currentUser?.name?.charAt(0).toUpperCase() || "?";
    return <div className="header__avatar-placeholder">{firstLetter}</div>;
  };

  return (
    <header className="header header__type_profile">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className={`header__logo ${isMobileMenuOpened ? "hidden" : ""}`}
        />
      </Link>

      <p
        className={`header__date-and-location profile__header_date-and-location ${
          isMobileMenuOpened ? "hidden" : ""
        }`}
      >
        {currentDate}, {weatherData.city}
      </p>

      <button
        className={`header__hamburger ${isMobileMenuOpened ? "hidden" : ""}`}
        onClick={toggleMobileMenu}
      >
        <img src={cornerbutton} alt="menu" />
      </button>

      <nav
        className={`header__mobile-menu ${
          isMobileMenuOpened ? "header__mobile-menu_opened" : ""
        }`}
      >
        <button className="menu__close-btn" onClick={toggleMobileMenu}>
          <img className="menu__close-icon" src={closeDark} alt="close" />
        </button>
        <ul className="menu__list">
          {isLoggedIn ? (
            <>
              <li className="menu__container">
                <p className="menu__username">{currentUser?.name}</p>
                {renderAvatar()}
              </li>
              <li>
                <button
                  onClick={handleAddClick}
                  type="button"
                  className="menu__add-clothes-btn"
                >
                  + Add clothes
                </button>
                <button
                  className="sidebar__edit-btn"
                  type="button"
                  onClick={onEditProfileClick}
                >
                  Change profile data
                </button>
                <button
                  className="sidebar__signout-btn"
                  type="button"
                  onClick={onSignOut}
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button className="menu__signup-btn" onClick={onSignupClick}>
                  Sign Up
                </button>
              </li>
              <li>
                <button className="menu__login-btn" onClick={onLoginClick}>
                  Log In
                </button>
              </li>
            </>
          )}
        
        </ul>
      </nav>

      <div className="header__user-container">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser?.name?.charAt(0).toUpperCase() || "?"}
                </div>
              )}
              <p className="header__username">{currentUser?.name}</p>
            </Link>
          </>
        ) : (
          <>
            <button className="header__signup-btn" onClick={onSignupClick}>
              Sign Up
            </button>
            <button className="header__login-btn" onClick={onLoginClick}>
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
