import React, { useLayoutEffect, useState, useRef } from "react";
import { FiFilter } from "react-icons/fi";
import { RxDropdownMenu, RxZoomOut } from "react-icons/rx";
import RoomDetail from "../components/RoomDetail";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaXbox } from "react-icons/fa";
import InputFiltering from "../components/InputFiltering";
import { apiGetRoomTypes, apiGetRooms } from "../api/user";

const Rooms = () => {
  const [data, setData] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);

  useLayoutEffect(() => {
    async function fetchData() {
      try {
        const rs1 = await apiGetRooms();
        const rs2 = await apiGetRoomTypes();


        setData(rs1);
        rs1.forEach((room) => {
          room.roomImageId = "https://plus.unsplash.com/premium_photo-1663126298656-33616be83c32?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9vbXN8ZW58MHx8MHx8fDA%3D";
        });

        setRoomTypes(rs2);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [data, roomTypes]);

  const [filteredItems, setFilterdItems] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  let recordsPerPage = 5;
  const maxIndexOfRecord = Math.ceil(filteredItems.length / recordsPerPage);
  const indexLast =
    filteredItems.length > currentPage * recordsPerPage
      ? currentPage * recordsPerPage
      : filteredItems.length;
  const indexFirst = (currentPage - 1) * recordsPerPage;
  const rooms = filteredItems.slice(indexFirst, indexLast);
  const [filterBox, setFitlerBox] = useState(false);
  const [rangePrice, setRangePrice] = useState("");
  const [openSortBy, setOpenSortBy] = useState(false);

  /* Lấy ra toàn bộ thông tin về loại phòng, giá cơ bản, giá đã sale và số lượng người có thể ở trong phòng. */
  const roomType = roomTypes.map((roomType) => {
    return roomType.roomTypeName;
  });
  const capacity = roomTypes.map((roomType) => {
    return roomType.capacity;
  });

  const [roomTypeSelected, setRoomTypeSelected] = useState("");
  const [capacitySelected, setCapacitySelected] = useState("");
  capacity.sort((a, b) => a - b);

  /* ============ */
  const [filterProp, setFilterProp] = useState(0);
  function chooseFilterProperty(event) {
    setFilterProp(event.target.value);
  }

  function undoChooseFilterProperty(event) {
    setFilterProp(0);
  }

  // ====================== Text Input Filter. ======================
  function handleInputTextChange(event) {
    const fitleredItems = data.filter((room) => {
      return (
        room.roomName
          .toLowerCase()
          .indexOf(event.target.value.toLowerCase()) !== -1
      );
    });

    setFilterdItems(fitleredItems);
    setCurrentPage(1);
  }

  function FilterItems() {
    /* Lấy toàn bộ danh sách các phòng đã được lọc, ban đầu mặc định là toàn bộ phòng. */
    let filterItems = data;
    if (roomTypeSelected.size !== 0) {
      filterItems = filterItems.filter(({ roomTypeName }) => {
        const array = Array.from(roomTypeSelected);
        for (let index = 0; index < array.length; index++) {
          if (array[index] === roomTypeName) return true;
        }
        return false;
      });
      setRoomTypeSelected(() => {
        return new Set([]);
      });
    }
    if (capacitySelected.size !== 0) {
      filterItems = filterItems.filter(({ capacity }) => {
        const array = Array.from(capacitySelected);
        for (let index = 0; index < array.length; index++) {
          if (Number.parseInt(array[index]) >= Number.parseInt(capacity))
            return true;
        }
        return false;
      });
      setCapacitySelected(() => {
        return new Set([]);
      });
    }
    let useRangePriceFilter = false;
    if (rangePrice != null) {
      // Lọc dựa theo giá tiên mà khách hàng.
      useRangePriceFilter = true;
      filterItems = filterItems.filter(({ salePrice }) => {
        return salePrice <= rangePrice;
      });
      setRangePrice(null);
    }
    setFilterdItems(filterItems);
    setCurrentPage(1);
    let indexLast = recordsPerPage;
    let indexFirst = indexLast - recordsPerPage;
    if (useRangePriceFilter) {
      filterItems = filterItems.sort((a, b) => {
        return (a.salePrice - b.salePrice) * -1;
      });
    }
    setFitlerBox(false);
  }

  function pagination(event) {
    const value = event.target.value;
    console.log(maxIndexOfRecord);
    let current = currentPage;
    if (value === "prev") {
      if (currentPage > 1) {
        current = currentPage - 1;
      } else current = currentPage;
    } else if (value === "1" && maxIndexOfRecord >= 1) {
      current = 1;
    } else if (value === "2" && maxIndexOfRecord >= 2) {
      current = 2;
    } else if (value === "3" && maxIndexOfRecord >= 3) {
      current = 3;
    } else if (value === "next") {
      if (currentPage === maxIndexOfRecord) {
        current = maxIndexOfRecord;
      } else if (currentPage < maxIndexOfRecord) {
        current = currentPage + 1;
      } else if (currentPage > maxIndexOfRecord) {
        current = currentPage;
      }
    }
    setCurrentPage(current);
  }

  function handleInputChange(event) {
    setRangePrice(Number.parseInt(event.target.value));
  }

  function resetFunction() {
    /* Đây có thể set lại danh sách các phần tử là data hoặc fetch lại tuỳ ý. */
    const _rooms = data;
    setFilterdItems(_rooms);
  }

  function handleSortBy() {
    setOpenSortBy(!openSortBy);
  }

  function SortByPriceAsc() {
    let array = filteredItems;
    array = array.sort((a, b) => {
      return a.salePrice - b.salePrice;
    });
    setFilterdItems(array);
    setCurrentPage(1);
  }

  function SortByPriceDesc() {
    let array = filteredItems;
    array = array.sort((a, b) => {
      return (a.salePrice - b.salePrice) * -1;
    });
    setFilterdItems(array);
    setCurrentPage(1);
  }

  function openFilterBox() {
    setFitlerBox(!filterBox);
  }

  return (
    <div className="w-4/5 max-w-screen-xl mx-auto relative">
      {filterBox ? (
        <div className="fixed w-4/5 rounded-2xl bg-[#F5F5F5] bg-opacity-90 hover:shadow-lg hover:shadow-cyan-500/100 -translate-x-2/4 left-2/4 z-50 flex flex-col gap-y-8 p-4">
          <button
            className="p-2 bg-[#2E97A7] absolute -right-8 -top-8 rounded-full hover:bg-[#1AACAC]"
            onClick={openFilterBox}
          >
            <FaXbox size={20} className="text-white" />
          </button>
          <div className="px-4">
            <h1 className="text-[#2E97A7] text-xl font-semibold mb-2">
              Giá phòng
            </h1>
            <div>
              <div className="ml-[12.5%]">
                <p>Dưới {rangePrice?.toLocaleString()} VNĐ</p>
              </div>
              <div className="relative mb-6 w-3/4 mx-auto">
                <label htmlFor="labels-range-input" className="sr-only">
                  Labels range
                </label>
                <input
                  id="labels-range-input"
                  type="range"
                  min="0"
                  max="5000000"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  value={rangePrice}
                  onInput={handleInputChange}
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                  0 VNĐ
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-[20%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  1.000.000 VNĐ
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-[40%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  2.000.000 VNĐ
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-[60%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  3.000.000 VNĐ
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-[80%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  4.000.000 VNĐ
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                  5.000.000 VNĐ
                </span>
              </div>
            </div>
            <div className="w-full h-[1px] bg-[#1AACAC] mt-12"></div>
          </div>
          <div className="px-4">
            <h1 className="text-[#2E97A7] text-xl font-semibold mb-2">
              Loại phòng
            </h1>
            <div className="flex flex-row flex-wrap gap-x-4">
              {roomType.map((room) => {
                return (
                  <InputFiltering
                    key={Math.random()}
                    option={room}
                    changeSelect={setRoomTypeSelected}
                  />
                );
              })}
            </div>
            <div className="w-full h-[1px] bg-[#1AACAC] mt-12"></div>
          </div>
          <div className="px-4 w-full">
            <h1 className="text-[#2E97A7] text-xl font-semibold mb-2">
              Số lượng khách hàng
            </h1>
            <div className="flex flex-row flex-wrap gap-x-4">
              {capacity.map((element) => {
                return (
                  <InputFiltering
                    key={Math.random()}
                    option={element}
                    changeSelect={setCapacitySelected}
                  />
                );
              })}
            </div>
            <div className="w-full h-[1px] bg-[#1AACAC] mt-12"></div>
          </div>
          <div className="w-full flex flex-row justify-center items-center gap-x-4">
            <button
              className="px-2 py-1 border-[1px] border-[#1AACAC] rounded-md font-semibold"
              onClick={openFilterBox}
            >
              Huỷ
            </button>
            <button
              className="px-2 py-1 border-[1px] border-[#1AACAC] rounded-md font-semibold text-white bg-[#1AACAC]"
              onClick={FilterItems}
            >
              Xem kết quả
            </button>
          </div>
        </div>
      ) : null}

      <h1 className="my-[20px] text-[40px] text-[#2E97A7] w-full text-center">
        Danh sách phòng
      </h1>
      <div className="filter w-full mb-[80px]">
        {/* Lọc phòng theo dữ liệu người dùng nhập vào. --> Xong */}
        <div className="mb-4 relative w-[200px]">
          <input
            type="text"
            id="floating_standard"
            className="block py-2.5 px-0 w-full text-lg text-[#2E97A7] bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#2E97A7] dark:border-gray-600 dark:focus:border-[#2E97A7] focus:outline-none focus:ring-0 focus:border-[#2E97A7] peer"
            placeholder=""
            onChange={handleInputTextChange}
          />
          <label
            htmlFor="floating_standard"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#2E97A7] peer-focus:dark:text-[#2E97A7] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Tìm kiếm phòng ở đây
          </label>
        </div>
        <div className="flex flex-row gap-x-16 justify-start items-center mb-4">
          <button
            className="px-2 py-1 rounded-2xl border-[1px] border-[#1AACAC] flex flex-row items-center"
            onClick={openFilterBox}
          >
            <FiFilter className="inline mr-1" />
            Bộ lọc
          </button>
          <div className="flex flex-row gap-x-4">
            {/* TOÀN BỘ CHỨC NĂNG LỌC PHÒNG THEO THUỘC TÍNH PHÒNG Ở ĐÂY */}
            {/* Chức năng lọc phòng theo loại phòng */}
            <div className="inline-block hover:cursor-pointer relative">
              <button
                className="px-2 py-1 rounded-2xl border-[1px] border-[#1AACAC]"
                onClick={chooseFilterProperty}
                value={1}
              >
                Loại phòng
                <FaCaretDown className="inline ml-1" />
              </button>
              <div
                className={
                  filterProp !== "1"
                    ? "hidden"
                    : "w-[700px] h-[110px] absolute top-full shadow-lg shadow-slate-600/50 mt-4 rounded-md bg-[#F6F6F6]"
                }
              >
                <div className=" w-full gap-x-3 gap-y-2 h-3/5 bg-slate-100">
                  {roomType.map((option, index) => {
                    return (
                      <InputFiltering
                        changeSelect={setRoomTypeSelected}
                        key={Math.random()}
                        option={option}
                      />
                    );
                  })}
                </div>
                <div className="flex flex-row justify-center items-center gap-x-8 h-2/5">
                  <button
                    className="border-[1px] rounded-md border-[#1AACAC] p-1 font-semibold"
                    onClick={undoChooseFilterProperty}
                  >
                    Huỷ
                  </button>
                  <button
                    className="border-[1px] rounded-md bg-[#1AACAC] p-1 text-white font-semibold"
                    onClick={FilterItems}
                  >
                    Xem kết quả
                  </button>
                </div>
              </div>
            </div>

            {/* Chức năng lọc phòng theo số lượng khách hàng tối đa */}
            <div className="inline-block hover:cursor-pointer relative">
              <button
                className="px-2 py-1 rounded-2xl border-[1px] border-[#1AACAC]"
                onClick={chooseFilterProperty}
                value={2}
              >
                Số lượng khách hàng
                <FaCaretDown className="inline ml-1" />
              </button>
              <div
                className={
                  filterProp !== "2"
                    ? "hidden"
                    : "w-[700px] h-[110px] absolute top-full shadow-lg shadow-slate-600/50 bg-[#F6F6F6] mt-4 rounded-md"
                }
              >
                <div className=" w-full gap-x-3 gap-y-2 h-3/5 bg-slate-100">
                  {capacity.map((option, index) => {
                    return (
                      <InputFiltering
                        changeSelect={setCapacitySelected}
                        key={Math.random()}
                        option={option}
                      />
                    );
                  })}
                </div>
                <div className="flex flex-row justify-center items-center gap-x-8 h-2/5">
                  <button
                    className="border-[1px] rounded-md border-[#1AACAC] p-1 font-semibold"
                    onClick={undoChooseFilterProperty}
                  >
                    Huỷ
                  </button>
                  <button
                    className="border-[1px] rounded-md bg-[#1AACAC] p-1 text-white font-semibold"
                    onClick={FilterItems}
                  >
                    Xem kết quả
                  </button>
                </div>
              </div>
            </div>

            {/* Chức năng lọc phòng theo khoảng giá phòng */}
            <div className="inline-block hover:cursor-pointer relative">
              <button
                className="px-2 py-1 rounded-2xl border-[1px] border-[#1AACAC]"
                onClick={chooseFilterProperty}
                value={3}
              >
                Giá phòng
                <FaCaretDown className="inline ml-1" />
              </button>
              <div
                className={
                  filterProp !== "3"
                    ? "hidden"
                    : "w-[700px] h-[120px] top-full shadow-lg shadow-slate-600/50 mt-3 rounded-md absolute px-4 bg-[#F6F6F6]"
                }
              >
                <div>
                  <p>Dưới {rangePrice?.toLocaleString()} VNĐ</p>
                </div>
                <div className="relative mb-6">
                  <label htmlFor="labels-range-input" className="sr-only">
                    Labels range
                  </label>
                  <input
                    id="labels-range-input"
                    type="range"
                    min="0"
                    max="5000000"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    value={rangePrice}
                    onInput={handleInputChange}
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                    0 VNĐ
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-[20%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                    1.000.000 VNĐ
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-[40%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                    2.000.000 VNĐ
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-[60%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                    3.000.000 VNĐ
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                    5.000.000 VNĐ
                  </span>
                </div>
                <div className="flex flex-row justify-center items-center gap-x-8 h-2/5">
                  <button
                    className="border-[1px] rounded-md border-[#1AACAC] p-1 font-semibold"
                    onClick={undoChooseFilterProperty}
                  >
                    Huỷ
                  </button>
                  <button
                    className="border-[1px] rounded-md bg-[#1AACAC] p-1 text-white font-semibold"
                    onClick={FilterItems}
                  >
                    Xem kết quả
                  </button>
                </div>
              </div>
            </div>
            <div className="inline-block hover:cursor-pointer relative">
              <button
                className="px-2 py-1 rounded-2xl border-[1px] border-[#1AACAC] flex flex-row items-center"
                onClick={handleSortBy}
              >
                <RxDropdownMenu className="inline mr-1" />
                Xếp theo
              </button>
              {openSortBy ? (
                <div className="flex-col gap-y-2 absolute top-full border-none mt-2 shadow-2xl p-2 rounded-xl w-[200px] px-2">
                  <button
                    className="hover:cursor-pointer hover:bg-gray-100 w-full h-full rounded-md"
                    onClick={SortByPriceAsc}
                  >
                    Giá: Thấp ↑ Cao
                  </button>
                  <button
                    className="hover:cursor-pointer hover:bg-gray-100 w-full h-full rounded-md"
                    onClick={SortByPriceDesc}
                  >
                    Giá: Cao ↓ Thấp
                  </button>
                </div>
              ) : null}
            </div>
            <button
              className="px-2 py-1 rounded-2xl border-[1px] border-[#1AACAC] flex flex-row items-center"
              onClick={resetFunction}
            >
              Đặt lại mặc định
            </button>
          </div>
        </div>
      </div>
      <div className="list-rooms max-w-[900px] m-auto flex flex-col gap-y-10">
        {rooms.map((room, index) => {
          return <RoomDetail key={index} room={room} />;
        })}
      </div>
      <div className="pagination w-full flex flex-row justify-center items-center gap-x-4 my-[50px]">
        <button
          value="prev"
          className="py-1 px-3 border-[1px] rounded-md border-[#2E97A7] flex flex-row justify-center items-center hover:bg-[#2E97A7] hover:text-white duration-300"
          onClick={pagination}
        >
          <FaLongArrowAltLeft className="inline mr-2" />
          Back
        </button>
        {[...Array(maxIndexOfRecord)].map((item, index) => (
          <button
            key={index}
            value={index + 1}
            className={`py-1 px-3 border-[1px] rounded-md border-[#2E97A7] hover:bg-[#2E97A7] hover:text-white duration-300
             ${index + 1 === currentPage && "bg-[#2E97A7]"}`}
            onClick={pagination}
          >
            {index + 1}
          </button>
        ))}
        <button
          value="next"
          className="py-1 px-3 border-[1px] rounded-md border-[#2E97A7] flex flex-row justify-center items-center hover:bg-[#2E97A7] hover:text-white duration-300"
          onClick={pagination}
        >
          Next
          <FaLongArrowAltRight className="inline ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Rooms;
