import axios from "axios";
import { useEffect } from "react";
import { baseUrl } from "../config/config";
import { useDispatch, useSelector } from "react-redux";
import { setItemsInMyCity } from "../redux/slices/userSlice";

const useFetchItemsByCity = () => {
  const dispatch = useDispatch();
  const { city } = useSelector((state) => state.user);
  const fetchItemsByCity = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/item/by-city/${city}`, {
        withCredentials: true,
      });
      console.log("ShopsByCity", data);
      dispatch(setItemsInMyCity(data?.data));
    } catch (error) {
      console.log("Fetch Shop By city Error:", error);
    }
  };

  useEffect(() => {
    if (city) fetchItemsByCity();
  }, [city]);

  return { refetchItemsByCity: fetchItemsByCity };
};

export default useFetchItemsByCity;
