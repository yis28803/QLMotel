import axios from "../config/axios";

export const apiRegister = async (body) => {
  const data = await axios({
    url: "auth/register",
    method: "post",
    data: body,
  });
  console.log(data);
  return data;
};

export const apiLogin = async (body) => {
  const data = await axios({
    url: "auth/authenticate",
    method: "post",
    data: body,
  });
  return data;
};

export const apiLoginAdmin = async (body) => {
  const data = await axios({
    url: "auth/admin",
    method: "post",
    data: body,
  });
  return data;
};

export const apiGetName = async (token) => {
  const data = await axios({
    url: "users/name",
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      access_token: token,
    },
    access_token: token,
  });
  return data;
};

export const apiGetUser = async (token) => {
  const data = await axios({
    url: "users/me",
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      access_token: token,
    },
  });
  return data;
};

export const apiGetRooms = async () => {
  const data = await axios({
    url: "rooms",
    method: "get",
  });
  return data;
};

export const apiGetRoomTypes = async () => {
  const data = await axios({
    url: "roomtypes",
    method: "get",
  });
  return data;
};
