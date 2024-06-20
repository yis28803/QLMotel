import {
  faWifi,
  faBuildingCircleCheck,
  faUtensils,
  faWaterLadder,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoomDetail from "./RoomDetail";
import RoomCard from "../components/RoomCard";

export default function Home() {
  const rooms = [
    {
      id: 1,
      year: 2023,
      name: "Premium King Room",
      src: "https://plus.unsplash.com/premium_photo-1663126298656-33616be83c32?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9vbXN8ZW58MHx8MHx8fDA%3D",
      star: 3,
      saving: true,
      priceString: "2.000.000",
      price: "1.740.000",
      featured: ["2 phòng ngủ", "2 phòng tắm", "1 ban công"],
      utils: 2,
      descriptions: [
        "Đang  thu hút nhiều lượt đặt, lần đặt gần nhất 1 giờ trước!",
        "Không cần thẻ tín dụng",
        "Giảm giá 10% cho lần đặt phòng đầu tiên",
      ],
      discount: 13,
      reviewCount: 102,
      vote_average: 8.2,
    },
    {
      id: 2,
      year: 2023,
      saving: true,
      priceString: "1.399.000",
      price: "1.119.200",
      name: "Deluxe Room",
      src: "https://plus.unsplash.com/premium_photo-1675615667752-2ccda7042e7e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJvb21zfGVufDB8fDB8fHww",
      star: 4,
      featured: ["1 phòng ngủ", "1 phòng tắm", "1 ban công"],
      utils: 2,
      descriptions: [
        "Cung cấp không gian phòng hiện đại, đầy đủ tiện nghi.!",
        "Không cần thẻ tín dụng",
        "Giảm giá 10% cho lần đặt phòng đầu tiên",
      ],
      reviewCount: 120,
      discount: 13,
      vote_average: 7.9,
    },
    {
      id: 3,
      year: 2023,
      saving: true,
      name: "Room With View",
      src: "https://images.unsplash.com/photo-1559414059-34fe0a59e57a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9vbSUyMHZpZXd8ZW58MHx8MHx8fDA%3D",
      star: 4,
      priceString: "2.000.000",
      discount: 13,
      price: "1.740.000",
      featured: ["1 phòng ngủ", "1 phòng tắm", "1 view biển"],
      utils: 2,
      descriptions: [
        "Tầm nhìn tuyệt vời từ căn phòng của quý khách, mang đến cho quý khách không gian thoải mái để tận hưởng cuộc sống!",
        "Không cần thẻ tín dụng",
        "Giảm giá 10% cho lần đặt phòng đầu tiên",
      ],
      reviewCount: 209,
      vote_average: 8.7,
    },
  ];

  return (
    <div className="">
      <div className="relative">
        <img
          src="./images/home01.png"
          alt=""
          className="object-contain w-full"
        />
        <div className="text-white font-semibold flex items-center justify-center flex-col absolute top-0 right-0 bottom-0 left-0 bg-black/[.1]">
          <p>
            HÃY TẬN HƯỞNG KỲ NGHỈ TUYỆT VỜI CỦA BẠN VỚI TRẢI NGHIỆM SANG TRỌNG
            TUYỆT VỜI!
          </p>
          <p className="text-6xl mt-4">NƠI GIÚP BẠN THƯ GIÃN</p>
          <div className="flex gap-16 mt-8">
            <button className="bg-main  font-semibold py-3 px-5 rounded-md">
              ĐẶT PHÒNG{" "}
            </button>
            <button className="border-2 text-white  font-semibold py-3 px-6 rounded-md">
              GIỚI THIỆU{" "}
            </button>
          </div>
        </div>
      </div>
      <div className="flex mt-16 gap-10 text-main px-16">
        <div className="flex-1 flex gap-6">
          <div className="flex-1">
            <div className="text-center px-6 py-4 shadow-lg">
              <p className="font-semibold text-lg">Cozy Room</p>
              <p className="text-[#616161] mt-3">
                Phòng khách sạn của chúng tôi thiết kế với sự tinh tế, sang
                trọng giúp tạo nên không gian thoải mái và ấm cúng.
              </p>
            </div>
            <img src="./images/home03.png" alt="" className="mt-6" />
          </div>
          <div className="flex-1 relative">
            <img src="./images/home02.png" alt="" />
            <div className="text-center px-6 py-4 shadow-lg mt-6 absolute bottom-0">
              <p className="font-semibold text-lg">Deluxe Room</p>
              <p className="text-[#616161] mt-3 ">
                Với vị trí đắc địa, chúng tôi tự hào về tầm nhìn tuyệt vời từ
                phòng khách sạn mang lại cho các bạn
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 pt-6">
          <p className="font-semibold text-lg">Giới thiệu</p>
          <p className="font-semibold text-4xl mt-2">
            Thư giãn với hệ thống đặt phòng thông minh
          </p>
          <p className="text-[#616161] text-lg bg-[#F5F5F5] py-2 px-4 rounded-2xl mt-6">
            Chúng tôi cam kết mang đến ưu đãi đặc biệt cho những đặt phòng trực
            tuyến, giúp quý khách tiết kiệm chi phí và đồng thời nhận được nhiều
            quyền lợi hấp dẫn.
          </p>
          <button className="bg-main text-white mt-8  font-semibold py-3 px-5 rounded-md">
            Đặt ngay nào!
          </button>
        </div>
      </div>
      <div className="mt-16 text-main px-16 text-center">
        <p className=" font-semibold text-4xl">
          Khám phá các dịch vụ của chúng tôi
        </p>
        <div className="flex gap-8 justify-center mt-8">
          <div className="rounded-full w-36 h-36 shadow-outer flex flex-col items-center justify-center gap-2">
            <div className="flex-1 flex items-end">
              <FontAwesomeIcon icon={faWifi} className="" size="2xl" />
            </div>
            <p className="flex-1 px-2 font-semibold">Free Wifi</p>
          </div>
          <div className="rounded-full w-36 h-36 shadow-outer flex flex-col items-center justify-center gap-2">
            <div className="flex-1 flex items-end">
              <FontAwesomeIcon
                icon={faBuildingCircleCheck}
                className=""
                size="2xl"
              />
            </div>
            <p className="flex-1 px-2 font-semibold">Đặt phòng dễ dàng</p>
          </div>
          <div className="rounded-full w-36 h-36 shadow-outer flex flex-col items-center justify-center gap-2">
            <div className="flex-1 flex items-end">
              <FontAwesomeIcon icon={faUtensils} className="" size="2xl" />
            </div>
            <p className="flex-1 px-2 font-semibold">Nhà hàng</p>
          </div>
          <div className="rounded-full w-36 h-36 shadow-outer flex flex-col items-center justify-center gap-2">
            <div className="flex-1 flex items-end">
              <FontAwesomeIcon icon={faWaterLadder} className="" size="2xl" />
            </div>
            <p className="flex-1 px-2 font-semibold">Bể bơi</p>
          </div>
          <div className="rounded-full w-36 h-36 shadow-outer flex flex-col items-center justify-center gap-2">
            <div className="flex-1 flex items-end">
              <FontAwesomeIcon
                icon={faHeartCirclePlus}
                className=""
                size="2xl"
              />
            </div>
            <p className="flex-1 px-2 font-semibold">Làm đẹp và Sức khoẻ</p>
          </div>
        </div>
      </div>
      <div className="mt-16 text-main px-20 text-center mb-16">
        <p className=" font-semibold text-4xl">Phòng cao cấp</p>
        <div className="flex gap-10 mt-10 flex-col">
          {rooms.map((r, i) => (
            <div className="mx-auto w-[90%]" key={i}>
              <RoomCard room={r} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
