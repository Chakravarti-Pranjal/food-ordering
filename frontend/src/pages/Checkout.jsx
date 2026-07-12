import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaLocationDot, FaMoneyBill } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { BiCurrentLocation } from "react-icons/bi";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { setCurrentAddress, setLocation } from "../redux/slices/mapSlice";
import axios from "axios";
import { MdDeliveryDining } from "react-icons/md";
import { FaMoneyCheck } from "react-icons/fa";
import { baseUrl, notifyError, notifySuccess } from "../config/config";


function RecenterMap({ location }) {
  if(location.lat && location.lon) {
    const map = useMap();
    map.setView([location.lat, location.lon], 16, {
      animate: true,
    });
  }
  return null;
}


const Checkout = () => {
  const navigate = useNavigate();
  const {location, currentAddress} = useSelector((state) => state.map);
  const { cartItems, totalAmout } = useSelector((state) => state.user);

  const [searchLocation, setSearchLocation] = useState(currentAddress || "");
const [paymentMethod, setPaymentMethod] = useState("cod");

  const dispatch = useDispatch();

   const apiKey = import.meta.env.VITE_GEOAPI_KEY;

   const deliveryFee = totalAmout > 500 ? 0 : 40;
   const totalPayable = totalAmout + deliveryFee;

  useEffect(() => {
    setSearchLocation(currentAddress || "");
  }, [currentAddress]);

  const onDragEnd = (e) => {
    const { lat, lng } = e.target._latlng;
   dispatch(setLocation({lat: lat, lon: lng}));
   getAddress(lat,lng);
  }

  const getAddress = async (lat, lon) => {
    try{
      const { data } = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${apiKey}`
      );
      console.log(data?.results[0]?.formatted)
      dispatch(setCurrentAddress(data?.results[0]?.formatted));
    }catch(error) {
      console.error("Error fetching address:", error);
    }
  }

  const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(setLocation({ lat: latitude, lon: longitude }));
          getAddress(latitude, longitude);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
  };

  const getLatingByAddress = async () => {
    try {
      const result = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(searchLocation)}&apiKey=${apiKey}`)
      console.log(result?.data?.features[0]?.properties?.lat, result?.data?.features[0]?.properties?.lon);
      const {lat, lon} = result?.data?.features[0]?.properties;
      dispatch(setLocation({lat, lon}));
    } catch (error) {
      console.error("Error fetching location by address:", error);
    }
  }


  const handlePlaceOrder = async () => {
    try {
      const { data } = await axios.post(`${baseUrl}/order/place-order`, {
        cartItem: cartItems,
        paymentMethod,
        deliveryAddress: {
          text: searchLocation,
          latitude: location.lat,
          longitude: location.lon
        },
        totalAmount: totalPayable
      }, { withCredentials: true });

      console.log(data);
      if(data.success){
        notifySuccess("Order placed successfully!");
        navigate("/order-placed");
      }else{
        notifyError(data.message || "Failed to place order!");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };


  return (
    <div className="min-h-screen bg-[#fff9f6]  w-full">
     <div className="p-6 max-w-6xl mx-auto">
         <div
        className="flex items-center justify-between gap-6"
      >
        {/* Back Button */}
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <FaArrowCircleLeft size={35} className="text-[#ff4d2d]" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>

        <div></div>
      </div>

      <section className="my-8">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800"> <FaLocationDot /> Delivery Location</h2>
        <div className="flex gap-2 mb-3">
          <input type="text"
           className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]" placeholder="Enter your delivery address"
           value={searchLocation}
           onChange={(e) => setSearchLocation(e.target.value)}
          /> 
          <button className="bg-[#ff4d2d] text-white px-4 py-2 rounded-lg hover:bg-[#e64528] transition duration-300" onClick={getLatingByAddress}><IoSearch />
</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-[#e0e0e0] transition duration-300" onClick={getCurrentLocation}>
            <BiCurrentLocation />
          </button>
        </div>

        <div className="rounded-xl overflow-hidden border">
          <div className="h-64 w-full flex items-center justify-center">
            <MapContainer className="h-full w-full" center={[location?.lat, location?.lon]} zoom={13} scrollWheelZoom={false}>
              <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
              <RecenterMap location={location} />
            <Marker position={[location?.lat, location?.lon]} draggable eventHandlers={{dragend: onDragEnd}} />
            </MapContainer>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Payment Method</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={`flex items-center gap-3 rounded-xl border p-4 text-left trasition cursor-pointer ${paymentMethod === "cod" ? "border-[#ff4d2d] bg-orange-50 text-white" : "border-gray-300"}`} onClick={() => setPaymentMethod("cod")}>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <MdDeliveryDining className="text-green-600 text-xl" />
            </span>
            <div>
              <p className="font-medium text-gray-800">Cash on Delivery</p>
              <p className="text-sm text-gray-500">Pay when your order is delivered.</p>
            </div>
          </div>
        <div className={`flex items-center gap-3 rounded-xl border p-4 text-left trasition cursor-pointer ${paymentMethod === "online" ? "border-[#ff4d2d] bg-orange-50 text-white" : "border-gray-300"}`} onClick={() => setPaymentMethod("online")}>
             <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
              <FaMoneyCheck className="text-purple-600 text-xl" />
            </span>
            <div>
              <p className="font-medium text-gray-800">UPI / Credit / Debit Card</p>
              <p className="text-sm text-gray-500">Pay securely online.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold my-4 text-gray-800">Order Summary</h2>
        <div className="rounded-xl border bg-gray-50 p-4 space-y-3">
          {cartItems.map((item, index) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">{item.name} x {item.quantity}</p>
              </div>
              <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
            </div>
          ))}
          <hr className="border-gray-200 my-2" />
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-800">Subtotal</span>
            <span className="font-bold text-gray-900">₹{totalAmout}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-800">Delivery Fee</span>
            <span className="font-bold text-gray-900">₹{deliveryFee}</span>
          </div>
          <hr className="border-gray-200 my-2" />
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900">Total Payable</span>
            <span className="font-bold text-lg text-[#ff4d2d]">₹{totalPayable}</span>
          </div>
        </div>
      </section>

      <button className="w-full bg-[#ff4d2d] text-white py-3 rounded-xl font-semibold hover:bg-[#ff4d2d]/90 transition mt-3" onClick={handlePlaceOrder}>
        {paymentMethod === "cod" ? "Place Order" : "Proceed to Pay"}
      </button>

     </div>
    </div>
  );
};

export default Checkout;
