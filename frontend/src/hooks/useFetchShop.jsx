import axios from "axios";
import { useEffect } from "react";
import { baseUrl } from "../config/config";
import { useDispatch } from "react-redux";
import { setShopData } from "../redux/slices/ownerSlice";

const useFetchShop = () => {
  const dispatch = useDispatch();

  const fetchShop = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/shop/my`, {
        withCredentials: true,
      });
      console.log("Shop", data);
      dispatch(setShopData(data?.data));
    } catch (error) {
      console.log("Fetch Shop Error:", error);
    }
  };

  useEffect(() => {
    fetchShop();
  }, [dispatch]);

  return { refetchShop: fetchShop };
};

export default useFetchShop;
