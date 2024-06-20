import React, { useState, useEffect } from 'react';
import { apiGetMyBookingRoom } from '../api/room';
import { useNavigate } from 'react-router-dom';

const MyBookingRoom = () => {
    const [currentBooking, setCurrentBooking] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const navigate = useNavigate();

    const navigateToServicePage = (bookingId) => {
        navigate(`/service-booking/${bookingId}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGetMyBookingRoom();
                setCurrentBooking(response);
                setIsDataLoaded(true);
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        };

        fetchData();
    }, [setCurrentBooking, setIsDataLoaded]);

    if (!isDataLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-center text-3xl font-bold mb-8">Các phòng đã đặt</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentBooking && Array.isArray(currentBooking) && currentBooking.map((booking) => (
                    <div key={booking.booking_id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                        <h2 className="text-center text-xl font-semibold mb-4">Booking ID: {booking.booking_id}</h2>
                        <p className="mb-2"><strong>Ngày nhận phòng:</strong> {booking.start_date}</p>
                        <p className="mb-2"><strong>Ngày trả phòng:</strong> {booking.end_date}</p>
                        <p className="mb-2"><strong>Tổng tiền (triệu đồng):</strong> {booking.total_price}</p>
                        <p className="mb-2"><strong>Trạng thái:</strong> {booking.status}</p>
                        {booking.special_requests && <p><strong>Yêu cầu đặc biệt:</strong> {booking.special_requests}</p>}
                        {booking.status === 'Check-in' && (
                            <button
                                className="mt-4 bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                                onClick={() => navigateToServicePage(booking.booking_id)}>
                                Book Service
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

};

export default MyBookingRoom;
