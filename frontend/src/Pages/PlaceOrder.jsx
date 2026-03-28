import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    tole: "",
    area: "",
    district: "Kathmandu",
    phone: "",
  });

  // Fetch saved address on load
  useEffect(() => {
    const fetchUserAddress = async () => {
      if (!token) return;
      try {
        const response = await axios.post(backendUrl + '/api/user/get-profile', {}, { headers: { token } });
        if (response.data.success && response.data.user.address) {
          setFormData(response.data.user.address);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    fetchUserAddress();
  }, [token, backendUrl]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (formData.district !== "Kathmandu") {
      return toast.error("Currently, we only deliver within Kathmandu Valley.");
    }

    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        items: orderItems,
        address: formData,
        amount: getCartAmount() + delivery_fee,
      };

      // Handle different payment methods
      switch (method) {
        case "cod":
          const res = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });
          if (res.data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success("Order Placed! Address saved.");
          } else {
            toast.error(res.data.message);
          }
          break;

        case 'stripe':
          const stripe = await axios.post(backendUrl + "/api/order/stripe", orderData, { headers: { token } });
          if (stripe.data.success) {
            const { session_url } = stripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(stripe.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <form onSubmit={onSubmitHandler} className='max-w-[1100px] mx-auto flex flex-col lg:flex-row justify-between gap-6 pt-10 px-4'>

        <div className='flex-1 flex flex-col gap-6'>
          <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
            <div className='mb-6'>
              <Title text1={"DELIVERY"} text2={"INFORMATION"} />
              <div className="flex items-center gap-2 mt-2 py-1 px-3 bg-orange-50 rounded border border-orange-100 w-fit">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <p className="text-[11px] text-orange-700 font-medium">Inside Kathmandu Only</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className='flex gap-3'>
                <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-2 px-3.5 w-full focus:border-orange-400 outline-none text-sm' type='text' placeholder='First name' />
                <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-2 px-3.5 w-full focus:border-orange-400 outline-none text-sm' type='text' placeholder='Last name' />
              </div>

              <input required onChange={onChangeHandler} name='tole' value={formData.tole} className='border border-gray-300 rounded py-2 px-3.5 w-full focus:border-orange-400 outline-none text-sm' type='text' placeholder='Tole / Ward No.' />

              <div className='flex gap-3'>
                <input required onChange={onChangeHandler} name='area' value={formData.area} className='border border-gray-300 rounded py-2 px-3.5 w-full focus:border-orange-400 outline-none text-sm' type='text' placeholder='Area' />
                <input readOnly name='district' value="Kathmandu" className='border border-gray-200 bg-gray-50 rounded py-2 px-3.5 w-full cursor-not-allowed text-gray-400 text-sm' type='text' />
              </div>

              <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-2 px-3.5 w-full focus:border-orange-400 outline-none text-sm' type='number' placeholder='Phone Number' />
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
            <div className="mb-6">
              <Title text1={"PAYMENT"} text2={"METHOD"} />
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              {/* Stripe Option */}
              <div onClick={() => setMethod("stripe")} className={`flex items-center gap-4 border p-3 px-4 cursor-pointer rounded transition-all flex-1 ${method === "stripe" ? "border-orange-500 bg-orange-50" : "hover:border-gray-400"}`}>
                <div className={`min-w-4 h-4 border-2 rounded-full flex items-center justify-center ${method === "stripe" ? "border-orange-500" : "border-gray-300"}`}>
                  {method === "stripe" && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
                </div>
                <img className='h-5' src={assets.stripe_logo} alt='stripe' />
              </div>

              {/* COD Option */}
              <div onClick={() => setMethod("cod")} className={`flex items-center gap-4 border p-3 px-4 cursor-pointer rounded transition-all flex-1 ${method === "cod" ? "border-orange-500 bg-orange-50" : "hover:border-gray-400"}`}>
                <div className={`min-w-4 h-4 border-2 rounded-full flex items-center justify-center ${method === "cod" ? "border-orange-500" : "border-gray-300"}`}>
                  {method === "cod" && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
                </div>
                <p className='text-gray-600 text-xs font-bold uppercase'>Cash on Delivery</p>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full lg:w-[380px]'>
          <div className="bg-white p-6 rounded shadow-sm border border-gray-100 sticky top-20">
            <h2 className="text-lg font-medium text-gray-800 mb-6 border-b pb-4">Order Summary</h2>
            <CartTotal />
            <button type='submit' className='w-full bg-[#f85606] text-white py-3.5 rounded-sm font-medium mt-8 hover:bg-[#d04a05] transition-colors shadow-lg active:scale-95'>
              PLACE ORDER
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;