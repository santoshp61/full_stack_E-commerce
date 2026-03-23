import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App"; // You should use this variable in your axios call
import { toast } from "react-toastify";

const Add = ({ token }) => {
  // 1. Changed initial state to null for cleaner checks
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubcategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      // Only append if the image exists
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      // Use the backendUrl variable from your imports
      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setName('');
        setDescription('');
        setPrice('');
        setCategory('Men');
        setSubcategory('Topwear');
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Helper function to handle image preview safely
  const getPreview = (image) => {
    return image ? URL.createObjectURL(image) : assets.upload_area;
  };

  return (
    <main className="p-4">
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
        <div>
          <p className='mb-2 font-medium text-sm'>Upload Images</p>
          <div className='flex gap-2'>
            {/* Repeated for 1-4 */}
            <label htmlFor="image1" className="cursor-pointer">
              <img className='w-20' src={getPreview(image1)} alt='upload area' />
              <input onChange={(e) => setImage1(e.target.files[0])} type='file' id="image1" hidden />
            </label>
            <label htmlFor="image2" className="cursor-pointer">
              <img className='w-20' src={getPreview(image2)} alt='upload area' />
              <input onChange={(e) => setImage2(e.target.files[0])} type='file' id="image2" hidden />
            </label>
            <label htmlFor="image3" className="cursor-pointer">
              <img className='w-20' src={getPreview(image3)} alt='upload area' />
              <input onChange={(e) => setImage3(e.target.files[0])} type='file' id="image3" hidden />
            </label>
            <label htmlFor="image4" className="cursor-pointer">
              <img className='w-20' src={getPreview(image4)} alt='upload area' />
              <input onChange={(e) => setImage4(e.target.files[0])} type='file' id="image4" hidden />
            </label>
          </div>
        </div>

        {/* ... Rest of your input fields ... */}
        {/* Note: I added "bg-pink-500 text-white" to selected sizes for better visibility */}
        <div>
          <p className='mb-2 font-medium text-sm '>Product Sizes</p>
          <div className='flex gap-2.5'>
            {["S", "M", "L", "XL", "XXL"].map(size => (
              <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
                <p className={`${sizes.includes(size) ? "bg-pink-400 text-white" : "bg-slate-200"} px-3 py-1 cursor-pointer transition-all`}>
                  {size}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ... Checkbox and Button ... */}
        <div className='flex gap-2 mt-2'>
          <input type='checkbox' id='bestseller' checked={bestseller} onChange={() => setBestseller(prev => !prev)} />
          <label className="cursor-pointer" htmlFor='bestseller'>Add to bestseller</label>
        </div>

        <button type='submit' className='uppercase bg-black text-white px-10 py-3 rounded active:bg-gray-700'>
          Add Product
        </button>
      </form>
    </main>
  );
};

export default Add;