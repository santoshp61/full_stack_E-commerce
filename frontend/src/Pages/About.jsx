import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <main>
      <div className='text-2xl text-center mt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img
          className='w-full md:max-w-[450px]'
          src={assets.about_img}
          alt='about image'
        />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            {" "}
            At NAA NAA, we are more than just a clothing store; we are a part of the vibrant fashion community right here in Kathmandu. We recognized the need for a seamless, reliable online shopping experience that delivers premium style directly to your doorstep. By combining modern design with dedicated local logistics, we ensure that getting the latest trends is easier than ever. We take pride in our roots and are committed to providing our community with quality apparel and exceptional service.
          </p>
          <p>
            {" "}
            NAA NAA is a contemporary clothing label dedicated to the art of minimalist fashion. We focus on premium quality, sleek branding, and a seamless digital shopping experience. Based in Kathmandu and designed for the modern individual, our mission is simple: to provide high-quality apparel that speaks for itself. Style made simple. Style made for you.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Our mission at NAA NAA  is to revolutionize the digital shopping experience in Nepal by providing a seamless, high-quality, and trend-forward clothing platform. We strive to bridge the gap between modern minimalist aesthetics and accessible retail, ensuring that every customer in Kathmandu and beyond can define their personal style with ease and confidence. Through our commitment to a robust MERN-stack infrastructure and reliable local logistics, we aim to set the gold standard for e-commerce reliability and customer-centric fashion.
          </p>
        </div>

      </div>

      <div className='text-4xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
            officia tempora cumque debitis, doloremque nisi.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
            officia tempora cumque debitis, doloremque nisi.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
            officia tempora cumque debitis, doloremque nisi.
          </p>
        </div>


      </div>
      <NewsletterBox />
    </main>
  );
};

export default About;
