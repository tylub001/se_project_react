import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";


export default function ClothesSection({
  clothingItems,
  onCardClick,
  onCardDelete,
  handleAddClick,
  handleCardLike,
  isLoggedIn
}) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter(
  (item) => item.owner === currentUser?._id
);
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__your-items">Your items</p>
        <button className="clothes-section__add-new-btn" onClick={handleAddClick}>+ Add new</button>
      </div>
      <ul className="clothes-section__items">
        
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              isLoggedIn={isLoggedIn}
               onCardLike={handleCardLike}
              onDeleteClick={() => onCardDelete(item)}
            />
          );
        })}
      </ul>
    </div>
  );
}
