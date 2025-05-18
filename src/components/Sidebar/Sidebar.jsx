import "./Sidebar.css";
import avatar from "../../assets/avatar.svg";

export default function Sidebar({ isMobileMenuOpened }) {
  return (
    <div
      className={`sidebar__container ${
        isMobileMenuOpened ? "hidden" : "visible"
      }`}
    >
      <hr className="sidebar__divider" />
      <div className="sidebar">
        <img className="sidebar__avatar" src={avatar} alt="Terrence Tegegne" />
        <p className="sidebar__username">User Name</p>
      </div>
      <div className="sidebar__profile-data">
        <p className="sidebar__sentence">Change profile data</p>
        <p className="sidebar__logout">Log out</p>
      </div>
    </div>
  );
}
