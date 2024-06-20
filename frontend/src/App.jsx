import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

import PublicLayout from "./layouts/PublicLayout";
import {
  Home,
  About,
  Service,
  Profile,
  RoomDetail,
  Login,
  Signup,
  MyBookingRoom
} from "./pages";
import Rooms from "./pages/Rooms";

import AdminLayout from "./layouts/AdminLayout";

import {
  RoomManagement,
  StaffManagement,
  HotelStatistics,
  ServiceManagement,
} from "./pages/Admin";

import StaffLayout from "./layouts/StaffLayout";
import { StaffHome, StaffRoom, StaffService } from "./pages/Staff";

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);

  window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");

    if (accessToken) {
      let localStorageData = window.localStorage.getItem(
        "persist:hotelmanagement/user"
      );
      localStorageData = JSON.parse(localStorageData);
      if (!localStorageData) localStorageData = {};
      localStorageData.token = JSON.stringify(accessToken);
      window.localStorage.setItem(
        "persist:hotelmanagement/user",
        JSON.stringify(localStorageData)
      );
      window.location.href = "/";
    }
  };
  return (
      <div>
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <TailSpin
              type="TailSpin"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={500}
            />
          </div>
        )}

        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/myrooms" element={<MyBookingRoom />} />
            <Route path="/service-booking/:booking_id" element={<Service />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<HotelStatistics />} />
            <Route path="/admin/staffs" element={<StaffManagement />} />
            <Route path="/admin/rooms" element={<RoomManagement />} />
            <Route path="/admin/services" element={<ServiceManagement />} />
          </Route>
          <Route element={<StaffLayout />}>
            <Route path="/staff" element={<StaffHome />} />
            <Route path="/staff/rooms" element={<StaffRoom />} />
            <Route path="/staff/services" element={<StaffService />} />
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
  );
}
