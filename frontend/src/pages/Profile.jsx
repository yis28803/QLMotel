import { useState } from "react";
import { useForm } from "react-hook-form";

const Profile = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="px-20 my-10">
      <p className="text-2xl text-main text-center font-semibold">
        Thông tin tài khoản
      </p>
      <div className="shadow-outer mt-8 mx-auto max-w-[1000px] p-8 rounded-xl flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/images/home01.png"
            alt=""
            className="w-20 h-20 rounded-full"
          />
          <div className="ml-4">
            <p className="text-xl font-semibold mb-2">Tải ảnh mới lên</p>
            <input id="file" type="file" onChange={handleFileChange} />
          </div>
        </div>
        <button
          onClick={handleUpload}
          disabled={!file}
          className="border-main border-2 rounded-lg px-4 py-2 font-semibold"
        >
          Cập nhật
        </button>
      </div>
      <div className="shadow-outer mt-8 mx-auto max-w-[1000px] p-8 rounded-xl">
        <p className="text-xl text-main font-semibold">Thông tin cá nhân</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          <div className="flex gap-6">
            <div className="flex flex-col flex-1">
              <label htmlFor="full-name">
                Họ và tên<span className="text-red-500">*</span>
              </label>
              <input
                id="full-name"
                {...register("fullName", { required: true })}
                className="outline-none border-main border-2 rounded-lg px-4 py-2 font-semibold mt-2"
              />
              {errors.fullName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="email">
                Địa chỉ Email<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                {...register("email", { required: true })}
                className="outline-none border-main border-2 rounded-lg px-4 py-2 font-semibold mt-2"
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="address">
              Địa chỉ<span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              {...register("address", { required: true })}
              className="outline-none border-main border-2 rounded-lg px-4 py-2 font-semibold mt-2"
            />
            {errors.address && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex">
            <div className="flex-1 flex flex-col">
              <label htmlFor="gender">
                Giới tính<span className="text-red-500"></span>
              </label>
              <select
                id="gender"
                {...register("gender")}
                className="outline-none border-main border-2 rounded-lg px-4 py-2 font-semibold mt-2"
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div className="flex-1"></div>
          </div>
          <input
            type="submit"
            value="Cập nhật thông tin"
            className="rounded-lg bg-main mx-auto px-8 py-2 font-semibold text-white hover:cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;
