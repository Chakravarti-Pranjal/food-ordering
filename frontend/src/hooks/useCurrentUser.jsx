import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { baseUrl } from "../config/config";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/slices/userSlice";

const useCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/user/current`, {
          withCredentials: true,
        });
        console.log(data);
        dispatch(setUserData(data?.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);
};

export default useCurrentUser;
