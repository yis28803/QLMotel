import axios from "../config/axios";

export const apiGetAllRooms = async () => {
  const data = await axios({
    url: "rooms",
    method: "get",
  });

  return data;
};
export const apiGetRoom = async (id) => {
  const data = await axios({
    url: "rooms/" + id,
    method: "get",
  });
  console.log(data);
  return data;
};

export const apiGetAllRoomTypes = async () => {
  const data = await axios({
    url: "roomtypes",
    method: "get",
  });

  return data;
};

export const apiCreateRoom = async (body, token) => {
  console;
  const data = await axios({
    url: "rooms/add",
    method: "post",
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const apiUpdateRoom = async (id, body, token) => {
  console.log(id);
  const data = await axios({
    url: `rooms/${id}`,
    method: "put",
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const apiDeleteRoom = async (id) => {
  const data = await axios({
    url: `rooms/${id}`,
    method: "delete",
  });

  return data;
};

export const apiBookingRoom = async (body, token) => {
  console.log(body);
  const data = await axios({
    url: "booking/create",
    method: "post",
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const apiGetMyBookingRoom = async (token) => {
  const data = await axios({
    url: "booking/getBookingByUser",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(data);
  return data;
}