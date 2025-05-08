import "./Footer.css";
import randomize from "../../assets/randomize.svg";

function Footer() {
  return (
    <footer className="footer">
      <button className="footer__button">
        <img src={randomize} alt="arrow icon" className="footer__icon" />
        Randomize
      </button>
      <div className="footer__container">
        <p className="footer__name">Developed by Brittany Tylutke</p>
        <p className="footer__year">2025</p>
      </div>
    </footer>
  );
}

export default Footer;
