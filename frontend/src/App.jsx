import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Home from "./pages/Home.jsx";
import CreateEditShop from "./pages/CreateEditShop.jsx";
import useCurrentUser from "./hooks/useCurrentUser.jsx";
import useFetchCity from "./hooks/useFetchCity.jsx";
import useFetchShop from "./hooks/useFetchShop.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import AddItem from "./pages/AddItem.jsx";

const App = () => {
  useCurrentUser();
  useFetchCity();
  useFetchShop();

  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/forgot" element={<ForgotPassword />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/create-edit-shop" element={<CreateEditShop />} />
          <Route path="/add-item" element={<AddItem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
