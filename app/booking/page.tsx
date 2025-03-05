'use client';
import { useEffect, useState } from 'react';
import BookingForm from '../components/BookingForm';
import { useRouter } from 'next/navigation';

interface ParkingData {
  parkingId: string;
  date: string;
  parkingSlot1: string;
  parkingSlot2: string;
  parkingSlot3: string;
  parkingSlot4: string;
  parkingSlot5: string;
  parkingSlot6: string;
  parkingSlot7: string;
  parkingSlot8: string;
  parkingSlot9: string;
  parkingSlot10: string;
}

interface BookingData {
  bookingId: string;
  queueOrder: string;
  parkingDate: string;
  deliveryDate: string;
  vehicleRegNo: string;
  driverPhone: string;
  transportCompany: string;
  parkingSlot: string;
}

export default function Parking() {
  const router = useRouter();
  const [parkings, setParkings] = useState<ParkingData[]>([]);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [bookingData, setBookingData] = useState({
    bookingId: '',
    parkingDate: '',
    deliveryDate: '',
    vehicleRegNo: '',
    driverPhone: '',
    transportCompany: '',
    parkingSlot: '',
  });
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toLocaleDateString('en-GB').split('/').reverse().join('-');
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch parking data
        const parkingResponse = await fetch('/api/parking');
        const parkingData = await parkingResponse.json();
        if (!parkingResponse.ok) throw new Error('Failed to fetch parking data');

        // Fetch booking data
        const bookingResponse = await fetch('/api/bookings');
        const bookingData = await bookingResponse.json();
        if (!bookingResponse.ok) throw new Error('Failed to fetch booking data');

        // Filter parking data by selected date
        const filteredParkings = parkingData.filter((parking: ParkingData) =>
          new Date(parking.date).toLocaleDateString('en-GB') === new Date(selectedDate).toLocaleDateString('en-GB')
        );

        // Filter bookings by selected date
        const filteredBookings = bookingData.filter((booking: BookingData) =>
          new Date(booking.parkingDate).toLocaleDateString('en-GB') === new Date(selectedDate).toLocaleDateString('en-GB')
        );

        setParkings(filteredParkings);
        setBookings(filteredBookings);
      } catch (err) {
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedDate]);

  const getSlotStatus = (slotNumber: number) => {
    const booking = bookings.find((b) => parseInt(b.parkingSlot) === slotNumber);
    if (booking) {
      return booking.vehicleRegNo; // Show vehicleRegNo if slot is booked
    }
    const parking = parkings[0];
    return parking ? parking[`parkingSlot${slotNumber}` as keyof ParkingData] : 'ว่าง'; // Default to "available" if no booking
  };

  const handleClick = (slot: number) => {
    const slotStatus = getSlotStatus(slot);
    if (slotStatus !== 'ว่าง') return; // Prevent clicking on booked slots

    setSelectedSlot(slot);
    const parkingDate = parkings[0]?.date || '';
    if (parkingDate) {
      const localDate = new Date(parkingDate);
      localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
      const formattedParkingDate = localDate.toISOString().slice(0, 16);

      setBookingData({
        ...bookingData,
        parkingSlot: slot.toString(),
        parkingDate: formattedParkingDate,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const dataToSend = { ...bookingData, type: 'booking' };
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });
    const data = await response.json();

    if (data.error) {
      alert(`Error: ${data.error}`);
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  if (loading) return (
    <div className="fixed inset-0 bg-white bg-opacity-50 grid justify-center items-center z-50">
      <div className="animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full"></div>
    </div>
  );

  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="py-4 px-4 flex flex-col items-center">
      {/* Date Section */}
      <div className="flex flex-col md:flex-row gap-2 items-center mb-4 mt-6">
        <p className="border px-2 text-sm md:text-base rounded-md shadow-md py-1 border-teal-400">วันที่ต้องการจอง</p>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border px-2 text-sm md:text-base rounded-md shadow-md py-1 border-teal-400"
        />
      </div>

      <div className="p-4 rounded-lg w-full max-w-md md:max-w-3xl flex flex-col items-center">
        <div className="flex flex-row justify-center items-start gap-4 w-full">
          {/* Left Parking */}
          <div className="flex flex-col gap-2">
            {[...Array(7)].map((_, i) => {
              const slotNumber = i + 1;
              const slotStatus = getSlotStatus(slotNumber);
              const isBooked = slotStatus !== 'ว่าง';

              return (
                <button
                  key={i}
                  onClick={() => !isBooked && handleClick(slotNumber)}
                  disabled={isBooked}
                  className={`cursor-pointer border border-gray-300 px-2 py-1 md:px-4 md:py-2 ${
                    isBooked ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-300'
                  } transition w-20 md:w-24 text-sm md:text-base text-center rounded-md shadow-md`}
                >
                  {slotStatus}
                </button>
              );
            })}
          </div>

          {/* Factory */}
          <div className="bg-blue-300 w-40 h-64 md:w-72 md:h-72 lg:w-72 lg:h-72 relative grid place-items-center rounded-md shadow-md">
            <p className="text-center text-2xl">โรงงาน</p>
            <div className="absolute bottom-0 right-0 border w-1/3 h-1/4 bg-white rounded-md shadow-md">
              <p className="absolute bottom-0 left-1/2 -translate-x-1/2 m-0 text-lg">ประตู</p>
            </div>
          </div>
        </div>

        {/* Front Parking */}
        <div className="flex flex-row gap-2 mt-4 justify-center w-full">
          {[...Array(3)].map((_, i) => {
            const slotNumber = i + 8;
            const slotStatus = getSlotStatus(slotNumber);
            const isBooked = slotStatus !== 'ว่าง';

            return (
              <button
                key={i}
                onClick={() => !isBooked && handleClick(slotNumber)}
                disabled={isBooked}
                className={`cursor-pointer border border-gray-300 px-2 py-1 md:px-4 md:py-2 ${
                  isBooked ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-300'
                } transition w-20 md:w-24 text-sm md:text-base text-center rounded-md shadow-md`}
              >
                {slotStatus}
              </button>
            );
          })}
        </div>
      </div>

      {/* Booking Form */}
      {selectedSlot && (
        <BookingForm
          bookingData={bookingData}
          onSubmit={handleSubmit}
          onChange={setBookingData}
        />
      )}

      <div className="flex w-full justify-end mt-4">
        <a
          href="/"
          className="border border-gray-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-200 text-gray-800 font-medium"
        >
          หน้าหลัก
        </a>
      </div>
    </div>
  );
}