import "./Sidebar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";



export default function Sidebar({
  isMobileMenuOpened,
  onEditProfileClick,
  onSignOut,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div
      className={`sidebar__container ${
        isMobileMenuOpened ? "hidden" : "visible"
      }`}
    >
      <hr className="sidebar__divider" />
      <div className="sidebar">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar}
          alt={currentUser?.name || "User Avatar"}
        />
        <p className="sidebar__username">{currentUser?.name || "User"}</p>
      </div>
      <div className="sidebar__profile-data">
      
        <button className='sidebar__edit-btn' type='button' onClick={onEditProfileClick}>Change profile data</button>
        <button className='sidebar__signout-btn' type='button' onClick={onSignOut}>Log out</button>
      </div>
    </div>
  );
}
