import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setCity, setState } from "../redux/slices/userSlice";

function useFetchCity() {
  const dispatch = useDispatch();
  const apiKey = import.meta.env.VITE_GEOAPI_KEY;
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const { data } = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
        );

        console.log(data?.results[0]);
        dispatch(setCity(data?.results[0]?.city));
        dispatch(setState(data?.results[0]?.state));
        dispatch(setAddress(data?.results[0]?.formatted));
      });
    } catch (error) {
      console.log(error);
    }
  }, [userData]);
}

export default useFetchCity;
