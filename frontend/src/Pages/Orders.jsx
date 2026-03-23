import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const { backendUrl, currency, token } = useContext(ShopContext);
  const [orderData, setorderData] = useState([]);

  const getAllOrdersData = async () => {
    try {
      if (!token) return null;
      const res = await axios.post(backendUrl + "/api/order/userorders", {}, { headers: { token } });

      if (res.data.success) {
        let allOrderItems = [];
        res.data.orders.map((order) => {
          order.items.map((item) => {
            if (typeof item === "object") {
              // We pass the order._id so we know which parent order to cancel
              item["orderId"] = order._id;
              item["status"] = order.status;
              item["payment"] = order.payment;
              item["paymentMethod"] = order.paymentMethod;
              item["date"] = order.date;
              allOrderItems.push(item);
            }
          });
        });
        setorderData(allOrderItems.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // --- NEW: Cancel Order Function ---
  const cancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        const res = await axios.post(backendUrl + "/api/order/cancel", { orderId }, { headers: { token } });
        if (res.data.success) {
          toast.success("Order Cancelled Successfully");
          getAllOrdersData(); // Refresh the list
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Failed to cancel order");
      }
    }
  };

  useEffect(() => {
    getAllOrdersData();
  }, [token]);

  return (
    <main className='border-t pt-16 px-4 md:px-0'>
      <div className='text-2xl'>
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="mt-8">
        {orderData.map((item, i) => (
          <div key={i} className='py-6 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20 rounded' src={item.image[0]} alt='product' />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                  <p>{item.price}{currency}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-2 text-xs text-gray-500'>
                  Date: <span>{new Date(item.date).toDateString()}</span>
                </p>
                <p className='text-xs text-gray-500'>
                  Payment: <span>{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            <div className='md:w-1/2 flex flex-col sm:flex-row items-center justify-between gap-4'>
              <div className='flex items-center gap-2'>
                <p className={`min-w-2 h-2 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-orange-400'}`}></p>
                <p className='text-sm font-medium'>{item.status}</p>
              </div>

              <div className="flex gap-2">
                <button onClick={getAllOrdersData} className='border px-4 py-2 text-xs font-medium rounded-sm hover:bg-gray-50'>
                  Track Order
                </button>

                {/* --- NEW: Conditional Cancel Button --- */}
                {item.status === "Order Placed" ? (
                  <button
                    onClick={() => cancelOrder(item.orderId)}
                    className='border border-red-200 px-4 py-2 text-xs font-medium rounded-sm text-red-500 hover:bg-red-50'
                  >
                    Cancel
                  </button>
                ) : (
                  <button disabled className='border border-gray-100 px-4 py-2 text-xs font-medium rounded-sm text-gray-300 cursor-not-allowed'>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Orders;