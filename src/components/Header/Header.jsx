import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import cornerbutton from "../../assets/cornerbutton.svg";

function Header({ handleAddClick, weatherData }) {

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="logo" className="header__logo" />
      <p className="header__date-and-location">{currentDate}, {weatherData.city}</p>
      <img className="header__corner-btn" src={cornerbutton} alt="" />
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
