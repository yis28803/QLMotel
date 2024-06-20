import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const ServiceItem = ({ service, onQuantityChange, initialQuantity }) => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
      setCount(prevCount => prevCount + 1);
  };

  const decreaseCount = () => {
      setCount(prevCount => prevCount - 1);
  };

  useEffect(() => {
    if (count !== service.quantity) {
      onQuantityChange(service, count);
    }
  }, [count, service, onQuantityChange]);

  return (
    <div className="flex justify-between items-center border-b border-gray-200 py-4">
      <div className="flex gap-4">
        <div>
          <img src={service.serviceImage || "/images/home01.png"} alt={service.serviceName} className="w-20 h-16 object-cover" />
          <div className="flex items-center gap-1 mt-1 justify-center">
            <FontAwesomeIcon icon={faCircleInfo} color="#2E97A7" />
            <p>Chi tiết</p>
          </div>
        </div>
        <div className="text-lg">
          <p>{service.serviceName}</p>
          <p>Thời gian: {service.schedule}</p>
          <p>Địa điểm: {service.location}</p>
        </div>
      </div>
      <div className="text-lg">
        <p className="text-main text-end mr-2">{service.price.toLocaleString()} đ</p>
        <div className="flex border items-center bg-white rounded-2xl mt-4">
          <button className="py-2 px-5 text-xl" disabled={count === 0} onClick={decreaseCount}>-</button>
          <p className="border-x px-6 py-2 text-xl">{count}</p>
          <button className="py-2 px-4 text-xl" onClick={increaseCount}>+</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
