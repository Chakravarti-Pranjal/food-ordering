import axios from "axios";
import { useEffect } from "react";
import { baseUrl } from "../config/config";
import { useDispatch } from "react-redux";
import { setMyOrders } from "../redux/slices/userSlice";

const useGetMyOrder = () => {
  const dispatch = useDispatch();

  const fetchOrder = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/order/my-orders`, {
        withCredentials: true,
      });
      console.log("Orders", data);
      dispatch(setMyOrders(data?.data));
    } catch (error) {
      console.log("Fetch Order Error:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [dispatch]);

};

export default useGetMyOrder;
