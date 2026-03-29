import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollections = () => {
  const { products } = useContext(ShopContext);

  // useMemo prevents recalculating the slice unless 'products' actually changes
  const latestProducts = useMemo(() => {
    return products.slice(0, 10);
  }, [products]);

  return (
    <section className='my-16 px-4 md:px-0'>
      <div className='text-center py-10'>
        <div className='inline-flex flex-col items-center mb-4'>
          <Title text1={"LATEST"} text2={"COLLECTIONS"} />
          {/* Subtle accent line to make the title pop */}
          <div className='h-[2px] w-12 bg-gray-800 mt-[-8px]'></div>
        </div>

        <p className='w-full max-w-2xl m-auto text-xs sm:text-sm text-gray-500 leading-relaxed font-light'>
          Discover the freshest trends straight from <span className="text-black font-semibold">NAA NAA</span>.
          High-quality fabrics and modern cuts designed to keep your wardrobe ahead of the curve.
        </p>
      </div>

      {/* Rendering Products with a fade-in grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-10'>
        {latestProducts.length > 0 ? (
          latestProducts.map((item, index) => (
            <div
              key={index}
              className="hover:scale-[1.02] transition-transform duration-300 ease-in-out"
            >
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                // Since we removed price from the add panel, 
                // this will handle items without prices gracefully
                price={item.price || 0}
              />
            </div>
          ))
        ) : (
          // Placeholder while products load
          [...Array(10)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 h-64 rounded-md"></div>
          ))
        )}
      </div>

      {/* View All Button - Great for UX */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => window.scrollTo(0, 0)}
          className="border border-black px-8 py-2 text-sm uppercase hover:bg-black hover:text-white transition-all duration-300"
        >
          View All New Arrivals
        </button>
      </div>
    </section>
  );
};

export default LatestCollections;