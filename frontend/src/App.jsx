import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import useCurrentUser from "./hooks/useCurrentUser.jsx";
import { useSelector } from "react-redux";
import Home from "./pages/Home.jsx";
import useFetchCity from "./hooks/useFetchCity.jsx";

const App = () => {
  useCurrentUser();
  useFetchCity();
  const { userData } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route
          path="/sign-up"
          element={!userData ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/sign-in"
          element={!userData ? <SignIn /> : <Navigate to="/" />}
        />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/sign-in" />}
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
