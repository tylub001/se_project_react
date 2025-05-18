import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";
import "./Profile.css";

export default function Profile({
  clothingItems,
  onCardClick,
  onCardDelete,
  isMobileMenuOpened,
  toggleMobileMenu,
   handleAddClick,
  
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar
          toggleMobileMenu={toggleMobileMenu}
          isMobileMenuOpened={isMobileMenuOpened}
        />
      </section>

      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onCardDelete={onCardDelete}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}
