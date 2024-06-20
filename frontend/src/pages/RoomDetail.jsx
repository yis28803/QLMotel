/* eslint-disable react-hooks/exhaustive-deps */
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "../components/Carousel";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { apiGetRoom } from "../api/";
import BookingModal from "../components/BookingModal";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { MdEventAvailable } from "react-icons/md";

function RoomDetail(props) {
  const [room, setRoom] = useState("");
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const rs = await apiGetRoom(id);
      setRoom(rs);
    }
    fetchData();
  }, [id]);

  const handleBooking = useCallback(() => {
    NiceModal.show(BookingModal, { room }).then(() => {
      confirmAlert({
        title: "Xác nhận thông tin thành công", // Title dialog
        message: "Vui lòng thanh toán tới stk sau: 123456789102", // Message dialog
        childrenElement: () => <div>Nội dung: số điện thoại đã đăng ký</div>, // Custom UI or Component

        buttons: [
          {
            label: "Đồng ý",
            onClick: () => { },
          },
        ],
      });
    });
  }, [room]);

  const images = [
    "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217.webp",
    "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217.webp",
    "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217.webp",
    "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217.webp",
  ];

  return (
    <div className="max-w-screen-xl mx-auto py-12">
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="lg:w-1/2">
          <div className="text-center text-3xl font-bold mb-6">Ảnh phòng</div>
          <Carousel slides={images} />
        </div>
        <div className="lg:w-1/2">
          <div className="text-center text-3xl font-bold mb-6">Thông tin phòng</div>
          <div className="text-center text-3xl font-bold mb-4">{room.roomName}</div>
          <div className="text-blue-500 text-xl font-bold mb-2">
            Loại phòng: {room.roomType?.roomTypeName}
          </div>
          <div className="text-2xl font-semibold flex flex-row items-center justify-center gap-x-1">
            <MdEventAvailable className={room.status === "Booked" ? "text-[#DD2525]" : "text-[#362FD9]"} />
            <p>{room.status}</p>
          </div>
          <div className="text-black text-center text-xl mt-4">
            Giá phòng từ {room.roomType?.basePrice} VND / đêm
          </div>
          <div className="mt-4">
            <button
              onClick={room.status !== "Booked" ? handleBooking : undefined}
              className={`cursor-pointer text-white text-center text-2xl font-bold bg-cyan-600 py-6 rounded-md max-md:px-5 w-full ${room.status != "Trống" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={room.status !== "Trống"}
            >
              LỰA CHỌN PHÒNG
            </button>
          </div>
        </div>

      </div>

      <hr className="my-6" />

      <div className="bg-white p-4 rounded-xl shadow-md mt-10">
        <div className="text-2xl font-semibold mb-6">Nhận xét và đánh giá</div>
        <form action="">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-xl font-semibold">
                Họ và tên
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="border rounded-md px-3 py-2 mt-2.5"
                placeholder="Họ và tên"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="vote" className="text-xl font-semibold">
                Đánh giá
              </label>
              <input
                type="text"
                name="vote"
                id="vote"
                className="border rounded-md px-3 py-2 mt-2.5"
                placeholder="5 sao"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="comment" className="text-xl font-semibold mt-5">
              Nội dung
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={3}
              className="border rounded-md py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              placeholder="Nhận xét của bạn"
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Gửi
            </button>
          </div>
        </form>
        <div className="text-lime-600 text-xl mt-6">
          Mọi phản hồi của quý khách luôn là nguồn động lực để chúng tôi mang đến nhiều sản phẩm thú vị hơn! Hãy để lại cảm nhận của bạn nhé!
        </div>
      </div>
    </div>
  );



}

export default RoomDetail;
