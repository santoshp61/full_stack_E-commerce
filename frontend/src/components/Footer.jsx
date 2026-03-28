import React from "react";
import { assets } from "../assets/assets";
// Fixed: Link is capitalized, and useNavigate is spelled correctly
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
          <img className='mb-5 w-32' src={assets.logo} alt='logo' />
          <p className='w-full md:w-2/3 text-gray-600'>
            Stay connected with ShopEase Clothes for the latest trends, exclusive
            offers, and style inspiration. Follow us on social media and
            subscribe to our newsletter for updates and special promotions.
          </p>
        </div>

        <div>
          <p className='font-medium text-xl mb-5 border-b w-fit pb-1 border-gray-300 text-gray-800'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            {/* These Links will now work correctly */}
            <Link to='/' className='hover:text-black hover:translate-x-1 transition-all duration-300'>
              Home
            </Link>
            <Link to='/about' className='hover:text-black hover:translate-x-1 transition-all duration-300'>
              About us
            </Link>
            <Link to='/orders' className='hover:text-black hover:translate-x-1 transition-all duration-300'>
              Delivery
            </Link>
            <Link to='/privacy' className='hover:text-black hover:translate-x-1 transition-all duration-300'>
              Privacy policy
            </Link>
          </ul>
        </div>

        <div>
          <p className='font-medium text-xl mb-5 text-gray-800'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>
              <a href="tel:+9779762XXXXXX" className="hover:text-black transition-colors">
                +977 9762XXXXXX
              </a>
            </li>
            <li>
              <a href="mailto:shopease@gmail.com" className="hover:text-black transition-colors">
                shopease@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className=''>
        <hr className="border-gray-200" />
        <p className='py-5 text-sm text-center text-gray-500'>
          Copyright {new Date().getFullYear()} Shopease - All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;