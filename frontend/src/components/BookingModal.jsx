/* eslint-disable react-refresh/only-export-components */
import { useCallback, useState } from "react";
import { Form, Modal } from "antd";
import FormBuilder from "antd-form-builder";
import NiceModal, { useModal, antdModal } from "@ebay/nice-modal-react";
import { apiBookingRoom } from "../api";

export default NiceModal.create(({ room }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState({ startDate: "", endDate: "" });
  const [isFormValid, setIsFormValid] = useState(false);
  const modal = useModal();
  const [form] = Form.useForm();
  const meta = {
    initialValues: room,
    fields: [{ key: "specialRequests", label: "Lưu ý cho nhân viên" }],
  };

  const handleSubmit = useCallback(async () => {
    let hasError = false;
    setError({ startDate: "", endDate: "" });

    if (!startDate) {
      setError((error) => ({
        ...error,
        startDate: "Không được để trống",
      }));
      hasError = true;
    }
    if (!endDate) {
      setError((error) => ({
        ...error,
        endDate: "Không được để trống",
      }));
      hasError = true;
    }
    if (new Date(startDate) < new Date()) {
      setError((error) => ({
        ...error,
        startDate: "Phải lớn hơn ngày hiện tại",
      }));
      hasError = true;
    }
    if (new Date(endDate) < new Date()) {
      setError((error) => ({
        ...error,
        endDate: "Phải lớn hơn ngày hiện tại",
      }));
      hasError = true;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setError({
        startDate: "Phải bé hơn ngày trả phòng",
        endDate: "Phải lớn hơn ngày nhận phòng",
      });
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const specialRequests = form.getFieldsValue().specialRequests;
    const token = JSON.parse(
      window.localStorage.getItem("persist:hotelmanagement/user")
    ).token.slice(1, -1);

    const rs = await apiBookingRoom({
      roomId: room.roomId,
      startDate,
      endDate,
      totalPrice: parseFloat(sumPrice(room, startDate, endDate).replace(/[^0-9-.]/g, '')),
      status: "Pending",
      bookingDate: new Date().toISOString().slice(0, 10),
      specialRequests,

    }, token);
    modal.resolve();
    modal.hide();
  }, [modal, room, form, endDate, startDate]);

  // Thay đổi sự kiện onChange của input ngày nhận phòng
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    validateForm(newStartDate, endDate);
  };

  // Thay đổi sự kiện onChange của input ngày trả phòng
  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    validateForm(startDate, newEndDate);
  };

  // Hàm kiểm tra biểu mẫu
  const validateForm = (newStartDate, newEndDate) => {
    let hasError = false;
    setError({ startDate: "", endDate: "" });

    if (!newStartDate) {
      setError((error) => ({
        ...error,
        startDate: "Không được để trống",
      }));
      hasError = true;
    }
    if (!newEndDate) {
      setError((error) => ({
        ...error,
        endDate: "Không được để trống",
      }));
      hasError = true;
    }
    if (new Date(newStartDate) < new Date()) {
      setError((error) => ({
        ...error,
        startDate: "Phải lớn hơn ngày hiện tại",
      }));
      hasError = true;
    }
    if (new Date(newEndDate) < new Date()) {
      setError((error) => ({
        ...error,
        endDate: "Phải lớn hơn ngày hiện tại",
      }));
      hasError = true;
    }
    if (new Date(newEndDate) < new Date(newStartDate)) {
      setError({
        startDate: "Phải bé hơn ngày trả phòng",
        endDate: "Phải lớn hơn ngày nhận phòng",
      });
      hasError = true;
    }

    // Kiểm tra nếu không có lỗi thì biểu mẫu là hợp lệ
    if (!hasError) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  return (
    <Modal
      {...antdModal(modal)}
      title={"Xác nhận thông tin"}
      okText={"Đặt phòng"}
      onOk={handleSubmit}
      disabled={!isFormValid}
    >
      <Form form={form}>
        <div className="flex gap-3 ">
          <label
            htmlFor="startDate"
            className="ant-form-item-required flex-1 text-right"
            title="Ngày trả phòng"
          >
            <span className="text-red-500">*</span> Ngày nhận phòng:
          </label>
          <input
            type="date"
            id="startDate"
            aria-required="true"
            className="ant-input css-dev-only-do-not-override-zl9ks2 ant-input-outlined flex-2"
            value={startDate}
            onChange={handleStartDateChange} // Sử dụng sự kiện onChange mới
          />
        </div>
        <div className="flex mb-2">
          <div className="flex-1"></div>
          <p className="text-red-500 flex-2">
            {error.startDate ? error.startDate : ""}
          </p>
        </div>
        <div className="flex gap-3 ">
          <label
            htmlFor="endDate"
            className="ant-form-item-required flex-1 text-right"
            title="Ngày trả phòng"
          >
            <span className="text-red-500">*</span> Ngày trả phòng:
          </label>
          <input
            type="date"
            id="endDate"
            aria-required="true"
            className="ant-input css-dev-only-do-not-override-zl9ks2 ant-input-outlined flex-2"
            value={endDate}
            onChange={handleEndDateChange} // Sử dụng sự kiện onChange mới
          />
        </div>
        <div className="flex mb-2">
          <div className="flex-1"></div>
          <p className="text-red-500 flex-2">
            {error.endDate ? error.endDate : ""}
          </p>
        </div>
        <FormBuilder meta={meta} form={form} />
        <div className="flex justify-between p-2">
          <p>Ngày đặt phòng: {new Date().toLocaleString()}</p>
          <p>Giá: {sumPrice(room, startDate, endDate)} </p>
        </div>
      </Form>
    </Modal>
  );
});

function sumPrice(room, startDate, endDate) {
  const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const sumPrice = room.roomType.basePrice * diffDays;
  
  if (isNaN(sumPrice)) return "0.00 đ";
  
  // Format the sumPrice for Vietnamese currency
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(sumPrice);
}

