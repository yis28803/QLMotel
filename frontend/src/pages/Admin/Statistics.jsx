import React from "react";

const RevenueCard = ({ label, revenue, percentageChange }) => {
  return (
    <div className='bg-sky-100 p-4 rounded-lg shadow-md min-w-60 max-w-96'>
      <div className='mb-2'>
        <h2 className='text-lg font-semibold'>{label}</h2>
      </div>
      <div className='flex justify-between'>
        <div className='text-3xl font-bold text-green-500'>{`$${revenue}`}</div>
        <div className={`text-lg font-bold ${percentageChange >= 0 ? "text-green-500" : "text-red-500"}`}>{percentageChange >= 0 ? `+${percentageChange}%` : `${percentageChange}%`}</div>
      </div>
    </div>
  );
};

const RoomCard = ({ label, count }) => {
  return (
    <div className='bg-sky-100 p-4 rounded-lg shadow-md min-w-60 max-w-96'>
      <div className='mb-2'>
        <h2 className='text-lg font-semibold'>{label}</h2>
      </div>
      <div className='flex justify-between'>
        <div className='text-3xl font-bold text-green-500'>{count}</div>
      </div>
    </div>
  );
};

const Statistics = () => {
  const revenues = {
    today: {
      revenue: 1000,
      percentageChange: 10,
    },
    currentMonth: {
      revenue: 1000,
      percentageChange: -10,
    },
    thisYear: {
      revenue: 1000,
      percentageChange: 10,
    },
  };

  const roomCount = {
    occupied: 10,
    available: 20,
  };

  return (
    <div className='mx-8 mt-4'>
      <div>
        <h1 className='text-3xl font-bold mb-4'>Revenue</h1>

        <div className='grid grid-cols-3 gap-4'>
          <div>
            <RevenueCard label='Today Revenue' revenue={revenues.today.revenue} percentageChange={revenues.today.percentageChange} />
          </div>
          <div>
            <RevenueCard label='Current Month Revenue' revenue={revenues.currentMonth.revenue} percentageChange={revenues.currentMonth.percentageChange} />
          </div>
          <div>
            <RevenueCard label='This Year Revenue' revenue={revenues.thisYear.revenue} percentageChange={revenues.thisYear.percentageChange} />
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <h1 className='text-3xl font-bold mb-4'>Rooms</h1>

        <div className='grid grid-cols-3 gap-4'>
          <div>
            <RoomCard label='Total Room' count={roomCount.occupied + roomCount.available} />
          </div>
          <div>
            <RoomCard label='Occupied' count={roomCount.occupied} />
          </div>
          <div>
            <RoomCard label='Available' count={roomCount.available} />
          </div>
        </div>
      </div>
      <div className='mt-8'>
        {/* chart for revenue */}
        <h1 className='text-3xl font-bold mb-4'>Revenue Chart</h1>
      </div>
    </div>
  );
};

export default Statistics;
