import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  // FIX 1: Safely get the first image or null to avoid the "" warning
  const imageSrc = (image && image.length > 0) ? image[0] : null;

  return (
    // FIX 2: Ensure 'id' matches the prop name (which is item._id from the parent)
    <Link
      onClick={() => window.scrollTo(0, 0)}
      to={`/product/${id}`}
      className='text-gray-700 cursor-pointer'
    >
      <div className='overflow-hidden'>
        {imageSrc ? (
          <img
            className='hover:scale-110 transition ease-in-out'
            src={imageSrc}
            alt={name}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  );
};

export default ProductItem;