import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoMdStarOutline } from "react-icons/io";

const SingleProduct = () => {
  return (
    <div>
      <div className="rite">
        <span>
          <IoMdStarOutline />
        </span>
        <span>
          <IoMdStarOutline />
        </span>
        <span>
          <IoMdStarOutline />
        </span>
        <span>
          <IoMdStarOutline />
        </span>
        <span>
          <IoMdStarOutline />
        </span>
        <span>
          <IoMdStarOutline />
        </span>
      </div>
      <span type="submit">ADD TO CART +</span>
      <span>
        <FaRegHeart />
      </span>
    </div>
  );
};

export default SingleProduct;
