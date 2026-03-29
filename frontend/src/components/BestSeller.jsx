import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);

  // Use useMemo for performance: only recalculates if products array actually changes
  const bestSeller = useMemo(() => {
    return products.filter((item) => item.bestseller).slice(0, 5); // Changed to 5 for better row alignment
  }, [products]);

  return (
    <section className='my-16 px-4 sm:px-0'>
      <div className='text-center py-10'>
        <div className='inline-flex flex-col items-center mb-4'>
          <Title text1={"BEST"} text2={"SELLERS"} />
          <div className='h-1 w-1/2 bg-black mt-[-10px]'></div>
        </div>

        <p className='w-full max-w-2xl m-auto text-xs sm:text-sm text-gray-500 leading-relaxed'>
          Our most loved pieces, handpicked by our community. These trending styles
          from <span className="text-black font-medium underline decoration-orange-500">NAA NAA</span> are moving fast.
        </p>
      </div>

      {/* Improved Grid with hover-up effect on the container */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8'>
        {bestSeller.length > 0 ? (
          bestSeller.map((item, index) => (
            <div
              key={index}
              className="transform transition-all duration-500 hover:-translate-y-2"
              style={{ transitionDelay: `${index * 50}ms` }} // Staggered entrance feel
            >
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </div>
          ))
        ) : (
          // Skeleton loader or empty state placeholder
          <div className="col-span-full py-20 text-center text-gray-300 italic">
            Fetching our top trends...
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSeller;