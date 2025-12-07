import axios from "axios";
import { useEffect } from "react";
import { baseUrl } from "../config/config";
import { useDispatch, useSelector } from "react-redux";
import { setShopInCity } from "../redux/slices/userSlice";

const useFetchShopByCity = () => {
  const dispatch = useDispatch();
  const { city } = useSelector((state) => state.user);
  const fetchShopInCity = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/shop/${city}`, {
        withCredentials: true,
      });
      console.log("ShopsByCity", data);
      dispatch(setShopInCity(data?.data));
    } catch (error) {
      console.log("Fetch Shop By city Error:", error);
    }
  };

  useEffect(() => {
    if (city) fetchShopInCity();
  }, [city]);

  return { refetchShopInCity: fetchShopInCity };
};

export default useFetchShopByCity;
