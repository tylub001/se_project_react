import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import cornerbutton from "../../assets/cornerbutton.svg";
import closeDark from "../../assets/closeDark.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  toggleMobileMenu,
  isMobileMenuOpened,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
          <li className=" menu__container">
            <p className="menu__username">Terrence Tegegne</p>
            <img src={avatar} alt="Terrence Tegegne" className="menu__avatar" />
          </li>

          <li>
            <button
              onClick={handleAddClick}
              type="button"
              className="menu__add-clothes-btn"
            >
              + Add clothes
            </button>
          </li>

          <div className="profile__toggleswitch">
            <ToggleSwitch />
          </div>
        </ul>
      </nav>
      <div className="header__user-container">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__link">
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
          <p className="header__username">Terrence Tegegne</p>
        </Link>
      </div>
    </header>
  );
}

export default Header;
