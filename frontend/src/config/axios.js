import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Access-Control-Allow-Origin": "*" },
});

instance.interceptors.request.use(
  function (config) {
    let localStorageData = window.localStorage.getItem(
      "persist:hotelmanagement/user"
    );
    if (localStorageData && typeof localStorageData === "string") {
      localStorageData = JSON.parse(localStorageData);
      const token = JSON.parse(localStorageData?.token);
      if (token) config.headers = { Authorization: `Bearer ${token}` };
      return config;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    const originalRequest = error.config;
    //if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   return instance.put("user/refresh-access-token").then((res) => {
    //     if (res.message === "Success") {
    //       let localStorageData = window.localStorage.getItem(
    //         "persist:sneaker/user"
    //       );
    //       localStorageData = JSON.parse(localStorageData);
    //       localStorageData.token = JSON.stringify(res.data.accessToken);
    //       window.localStorage.setItem(
    //         "persist:sneaker/user",
    //         JSON.stringify(localStorageData)
    //       );
    //       return instance(originalRequest);
    //     } else {
    //       return res;
    //     }
    //   });
    //} else return error.response.data;
  }
);

export default instance;
