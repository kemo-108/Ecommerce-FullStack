import "./WishList.css";

import WishlistToolbar from "./Sections/WishlistToolbar/WishlistToolbar";
import WishlistGrid from "./Sections/WishlistGrid/WishlistGrid";

const WishList = () => {
  return (
    <section className="wishlist">
      <WishlistToolbar />

      <WishlistGrid />
    </section>
  );
};

export default WishList;
