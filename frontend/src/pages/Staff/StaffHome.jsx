import React, { useState, useEffect } from "react";
import { apiGetUser } from "../../api/user";

const StaffHome = () => {
  const [userName, setUserName] = useState({});

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("persist:hotelmanagement/user")).token.slice(1, -1);
    const token = accessToken;

    const getUserAccount = async () => {
      const response = await apiGetUser(token);
      console.log(response);
      if (response) {
        setUserName(response);
      }
    };

    getUserAccount();

  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Staff Home</h1>
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Welcome <span className="font-bold">{userName.name}</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">
              <span className="font-bold">Username:</span> {userName.username}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Email:</span> {userName.email}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Phone Number:</span> {userName.phoneNumber}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-bold">Role:</span> {userName.role}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Address:</span> {userName.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffHome;
