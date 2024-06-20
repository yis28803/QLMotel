import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import {
  apiGetAllRooms,
  apiGetAllRoomTypes,
  apiCreateRoom,
  apiUpdateRoom,
  apiDeleteRoom,
} from "../../api/room";

const HotelRoomCard = ({ room, onEdit, onDelete }) => {
  const {
    roomId,
    roomName,
    roomType,
    status,
    roomImageId,
    cleaningStatus,
    features,
  } = room;

  const {
    roomTypeId,
    roomTypeName,
    description,
    capacity,
    basePrice,
  } = roomType;

  return (
    <div
      className={`bg-violet-50 p-4 rounded-lg shadow-md border ${status === "Booked" ? "border-red-500" : "border-green-500"
        }`}
    >
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>{roomName}</h2>
        <button
          className='text-blue-500 hover:underline focus:outline-none'
          onClick={() => onEdit(room)}
        >
          Edit
        </button>
        <button
          className='text-red-500 hover:underline focus:outline-none'
          onClick={() => onDelete(roomId)}
        >
          Delete
        </button>
      </div>
      <img
        src={
          "https://plus.unsplash.com/premium_photo-1675615667752-2ccda7042e7e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJvb21zfGVufDB8fDB8fHww"
        }
        alt={`Room ${roomId}`}
        className='w-full h-64 object-cover mb-4 rounded-md shadow-md'
      />
      <div className='flex flex-col space-y-2'>
        <p className='text-sm text-gray-600'>
          <strong>Room ID:</strong> {roomId || "N/A"}
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Room Type:</strong> {roomTypeName || "N/A"}
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Description:</strong> {description || "N/A"}
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Capacity:</strong> {capacity || "N/A"} person(s)
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Base Price:</strong> ${basePrice || "N/A"}
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Status:</strong> {status || "N/A"}
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Cleaning Status:</strong> {cleaningStatus || "N/A"}
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Features:</strong> {features ? features.join(", ") : "N/A"}
        </p>
      </div>
    </div>
  );
};

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoomData, setNewRoomData] = useState({
    roomName: "",
    roomType: {
      roomTypeId: "",
      roomTypeName: "",
      description: "",
      capacity: 0,
      basePrice: 0,
    },
    status: "",
    cleaningStatus: "",
    features: [],
    description: "",
  });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await apiGetAllRooms();
        setRooms(response);
        setFilteredRooms(response);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    const fetchRoomTypes = async () => {
      try {
        const response = await apiGetAllRoomTypes();
        setRoomTypes(response);
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
    };

    fetchRooms();
    fetchRoomTypes();
  }, []);

  useEffect(() => {
    if (selectedFilter) {
      const filtered = rooms.filter(
        (room) =>
          room.roomType.roomTypeName.toLowerCase() ===
          selectedFilter.toLowerCase()
      );
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms(rooms);
    }
  }, [selectedFilter, rooms]);

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      const accessToken = JSON.parse(
        localStorage.getItem("persist:hotelmanagement/user")
      ).token.slice(1, -1);
      const token = accessToken;

      await apiCreateRoom(newRoomData, token);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  const handleEditRoom = (room) => {
    const { roomId, roomName, description, status, cleaningStatus, features } = room;

    // Lấy thông tin cần thiết và set vào state newRoomData
    setNewRoomData({
      ...newRoomData,
      roomId,
      roomName,
      description,
      status,
      cleaningStatus,
      features: features.join(", "),
    });

    setIsModalOpen(true);
  };

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    try {
      const accessToken = JSON.parse(
        localStorage.getItem("persist:hotelmanagement/user")
      ).token.slice(1, -1);
      const token = accessToken;

      const { roomId, ...updateData } = newRoomData;

      await apiUpdateRoom(roomId, updateData, token);
      setIsModalOpen(false);

      // Cập nhật state hoặc tải lại dữ liệu nếu cần
      // Ví dụ: fetchData();
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await apiDeleteRoom(roomId);
      setRooms((prevRooms) =>
        prevRooms.filter((room) => room.roomId !== roomId)
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "roomType") {
      const selectedRoomType = roomTypes.find(
        (roomType) => roomType.roomTypeId === value
      );

      if (selectedRoomType) {
        setNewRoomData((prevData) => ({
          ...prevData,
          roomType: {
            roomTypeId: selectedRoomType.roomTypeId,
            roomTypeName: selectedRoomType.roomTypeName,
            description: selectedRoomType.description,
            capacity: selectedRoomType.capacity,
            basePrice: selectedType.basePrice,
          },
        }));
      } else {
        setNewRoomData((prevData) => ({
          ...prevData,
          roomType: {
            roomTypeId: value,
            roomTypeName: "", // Bạn có thể muốn đặt giá trị mặc định là ""
            description: "",
            capacity: 0,
            basePrice: 0,
          },
        }));
      }
    } else if (name === "features") {
      const featuresArray = value.split(",").map((feature) => feature.trim());

      setNewRoomData((prevData) => ({ ...prevData, [name]: featuresArray }));
    } else {
      setNewRoomData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  return (
    <div className='mx-8 mt-4'>
      <h1 className='text-3xl font-bold mb-4'>Rooms</h1>

      <div className='mb-4'>
        <label htmlFor='roomType' className='block text-sm font-medium text-gray-600'>
          Room Type
        </label>
        <select
          id='roomType'
          name='roomType'
          value={selectedFilter || ""}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          required
        >
          <option value="" disabled>Select Room Type</option>
          {roomTypes.map((roomType) => (
            <option key={roomType.roomTypeId} value={roomType.roomTypeName}>
              {roomType.roomTypeName}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300'
      >
        Add New Room
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel='Add New Room'
        className='rounded-lg shadow-xl p-8 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-96' // Adjust the width as needed
        overlayClassName='fixed top-0 left-0 w-full h-full bg-gray-500' // Remove opacity class
      >
        <h2 className='text-2xl font-semibold mb-6 text-center text-gray-800'>
          {newRoomData.roomName ? "Edit Room" : "Add New Room"}
        </h2>

        <form onSubmit={newRoomData.roomName ? handleUpdateRoom : handleAddRoom}>
          <div className='space-y-4 mb-6'>
            <div>
              <label htmlFor='roomName' className='block text-sm font-medium text-gray-600'>
                Room Name
              </label>
              <input
                type='text'
                id='roomName'
                name='roomName'
                value={newRoomData.roomName}
                onChange={handleFormChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>

            <div>
              <label htmlFor='roomType' className='block text-sm font-medium text-gray-600'>
                Room Type
              </label>
              <select
                id='roomType'
                name='roomType'
                value={newRoomData.roomType.roomTypeName}
                onChange={handleFormChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              >
                {roomTypes.map((roomType) => (
                  <option key={roomType.roomTypeId} value={roomType.roomTypeName}>
                    {roomType.roomTypeName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor='description' className='block text-sm font-medium text-gray-600'>
                Description
              </label>
              <input
                type='text'
                id='description'
                name='description'
                value={newRoomData.description}
                onChange={handleFormChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label htmlFor='status' className='block text-sm font-medium text-gray-600'>
                Status
              </label>
              <input
                type='text'
                id='status'
                name='status'
                value={newRoomData.status}
                onChange={handleFormChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label htmlFor='cleaningStatus' className='block text-sm font-medium text-gray-600'>
                Cleaning Status
              </label>
              <input
                type='text'
                id='cleaningStatus'
                name='cleaningStatus'
                value={newRoomData.cleaningStatus}
                onChange={handleFormChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label htmlFor='features' className='block text-sm font-medium text-gray-600'>
                Features
              </label>
              <input
                type='text'
                id='features'
                name='features'
                value={newRoomData.features}
                onChange={handleFormChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          <div className='flex justify-between'>
            <button
              type='button'
              onClick={() => setIsModalOpen(false)}
              className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-300'
            >
              Cancel
            </button>

            <button
              type='submit'
              className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300'
            >
              {newRoomData.roomName ? "Save Changes" : "Add Room"}
            </button>
          </div>
        </form>
      </Modal>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
        {filteredRooms.map((room) => (
          <div key={room.roomId}>
            <HotelRoomCard
              room={room}
              onEdit={handleEditRoom}
              onDelete={handleDeleteRoom}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
