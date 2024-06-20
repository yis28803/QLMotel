import React, { useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

const About = () => {
  const slideImgs = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsfGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1661964225206-fd5d445a6edd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGhvdGVsfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGhvdGVsfGVufDB8fDB8fHww",
  ];

  const firstLayer = {
    main: "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGhvdGVsfGVufDB8fDB8fHww",
    sub: [
      "https://images.unsplash.com/photo-1561501878-aabd62634533?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxob3RlbHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE5fHxob3RlbHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1587874522487-fe10e954d035?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIwfHxob3RlbHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1584132869994-873f9363a562?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMxfHxob3RlbHxlbnwwfHwwfHx8MA%3D%3D",
    ],
  };

  const secondLayer = {
    main: "https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjAzfHxob3RlbHxlbnwwfHwwfHx8MA%3D%3D",
    sub: [
      "https://plus.unsplash.com/premium_photo-1683133440756-3b91f36aff20?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjI1fHxob3RlbHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1571003123771-bd6a099dd83a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjI0fHxob3RlbHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1584132905271-512c958d674a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQ3fHxob3RlbHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjUxfHxob3RlbHxlbnwwfHwwfHx8MA%3D%3D",
    ],
  };

  const size = slideImgs.length;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => {
        return index < size - 1 ? index + 1 : 0;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen m-auto mt-16">
      <div className="max-w-[1200px] bg-[#EEEEEE] mx-auto rounded-2xl flex flex-row p-8">
        <div className="basis-3/5">
          <div className="title flex flex-col items-start pl-0 w-full justify-around gap-y-4">
            <h1 className="flex flex-row items-center justify-center gap-x-2font-bold text-4xl font-bold text-[#1AACAC]">
              Giới thiệu về BORN <GoDotFill /> PINK
            </h1>
            <div className="w-2/5 mt-2 h-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-r-xl"></div>
            <p className="text-justify">
              <span className="text-[#1AACAC] font-semibold">BORN PINK</span>{" "}
              luôn tự hào là điểm đến lý tưởng cho những trải nghiệm đẳng cấp và
              không gian thư giãn tuyệt vời. Với vị trí đắc địa tại thành phố
              nghỉ dưỡng Đà Nẵng, chúng tôi mang đến không gian sang trọng và
              dịch vụ chất lượng, đảm bảo mọi chuyến đi của quý khách trở nên
              đặc biệt và nhớ mãi.
            </p>
            <p className="text-justify">
              Với đội ngũ nhân viên chuyên nghiệp và thân thiện, chúng tôi cam
              kết mang đến trải nghiệm nghỉ ngơi tuyệt vời nhất cho quý khách.
              <span className="text-[#1AACAC] font-semibold">BORN PINK</span> có
              nhiều loại phòng đa dạng, từ phòng Deluxe tiện nghi đến các căn
              suite sang trọng, đảm bảo đáp ứng mọi nhu cầu của quý khách.
            </p>
            <p className="text-justify">
              Khách sạn chúng tôi tự hào về những tiện ích và dịch vụ đẳng cấp,
              bao gồm nhà hàng phục vụ ẩm thực đa dạng, quán bar lịch lãm và
              trung tâm thể dục hiện đại. Ngoài ra,{" "}
              <span className="text-[#1AACAC] font-semibold">BORN PINK</span>{" "}
              cũng có các phòng họp và sảnh hội nghị tiện nghi, là địa điểm lý
              tưởng cho các sự kiện kinh doanh và hội nghị.
            </p>
          </div>
        </div>
        <div className="basis-2/5 slide-img w-full object-cover flex flex-col justify-center pl-10">
          <img className="rounded-xl" src={slideImgs[index]} />
        </div>
      </div>

      <div className="w-full py-10 bg-[#EEEEEE] flex flex-col justify-center items-center h-[450px] my-16">
        <div className="w-[1200px] h-[400px] overflow-x-hidden scrollbar-hide whitespace-nowrap scroll-smooth flex flex-col gap-y-8">
          <div className="layer-1 flex flex-row w-full h-full gap-x-8">
            <img
              src={firstLayer.main}
              className="basis-3/5 w-full h-full object-cover rounded-xl"
            />
            <div className="basis-2/5 grid grid-cols-2 gap-2 my-auto">
              {firstLayer.sub.map((value, index) => {
                return (
                  <img
                    key={index}
                    src={value}
                    className="object-cover h-[150px] w-[225px] rounded-xl"
                  />
                );
              })}
            </div>
          </div>
          <div className="layer-2 flex flex-row w-full h-full gap-x-8">
            <div className="basis-2/5 grid grid-cols-2 gap-2 my-auto">
              {secondLayer.sub.map((value, index) => {
                return (
                  <img
                    key={index}
                    src={value}
                    className="object-cover h-[150px] w-[225px] rounded-xl"
                  />
                );
              })}
            </div>
            <img
              src={secondLayer.main}
              className="basis-3/5 w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
      <div className="w-full mb-16 flex flex-col gap-y-16">
        <h1 className="w-full text-center text-4xl font-bold text-[#1AACAC] mb-8">
          Dịch vụ nghỉ dưỡng tuyệt vời nhất cho bạn
        </h1>
        <div className="flex flex-row w-[1200px] gap-x-16 mx-auto">
          <div className="flex flex-col items-center gap-y-8 basis-2/4">
            <img
              className="w-3/5 rounded-xl object-cover"
              src="https://i.pinimg.com/564x/07/0a/2b/070a2b97082d83a6f4033a4f3d1eda27.jpg"
            />
            <h1 className="text-2xl text-slate-500 font-semibold">
              Đội ngũ nhân viên chuyên nghiệp và nhiệt huyết
            </h1>
            <div className="flex flex-col items-center p-8 rounded-2xl bg-[#EEEEEE] text-slate-500 gap-y-4">
              <p>
                Đội ngũ nhân viên tại{" "}
                <span className="text-[#1AACAC] text-xl font-bold">
                  BORN PINK
                </span>{" "}
                không chỉ là những chuyên gia trong lĩnh vực của họ mà còn là
                những người yêu nghề và tận tâm với sự hài lòng của quý khách.
              </p>
              <p>
                Mỗi thành viên trong đội ngũ của chúng tôi đều được đào tạo
                chuyên sâu về phục vụ khách hàng và sự chuyên nghiệp. Tận tâm và
                sẵn sàng giúp đỡ, họ không chỉ là những người làm việc, mà còn
                là những người bạn đồng hành của quý khách trong suốt thời gian
                lưu trú tại khách sạn.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-y-8 basis-2/4">
            <h1 className="text-2xl text-slate-500 font-semibold">
              Dịch vụ chăm sóc khách hàng 24/7
            </h1>
            <img
              className="w-3/5 rounded-xl object-cover"
              src="https://i.pinimg.com/564x/c7/55/da/c755da4cff4b0dc06dcb67dd810b1953.jpg"
            />
            <div className="flex flex-col items-center p-8 rounded-2xl bg-[#EEEEEE] text-slate-500 gap-y-4">
              <p>
                Tại{" "}
                <span className="text-[#1AACAC] text-xl font-bold">
                  BORN PINK
                </span>{" "}
                , chúng tôi hiểu rằng sự thoải mái và hài lòng của quý khách là
                ưu tiên hàng đầu. Với dịch vụ phòng 24/7, chúng tôi luôn sẵn
                sàng đáp ứng mọi yêu cầu của quý khách, từ đặt phòng, đồ ăn, đến
                các yêu cầu đặc biệt khác nhau.
              </p>
              <p>
                Đội ngũ chăm sóc khách hàng của chúng tôi không chỉ đơn thuần là
                nhân viên, mà còn là những người bạn lựa chọn đáng tin cậy trong
                mọi tình huống.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-[1200px] gap-x-16 mx-auto">
          <div className="flex flex-col items-center gap-y-8 basis-2/4">
            <img
              className="w-3/5 rounded-xl object-cover"
              src="https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdGVsfGVufDB8fDB8fHww"
            />
            <h1 className="text-2xl text-slate-500 font-semibold">
              Phòng ở sang trọng, không gian thoải mái
            </h1>
            <div className="flex flex-col items-center p-8 rounded-2xl bg-[#EEEEEE] text-slate-500 gap-y-4">
              <p>
                Tại{" "}
                <span className="text-[#1AACAC] text-xl font-bold">
                  BORN PINK
                </span>{" "}
                , chúng tôi hiểu rằng sự thoải mái và hài lòng của quý khách là
                ưu tiên hàng đầu. Với dịch vụ phòng 24/7, chúng tôi luôn sẵn
                sàng đáp ứng mọi yêu cầu của quý khách, từ đặt phòng, đồ ăn, đến
                các yêu cầu đặc biệt khác nhau.
              </p>
              <p>
                Đội ngũ chăm sóc khách hàng của chúng tôi không chỉ đơn thuần là
                nhân viên, mà còn là những người bạn lựa chọn đáng tin cậy trong
                mọi tình huống.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-y-8 basis-2/4">
            <h1 className="text-2xl text-slate-500 font-semibold">
              Tiện Nghi và Dịch Vụ Đẳng Cấp
            </h1>
            <img
              className="w-3/5 rounded-xl object-cover"
              src="https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjBzZXJ2aWNlfGVufDB8fDB8fHww"
            />
            <div className="flex flex-col items-center p-8 rounded-2xl bg-[#EEEEEE] text-slate-500 gap-y-4">
              <p>
                Tại{" "}
                <span className="text-[#1AACAC] text-xl font-bold">
                  BORN PINK
                </span>{" "}
                , chúng tôi hiểu rằng sự thoải mái và hài lòng của quý khách là
                ưu tiên hàng đầu. Với dịch vụ phòng 24/7, chúng tôi luôn sẵn
                sàng đáp ứng mọi yêu cầu của quý khách, từ đặt phòng, đồ ăn, đến
                các yêu cầu đặc biệt khác nhau.
              </p>
              <p>
                Đội ngũ chăm sóc khách hàng của chúng tôi không chỉ đơn thuần là
                nhân viên, mà còn là những người bạn lựa chọn đáng tin cậy trong
                mọi tình huống.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row justify-center mb-16">
        <Link
          type="button"
          to={"/rooms"}
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2  text-xl"
        >
          Now's your relax time!
        </Link>
      </div>
    </div>
  );
};

export default About;
