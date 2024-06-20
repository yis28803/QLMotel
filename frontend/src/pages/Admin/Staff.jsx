import { useState, useEffect } from "react";
import Modal from "react-modal";
import { apiCreateNewStaff, apiGetAllStaff, apiDeleteStaff, apiUpdateStaff } from "../../api";
import axios from "axios";
import btoa from 'btoa-lite';

Modal.setAppElement('#root');


const EmployeeTable = ({ employees, openModal, onDelete }) => {
  return (
    <table className='min-w-full bg-white border border-gray-300'>
      <thead>
        <tr>
          <th className='py-2 px-4 border-b border-r text-center'>ID</th>
          <th className='py-2 px-4 border-b border-r text-center'>Avatar</th>
          <th className='py-2 px-4 border-b border-r text-center'>Username</th>
          <th className='py-2 px-4 border-b border-r text-center'>Name</th>
          <th className='py-2 px-4 border-b border-r text-center'>Email</th>
          <th className='py-2 px-4 border-b border-r text-center'>Phone</th>
          <th className='py-2 px-4 border-b border-r text-center'>Address</th>
          <th className='py-2 px-4 border-b border-r text-center'>Birthday</th>
          <th className='py-2 px-4 border-b text-center'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td className='py-2 px-4 border-b border-r text-center'>{employee.userAccountId}</td>
            <td className='py-2 px-4 border-b border-r text-center'>
              <img src={employee.avatar || "https://via.placeholder.com/150"} alt={`Avatar of ${employee.name}`} className="w-8 h-8 rounded-full" />
            </td>
            <td className='py-2 px-4 border-b border-r text-center'>{employee.username}</td>
            <td className='py-2 px-4 border-b border-r text-center'>{employee.name}</td>
            <td className='py-2 px-4 border-b border-r text-center'>{employee.email}</td>
            <td className='py-2 px-4 border-b border-r text-center'>{employee.phoneNumber}</td>
            <td className='py-2 px-4 border-b border-r text-center'>{employee.address}</td>
            <td className='py-2 px-4 border-b border-r text-center'>{new Date(employee.birthDay).toLocaleDateString("en-US", {
              year: 'numeric', month: '2-digit', day: '2-digit'
            })}</td>
            <td className='py-2 px-4 border-b border-r text-center'>
              <div className='flex items-center justify-center'>
                <button
                  className='bg-red-500 text-white py-1 px-2 rounded mr-2'
                  onClick={() => onDelete(employee.userAccountId)}
                >
                  Delete
                </button>
                <div className='border-l pl-2'>
                  <button onClick={() => openModal(employee)} className='bg-blue-500 text-white py-1 px-2 rounded'>
                    Edit
                  </button>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Staff = () => {
  const [file, setFile] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ userAccountId: "", username: "", name: "", email: "", phoneNumber: "", address: "", birthDay: "", userImageId: "" });
  const [avatarUrls, setAvatarUrls] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem("persist:hotelmanagement/user");
    if (!accessToken) return;
    const token = JSON.parse(accessToken).token;

    const fetchEmployees = async () => {
      try {
        const response = await apiGetAllStaff(token);

        if (Array.isArray(response)) {
          setEmployees(response);
        } else {
          console.error('Expected an array, got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    }

    fetchEmployees();
  }, []);

  function openModal(employee) {
    setIsOpen(true);
    if (employee && employee.userAccountId) {
      setFormData({
        ...employee,
        birthDay: formatDate(employee.birthday),
      });
    } else {
      setFormData({ userAccountId: null, username: "", name: "", email: "", phoneNumber: "", address: "", birthDay: "", userImageId: "" });
    }
  }

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);
    closeModal();
  };

  function closeModal() {
    setIsOpen(false);
  }

  const onSave = async (updatedEmployee) => {
    if (updatedEmployee.userAccountId == null) {
      updatedEmployee.role = "STAFF";

      try {
        const accessToken = JSON.parse(localStorage.getItem("persist:hotelmanagement/user")).token.slice(1, -1);
        const token = accessToken;

        const response = await apiCreateNewStaff(updatedEmployee, token);

        if (response.status === 400) {
          alert("Username đã tồn tại");
          return;
        }

        // Nhận ID mới
        const newEmployeeId = response.userAccountId;
        const newEmployee = { ...updatedEmployee, id: newEmployeeId };

        // Kiểm tra và upload avatar nếu có
        if (file) {
          const avatarFormData = new FormData();
          avatarFormData.append('avatar', file);

          // Gửi avatar lên server
          const avatarResponse = await axios.post(`http://localhost:8080/api/v1/admin/upload/${newEmployeeId}`, avatarFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          // Convert byte array to base64 string
          const byteArray = avatarResponse.data;
          const base64String = btoa(String.fromCharCode.apply(null, byteArray));

          // Create a data URL for a JPG image
          const dataUrl = `data:image/jpeg;base64,${base64String}`;

          // Update the avatar URLs state with the new data URL
          setAvatarUrls((prevUrls) => ({
            ...prevUrls,
            [newEmployeeId]: dataUrl,
          }));

          console.log('Uploaded avatar:', dataUrl);

          // Cập nhật avatar cho nhân viên mới
          newEmployee.avatar = dataUrl;

        }
      } catch (error) {
        console.error('Error creating new staff:', error);
      }
    } else {
      try {
        console.log("updatedEmployee");
        const accessToken = JSON.parse(localStorage.getItem("persist:hotelmanagement/user")).token.slice(1, -1);
        const token = accessToken;
        await apiUpdateStaff(updatedEmployee, token);
      } catch (error) {
        console.error('Error updating staff:', error);
      }
    }

    window.location.reload();
  };


  const handleDelete = async (id) => {
    const accessToken = JSON.parse(localStorage.getItem("persist:hotelmanagement/user")).token.slice(1, -1);
    console.log(accessToken);
    if (!accessToken) {
      console.error('No access token found');
      return;
    }

    try {
      await apiDeleteStaff(id, accessToken);
      // Cập nhật state để loại bỏ nhân viên đã xóa khỏi danh sách hiển thị
      setEmployees(employees.filter(employee => employee.userAccountId !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleAvatarChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };



  return (
    <div className='container mx-auto my-8 p-4 bg-white rounded-lg shadow-lg'>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel='Edit Staff Information' className="rounded-lg shadow-xl p-8">
        <div>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className='max-w-lg mx-auto bg-white p-8 border rounded-lg shadow-xl m-12'>
            <h2 className='text-2xl font-semibold mb-6 text-center text-gray-800'>
              {formData.userAccountId != null ? `Edit Staff: ${formData.name}` : 'Add New Staff'}
            </h2>

            <div className='space-y-4 mb-6'>
              {formData.userAccountId == null && (
                <>
                  <div>
                    <label htmlFor='username' className='block text-sm font-medium text-gray-600'>
                      Username
                    </label>
                    <input type='text' id='username' name='username' value={formData.username} onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required />
                  </div>
                  <div>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-600'>
                      Password
                    </label>
                    <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required />
                  </div>
                </>
              )}

              <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-600'>
                  Name
                </label>
                <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required />
              </div>

              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-600'>
                  Email
                </label>
                <input type='text' id='email' name='email' value={formData.email} onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required />
              </div>

              <div>
                <label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-600'>
                  Phone Number
                </label>
                <input type='text' id='phoneNumber' name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required />
              </div>

              <div>
                <label htmlFor='address' className='block text-sm font-medium text-gray-600'>
                  Address
                </label>
                <input type='text' id='address' name='address' value={formData.address} onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required />
              </div>

              <div>
                <label htmlFor='birthDay' className='block text-sm font-medium text-gray-600'>
                  BirthDay
                </label>
                <input type='date' id='birthDay' name='birthDay' value={formData.birthDay} onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
              </div>

              {formData.userAccountId == null && (  
                <>
                  <div>
                    <label htmlFor='avatar' className='block text-sm font-medium text-gray-600'>
                      Avatar
                    </label>
                    <input type='file' id='avatar' name='avatar' onChange={handleAvatarChange} className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                  </div>
                </>
              )}


            </div>


            <div className='flex justify-between'>
              <button onClick={closeModal} className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-300'>
                Cancel
              </button>

              <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300'>
                Save Changes
              </button>
            </div>
          </form>
        </div>

      </Modal>
      <h1 className='text-3xl font-semibold text-gray-800 mb-8'>Employee Management</h1>

      <div className='my-4'>
        <button onClick={() => openModal({})} className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300'>
          Add New Employee
        </button>
      </div>

      <EmployeeTable employees={employees} openModal={openModal} onDelete={handleDelete} />

    </div>
  );
};

export default Staff;
