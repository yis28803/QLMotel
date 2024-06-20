import React, { useState, useEffect } from "react";
import { apiGetAllServices } from "../../api";

const LineComponent = ({ service, onEdit, onDelete }) => {
  const { serviceId, serviceName, serviceType, availability, price, schedule, location, serviceImage, termsAndConditions, quantity } = service;

  return (
    <div className='border border-gray-200 rounded-lg shadow-md p-4 mb-4'>
      <div className='flex flex-col md:flex-row'>
        <img src={serviceImage} alt={serviceName} className="w-full md:w-1/3 object-cover rounded-md mb-4 md:mb-0 md:mr-4" />
        <div className='flex flex-col justify-between w-full'>
          <div>
            <h3 className='text-xl font-bold mb-2'>{serviceName}</h3>
            <p className='text-sm text-gray-600 mb-1'>ID: {serviceId}</p>
            <p className='text-sm text-gray-600 mb-1'>Loại: {serviceType.serviceTypeName || serviceType}</p>
            <p className='text-sm text-gray-600 mb-1'>Tình trạng: {availability ? 'Có sẵn' : 'Hết'}</p>
            <p className='text-sm text-gray-600 mb-1'>Thời gian phục vụ: {schedule}</p>
            <p className='text-sm text-gray-600 mb-1'>Địa điểm phục vụ: {location}</p>
            <p className='text-sm text-gray-600 mb-1'>Điều khoản bắt buộc: {termsAndConditions}</p>
            <p className='text-sm text-gray-600 mb-1'>Số lượng hiện có: {quantity}</p>
          </div>
          <div className='flex justify-between items-center mt-4'>
            <p className='text-lg font-semibold'>Price: {price} VNĐ</p>
            <div className='flex space-x-2'>
              <button onClick={() => onEdit(service)} className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded transition duration-200'>
                Edit
              </button>
              <button onClick={() => onDelete(serviceId)} className='bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition duration-200'>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Service = () => {
  const [services, setServices] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("persist:hotelmanagement/user");
    if (!accessToken) return;
    const token = JSON.parse(accessToken).token;

    const fetchServices = async () => {
      const response = await apiGetAllServices(token);
      if (Array.isArray(response)) {
        setServices(response);
      } else {
        console.log('Error fetching services', response);
      }
    }

    fetchServices();
  }, []);

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleEdit = (id) => {
    console.log(`Editing service with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting service with ID: ${id}`);
  };

  const handleAdd = (newService) => {
    setServices([...services, { ...newService, serviceId: Date.now() }]);
  };

  const [editingService, setEditingService] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditClick = (service) => {
    setEditingService(service);
    setShowEditForm(true);
  };

  const handleUpdate = (updatedService) => {
    setServices(services.map(s => s.serviceId === updatedService.serviceId ? updatedService : s));
    setShowEditForm(false);
  };

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-3xl font-bold text-center mb-6 mt-4'>Services</h1>
      <div className='flex justify-end mb-4'>
        <button onClick={toggleAddForm} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200'>
          {showAddForm ? 'Close Form' : 'Add New Service'}
        </button>
      </div>
      {showAddForm && <AddServiceForm onAdd={handleAdd} onClose={() => setShowAddForm(false)} />}
      {showEditForm && editingService && <EditServiceForm service={editingService} onUpdate={handleUpdate} onClose={() => setShowEditForm(false)} />}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {services.map((service) => (
          <LineComponent key={service.serviceId} service={service} onEdit={handleEditClick} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

const AddServiceForm = ({ onAdd, onClose }) => {
  const [newService, setNewService] = React.useState({
    serviceName: "",
    serviceType: "",
    availability: true,
    price: "",
    schedule: "",
    location: "",
    serviceImage: "",
    termsAndConditions: "",
    quantity: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewService({
      ...newService,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newService);
    setNewService({
      serviceName: "",
      serviceType: "",
      availability: true,
      price: "",
      schedule: "",
      location: "",
      serviceImage: "",
      termsAndConditions: "",
      quantity: 0,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
        <button onClick={onClose} className="float-right text-xl font-bold">&times;</button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 border border-gray-200 rounded-lg shadow-md">
          <input
            type="text"
            name="serviceName"
            value={newService.serviceName}
            onChange={handleChange}
            placeholder="Service Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="serviceType"
            value={newService.serviceType}
            onChange={handleChange}
            placeholder="Service Type"
            className="p-2 border rounded"
          />
          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              name="availability"
              checked={newService.availability}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            /><span className="ml-2 text-gray-700">Availability</span>
          </label>
          <input
            type="number"
            name="price"
            value={newService.price}
            onChange={handleChange}
            placeholder="Price"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="schedule"
            value={newService.schedule}
            onChange={handleChange}
            placeholder="Schedule"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="location"
            onChange={handleChange}
            value={newService.location}
            placeholder="Location"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="serviceImage"
            value={newService.serviceImage}
            onChange={handleChange}
            placeholder="Service Image URL"
            className="p-2 border rounded"
          />
          <textarea
            name="termsAndConditions"
            value={newService.termsAndConditions}
            onChange={handleChange}
            placeholder="Terms and Conditions"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="quantity"
            value={newService.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-200">
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
};

const EditServiceForm = ({ service, onUpdate, onClose }) => {
  const [updatedService, setUpdatedService] = React.useState({ ...service });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedService({
      ...updatedService,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedService);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
        <button onClick={onClose} className="float-right text-xl font-bold">&times;</button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 border border-gray-200 rounded-lg shadow-md">
          <input
            type="text"
            name="serviceName"
            value={updatedService.serviceName}
            onChange={handleChange}
            placeholder="Service Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="serviceType"
            value={updatedService.serviceType.serviceTypeName || updatedService.serviceType}
            onChange={handleChange}
            placeholder="Service Type"
            className="p-2 border rounded"
          />
          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              name="availability"
              checked={updatedService.availability}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            /><span className="ml-2 text-gray-700">Availability</span>
          </label>
          <input
            type="number"
            name="price"
            value={updatedService.price}
            onChange={handleChange}
            placeholder="Price"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="schedule"
            value={updatedService.schedule}
            onChange={handleChange}
            placeholder="Schedule"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="location"
            value={updatedService.location}
            onChange={handleChange}
            placeholder="Location"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="serviceImage"
            value={updatedService.serviceImage}
            onChange={handleChange}
            placeholder="Service Image URL"
            className="p-2 border rounded"
          />
          <textarea
            name="termsAndConditions"
            value={updatedService.termsAndConditions}
            onChange={handleChange}
            placeholder="Terms and Conditions"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="quantity"
            value={updatedService.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-200">
            Update Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default Service;
