'use client';
import { useEffect, useState } from 'react';
import BookingForm from '../components/BookingForm';
import { useRouter } from 'next/navigation';
import { Modal } from './Modal';

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
  chickInTIme: string;
  deliveryDate: string;
  vehicleRegNo: string;
  driverPhone: string;
  transportCompany: string;
  parkingSlot: string;
}

export default function Parking() {
  const router = useRouter();
  const [parkings, setParkings] = useState<ParkingData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [bookingData, setBookingData] = useState({
    bookingId: '',
    parkingDate: '',
    chickInTIme: '',
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
        const parkingResponse = await fetch('/api/parking');
        const parkingData = await parkingResponse.json();
        if (!parkingResponse.ok) throw new Error('Failed to fetch parking data');

        const bookingResponse = await fetch('/api/bookings');
        const bookingData = await bookingResponse.json();
        if (!bookingResponse.ok) throw new Error('Failed to fetch booking data');

        const filteredParkings = parkingData.filter((parking: ParkingData) =>
          new Date(parking.date).toLocaleDateString('en-GB') === new Date(selectedDate).toLocaleDateString('en-GB')
        );

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const parkingResponse = await fetch('/api/parking');
      const parkingData = await parkingResponse.json();
      if (!parkingResponse.ok) throw new Error('Failed to fetch parking data');

      const bookingResponse = await fetch('/api/bookings');
      const bookingData = await bookingResponse.json();
      if (!bookingResponse.ok) throw new Error('Failed to fetch booking data');

      const filteredParkings = parkingData.filter((parking: ParkingData) =>
        new Date(parking.date).toLocaleDateString('en-GB') === new Date(selectedDate).toLocaleDateString('en-GB')
      );

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

  const getSlotStatus = (slotNumber: number) => {
    const booking = bookings.find((b) => parseInt(b.parkingSlot) === slotNumber);
    if (booking) return booking.vehicleRegNo;
    const parking = parkings[0];
    return parking ? parking[`parkingSlot${slotNumber}` as keyof ParkingData] : 'ว่าง';
  };

  const handleClick = (slot: number) => {
    setIsModalOpen(true);
    const slotStatus = getSlotStatus(slot);
    if (slotStatus !== 'ว่าง') return;

    setSelectedSlot(slot);
    const parkingDate = parkings[0]?.date || '';
    if (parkingDate) {
      const localDate = new Date(parkingDate);
      localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
      const formattedParkingDate = localDate.toISOString().slice(0, 10);

      const deliveryDate = new Date(localDate);
      deliveryDate.setDate(deliveryDate.getDate() + 1);

      if (deliveryDate.getDay() === 6) {
        deliveryDate.setDate(deliveryDate.getDate() + 2);
      } else if (deliveryDate.getDay() === 0) {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
      }

      const formattedDeliveryDate = deliveryDate.toISOString().slice(0, 10);

      setBookingData({
        ...bookingData,
        parkingSlot: slot.toString(),
        parkingDate: formattedParkingDate,
        deliveryDate: formattedDeliveryDate,
      });
    }
  };
  const handleChange = (data: any) => {
    setBookingData(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSend = { ...bookingData, type: 'booking' };
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      const data = await response.json();
      await fetchData(); 
      if (data.error) {
        alert(`Error: ${data.error}`);
      } else {
        setSelectedSlot(null);
        setBookingData({
          bookingId: '',
          parkingDate: '',
          chickInTIme: '',
          deliveryDate: '',
          vehicleRegNo: '',
          driverPhone: '',
          transportCompany: '',
          parkingSlot: '',
        });
      
      }
    } catch (err) {
      alert('An error occurred while submitting');
      setIsModalOpen(false);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="py-4 flex flex-col items-center">
      <div className='text-center w-full items-center justify-center grid'>
        <label className="text-sm md:text-base font-medium text-gray-700 underline">รายละเอียดช่องจอด</label>
        <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-1">
          <div className="flex flex-col flex-1 text-center">
            {/* Using loop to generate number blocks */}
            {[10, 9, 8, 7, 6, 5, 4].map((number) => (
              <div key={number} className="border h-9 w-10 flex items-center justify-center text-sm">
                {number}
              </div>
            ))}
          </div>
          <div className="flex bg-gray-300">
            <img
              src="img/factory.jpg"
              alt="Image"
              className="object-cover h-64"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex flex-row flex-1 text-center">
          <div className="h-8 w-10"></div>
          {[3, 2, 1].map((number) => (
            <div key={number} className="border h-8 w-10 flex items-center justify-center text-sm">
              {number}
            </div>
          ))}
        </div>
      </div>
      </div>
      <hr className="border-gray-400 mt-4 w-full" />
      <div className="flex flex-col md:flex-row items-center mt-4 gap-2">
        <label className="text-sm md:text-base font-medium text-gray-700 underline">วันที่ต้องการจอง</label>
        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={new Date(new Date().setDate(new Date().getDate())).toISOString().split("T")[0]}
            max={new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split("T")[0]}  
            className="border border-teal-400 rounded-lg px-3 py-2 text-sm md:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 w-full md:w-64 bg-white"
          />
        </div>
      </div>
      <div className="p-4 rounded-lg w-full max-w-md md:max-w-3xl flex flex-col items-center">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin border-t-4 border-blue-500 border-solid w-12 h-12 rounded-full"></div>
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center w-full">
              <div className="flex">
                {[...Array(5)].map((_, i) => {
                  const slotNumber = i + 1; // ช่องจอด 1-5
                  const slotStatus = getSlotStatus(slotNumber);
                  const isBooked = slotStatus !== 'ว่าง';

                  return (
                    <div key={slotNumber} className="border-b border-l border-r border-black">
                      <button
                        onClick={() => !isBooked && handleClick(slotNumber)}
                        disabled={isBooked}
                        className={`h-36 w-16 md:w-16 text-sm md:text-base text-center rounded-md transition border-gray-500
              mx-2 mb-2 border flex flex-col items-center justify-center
              ${isBooked ? 'bg-gray-100 border-gray-300 cursor-not-allowed' : 'bg-white  hover:bg-gray-50 cursor-pointer'} 
              focus:outline-none focus:ring-2 focus:ring-blue-400`}
                      >
                        {isBooked ? (
                          <>
                            <img src="/img/truck.png" className="px-2 transform rotate-180" />
                            <span className='mb-2'>{slotStatus}</span>
                          </>
                        ) : (
                          `ช่องจอด ${slotNumber}`
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex">
                {[...Array(5)].map((_, i) => {
                  const slotNumber = i + 6; // ช่องจอด 6-10
                  const slotStatus = getSlotStatus(slotNumber);
                  const isBooked = slotStatus !== 'ว่าง';

                  return (
                    <div key={slotNumber} className="border-t border-l border-r border-black">
                      <button
                        onClick={() => !isBooked && handleClick(slotNumber)}
                        disabled={isBooked}
                        className={`h-36 md:h-36 w-16 md:w-16 text-sm md:text-base text-center rounded-md transition border-gray-500
              mx-2 border mt-2 flex flex-col items-center justify-center
              ${isBooked ? 'bg-gray-100 border-gray-300 cursor-not-allowed' : 'bg-white  hover:bg-gray-50 cursor-pointer'} 
              focus:outline-none focus:ring-2 focus:ring-blue-400`}
                      >
                        {isBooked ? (
                          <><span className='mะ-2'>{slotStatus}</span>
                            <img src="/img/truck.png" className="px-2" />

                          </>
                        ) : (
                          `ช่องจอด ${slotNumber}`
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedSlot && (
              <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <BookingForm
                  bookingData={{ ...bookingData, parkingSlot: selectedSlot }}
                  onSubmit={handleSubmit}
                  onChange={handleChange}
                />
              </Modal>
            )}

          </>
        )}
      </div>
    </div>
  );
}