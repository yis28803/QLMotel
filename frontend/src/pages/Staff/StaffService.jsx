import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffService = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/bookservices');
        const groupedBookings = groupBookingsBy(response.data);
        // Sort bookings by bookingDate
        const sortedBookings = groupedBookings.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
        setBookings(sortedBookings);
      } catch (error) {
        console.error('Error fetching book services:', error);
      }
    };

    fetchBookings();
  }, []);

  const groupBookingsBy = (data) => {
    const grouped = {};

    data.forEach(item => {
      const key = `${item.booking.bookingId}-${item.bookingDate}`;
      if (!grouped[key]) {
        grouped[key] = {
          bookingId: item.booking.bookingId,
          bookingDate: item.bookingDate,
          totalPrice: 0,
          status: item.status,
          items: [],
        };
      }
      grouped[key].items.push(item);
      grouped[key].totalPrice += item.totalPrice;
    });

    return Object.values(grouped);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(bookings.map(booking => {
      if (booking.bookingId === bookingId) {
        return { ...booking, status: newStatus };
      }
      return booking;
    }));
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold text-center mb-8">Service Bookings</h1>
      {bookings.map(booking => (
        <div
          key={booking.bookingId}
          className={`p-6 mb-6 rounded-lg shadow-lg ${booking.status === 'Done' ? 'bg-red-200' : 'bg-white'}`}
        >
          <h2 className="text-2xl font-semibold mb-2">Booking ID: {booking.bookingId}</h2>
          <p className="mb-2">Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
          <p className="mb-4 text-lg font-semibold">Total Price: {formatPrice(booking.totalPrice)}</p>

          <ul className="list-disc list-inside">
            {booking.items.map(item => (
              <li key={item.bookServiceId} className="mt-1">
                <span className="font-medium">{item.service.serviceName}</span> - Quantity: {item.quantity}
              </li>
            ))}
          </ul>

          {booking.status === 'Pending' ? (
            <select
              value={booking.status}
              onChange={(e) => handleStatusChange(booking.bookingId, e.target.value)}
              className="mt-4 p-2 border rounded-md cursor-pointer"
            >
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
          ) : (
            <p className="mt-4 text-lg">Status: <span className="font-semibold">{booking.status}</span></p>
          )}
        </div>
      ))}
    </div>
  );
}

export default StaffService;
