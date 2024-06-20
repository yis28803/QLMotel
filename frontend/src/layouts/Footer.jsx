import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="">
      <div className="bg-[#212529] min-h-[250px] px-20 gap-10 pt-8 flex text-white">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-main font-semibold text-2xl">
            <span>BORN</span>
            <div className="rounded-full bg-main h-3 w-3"></div>
            <span>PINK</span>
          </div>
          <p className="mt-8">
            Chúng tôi truyền cảm hứng và tiếp cận hàng triệu khách du lịch mỗi
            năm.
          </p>
          <div className="flex mt-6 gap-8">
            <div className="border border-main rounded-full w-8 h-8 flex items-center justify-center">
              <FontAwesomeIcon icon={faFacebookF} />
            </div>
            <div className="border border-main rounded-full w-8 h-8 flex items-center justify-center">
              <FontAwesomeIcon icon={faTwitter} />
            </div>
            <div className="border border-main rounded-full w-8 h-8 flex items-center justify-center">
              <FontAwesomeIcon icon={faInstagram} />
            </div>
            <div className="border border-main rounded-full w-8 h-8 flex items-center justify-center">
              <FontAwesomeIcon icon={faYoutube} />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <p className="flex items-center gap-2 text-main font-semibold text-2xl">
            Liên hệ
          </p>
          <p className="mt-8">(+84) 345730705</p>
          <p className="mt-4">infor.bornpink@gmail.com</p>
          <p className="mt-4">Thu Duc, Ho Chi Minh City, Viet Nam</p>
        </div>
        <div className="flex-1">
          <p className="flex items-center gap-2 text-main font-semibold text-2xl">
            Thông báo mới{" "}
          </p>
          <p className="mt-8">
            Nhận thông báo về phòng và giá phòng nhanh nhất tại đây!
          </p>
          <div className="mt-8 flex">
            <input
              type="text"
              className="bg-[#393D4A] placeholder:text-white px-4 py-3"
              placeholder="Email"
            />
            <button className="bg-main px-3 flex items-center justify-center">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-black h-[60px] flex justify-between px-20 text-lg text-white font-semibold items-center">
        <p>Contact</p>
        <p>Terms of use</p>
        <p>Privacy</p>
        <p>Environmental Privacy</p>
      </div>
    </div>
  );
};


export default Footer;
