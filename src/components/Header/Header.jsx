import { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import cornerbutton from "../../assets/cornerbutton.svg";

import closeDark from "../../assets/closeDark.svg";

function Header({ handleAddClick, weatherData }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened((prevState) => !prevState);
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="logo" className="header__logo" />
      <p className="header__date-and-location">
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
          <img src={closeDark} alt="close" />
        </button>
        <ul className="menu__list">
          <div className=" menu__container">
            <p className="menu__username">Terrence Tegegne</p>
            <img src={avatar} alt="Terrence Tegegne" className="menu__avatar" />
           
          </div>

          <li>
          
          <button
              onClick={handleAddClick}
              type="button"
              className="menu__add-clothes-btn"
            >
              + Add clothes
            </button>
          </li>
        </ul>
      </nav>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__ursername">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
