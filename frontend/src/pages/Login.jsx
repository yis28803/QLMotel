import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../api/";

const Login = () => {
  const [loginError, setLoginError] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/github';
  };

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("persist:hotelmanagement/user");
    if (accessToken) {
      const userData = JSON.parse(accessToken);
      if (userData && userData.token) {
        navigate("/");
      }
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await apiLogin(data);

      if (response === undefined) {
        setLoginError(true);
        return;
      }

      if (response.access_token !== undefined) {
        let localStorageData = window.localStorage.getItem(
          "persist:hotelmanagement/user"
        );
        localStorageData = JSON.parse(localStorageData);
        if (!localStorageData) localStorageData = {};
        localStorageData.token = JSON.stringify(response.access_token);
        window.localStorage.setItem(
          "persist:hotelmanagement/user",
          JSON.stringify(localStorageData)
        );
        setLoginError(false);
        navigate("/", { state: { fullName: response.fullName } });
      } else {
        console.log("Login failed");
        setLoginError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-lg shadow-lg bg-white">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Đăng nhập</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="username" className="text-sm font-bold text-gray-600 block">Tên đăng nhập</label>
            <input {...register("username", { required: true })} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" type="text" placeholder="Tên đăng nhập" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-bold text-gray-600 block">Mật khẩu</label>
            <input {...register("password", { required: true })} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" type="password" placeholder="Mật khẩu" />
          </div>
          {loginError && <div className="text-sm text-red-500 text-center">Mật khẩu/tài khoản không đúng, vui lòng nhập lại</div>}
          <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Đăng nhập</button>
          <div className="flex flex-col gap-2 mt-4">
            <button onClick={handleGoogleLogin} className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700">Đăng nhập với Google</button>
            <button onClick={handleGitHubLogin} className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus:bg-gray-900">Đăng nhập với GitHub</button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Bạn chưa có tài khoản?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">Đăng ký ngay</a>
        </p>
      </div>
    </div>
  );
};
export default Login;
