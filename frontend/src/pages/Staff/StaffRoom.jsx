import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffRoom = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("All");
  const [searchPhoneNumber, setSearchPhoneNumber] = useState("");

  useEffect(() => {
    // Gọi API để lấy danh sách đặt phòng khi component được tải
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/booking/all');
        const updatedBookings = await Promise.all(response.data.map(async booking => {
          // Lấy thông tin số điện thoại từ API
          const phoneResponse = await axios.get(`http://localhost:8080/api/v1/users/phone/${booking.customer_id}`);
          return { ...booking, phoneNumber: phoneResponse.data };
        }));

        setBookings(updatedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []); // Chỉ gọi một lần khi component được tải lần đầu

  const handleStatusChange = (bookingId, newStatus) => {
    const updatedBookings = bookings.map(booking => {
      if (booking.booking_id === bookingId) {
        // Check if status change is allowed
        if (booking.status === 'Pending' && (newStatus === 'Check-in' || newStatus === 'Check-out')) {
          alert('Lỗi: Người dùng chưa chuyển khoản.');
          return booking;
        }

        if (booking.status === 'Cancel' && newStatus === 'Check-in') {
          alert('Người dùng đã hủy đơn đặt phòng này!');
          return booking;
        }
        return { ...booking, status: newStatus, isChanged: true };
      }
      return booking;
    });

    setBookings(updatedBookings);
  };

  const handleFilterChange = (selectedStatus) => {
    setFilteredStatus(selectedStatus);
  };

  const handleSearchChange = (e) => {
    setSearchPhoneNumber(e.target.value);
  };

  const handleSave = async () => {
    const changedBookings = bookings.filter(booking => booking.isChanged);

    if (changedBookings.length > 0) {
      try {
        const status = changedBookings[0].status;

        await Promise.all(changedBookings.map(booking =>
          axios.put(`http://localhost:8080/api/v1/booking/update/${status}`, { id: booking.booking_id })
        ));

        console.log("Changes saved successfully.");
      } catch (error) {
        console.error('Error updating bookings:', error);
      }
    } else {
      console.log("No changes to save.");
    }
  };

  const filteredBookings = filteredStatus === "All"
    ? bookings
    : bookings.filter(booking => booking.status === filteredStatus);

  const searchedBookings = searchPhoneNumber
    ? filteredBookings.filter(booking => booking.phoneNumber.includes(searchPhoneNumber))
    : filteredBookings;

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Booking List</h1>

      <select
        value={filteredStatus}
        onChange={(e) => handleFilterChange(e.target.value)}
        className="mb-4 p-2 border rounded-md"
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Cancel">Cancel</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Check-in">Check-in</option>
        <option value="Check-out">Check-out</option>
      </select>

      {/* Search input */}
      <input
        type="text"
        value={searchPhoneNumber}
        onChange={handleSearchChange}
        placeholder="Search by phone number"
        className="mb-4 p-2 border rounded-md"
      />

      <ul>
        {searchedBookings.map(booking => (
          <li
            key={booking.booking_id}
            className={`p-4 mb-4 rounded-md ${booking.status === 'Pending' ? 'bg-yellow-200' : 'bg-gray-100'}`}
          >
            <p><strong>Booking ID:</strong> {booking.booking_id}</p>
            <p><strong>Customer ID:</strong> {booking.customer_id}</p>
            <p><strong>Room ID:</strong> {booking.room_id}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <p><strong>Start Date:</strong> {booking.start_date}</p>
            <p><strong>End Date:</strong> {booking.end_date}</p>
            <p><strong>Total Price:</strong> ${booking.total_price}</p>
            <p><strong>Booking Date:</strong> {booking.booking_date}</p>
            <p><strong>Special Requests:</strong> {booking.special_requests}</p>
            <p><strong>Phone Number:</strong> {booking.phoneNumber}</p>

            <select
              value={booking.status}
              onChange={(e) => handleStatusChange(booking.booking_id, e.target.value)}
              className="mt-4 p-2 border rounded-md"
            >
              <option value="Pending">Pending</option>
              <option value="Cancel">Cancel</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Check-in">Check-in</option>
              <option value="Check-out">Check-out</option>
            </select>

            <button
              onClick={() => handleSave()}
              className="bg-blue-500 text-white py-2 px-4 mt-2 rounded-md"
            >
              Save Changes
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffRoom;
