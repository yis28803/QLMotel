import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ServiceItem from "../components/ServiceItem";

const Service = () => {
  const { booking_id } = useParams();
  const [services, setServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showSelectServiceModal, setShowSelectServiceModal] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    if (booking_id) {
      axios.get(`http://localhost:8080/api/v1/roomservice/${booking_id}`, { headers })
        .then(response => {
          setServices(response.data);
          const total = response.data.reduce((acc, service) => acc + service.price * (service.quantity || 0), 0);
          setTotalPrice(total);
        })
        .catch(error => console.error('Error fetching services:', error));
    }
  }, [booking_id]);

  const handleQuantityChange = (service, quantity) => {
    setServices(currentServices =>
      currentServices.map(s =>
        s.serviceId === service.serviceId ? { ...s, quantity } : s
      )
    );
  };

  useEffect(() => {
    const total = services.reduce((acc, service) => acc + service.price * (service.quantity || 0), 0);
    setTotalPrice(total);
  }, [services]);

  const handleBookServices = () => {
    const allQuantitiesZero = services.every(service => service.quantity === 0);

    if (allQuantitiesZero) {
      setShowSelectServiceModal(true);
      return;
    }

    const accessToken = localStorage.getItem("persist:hotelmanagement/user");
    if (!accessToken) return;
    const token = JSON.parse(accessToken).token.slice(1, -1);

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    services.forEach(service => {
      if (service.quantity > 0) {
        const data = {
          serviceId: service.serviceId,
          bookingId: parseInt(booking_id),
          price: service.price,
          quantity: service.quantity,
          totalPrice: service.price * service.quantity,
        };

        axios.post('http://localhost:8080/api/v1/bookservices', data, { headers })
          .then(response => {
            setShowModal(true);
          })
          .catch(error => {
            console.error('Error booking service:', error);
          });
      }
    });
  };

  const closeModal = () => {
    setShowModal(false);
    window.location.href = "/";
  };

  return (
    <div className="mx-auto max-w-[1000px] font-semibold my-10 ">
      <p className="text-main text-center text-2xl">Đặt dịch vụ</p>
      <p className="text-main text-xl mt-8">Danh sách dịch vụ</p>
      <div className="bg-[#f6f6f6] rounded-xl mt-4 px-4 py-6">
        {services.map((service, index) => (
          <div key={service.serviceId}>
            <ServiceItem service={service} onQuantityChange={handleQuantityChange} initialQuantity={service.quantity} />
            {index < services.length - 1 && <hr className="my-6 border-[#cccccc]" />}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-end mt-8">
        <p className="flex text-main text-2xl">
          Tổng tiền:&nbsp;<span className="font-bold">{totalPrice.toLocaleString()} đ</span>
        </p>
        <button onClick={handleBookServices} className="bg-main text-white mt-8 text-xl font-semibold py-3 px-5 rounded-md" >
          Đặt ngay nào!
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <p className="text-lg font-semibold">Hãy chờ nhân viên giao nhé!</p>
            <button onClick={closeModal} className="bg-main text-white mt-4 text-sm font-semibold py-2 px-4 rounded-md">
              Đóng
            </button>
          </div>
        </div>
      )}
      {showSelectServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <p className="text-lg font-semibold">Vui lòng chọn ít nhất một dịch vụ.</p>
            <button onClick={() => setShowSelectServiceModal(false)} className="bg-main text-white mt-4 text-sm font-semibold py-2 px-4 rounded-md">
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
