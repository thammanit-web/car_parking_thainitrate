'use client';
import { useEffect, useState } from 'react';

interface Booking {
  bookingId: string;
  queueOrder: string;
  parkingDate: string;
  deliveryDate: string;
  vehicleRegNo: string;
  driverPhone: string;
  transportCompany: string;
  parkingSlot: string;
  chickInTIme: string;
}

const BookingTable = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/bookings');
        const data = await response.json();
        if (response.ok) {
          setBookings(data);
          setFilteredBookings(data);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred while fetching bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      setFilteredBookings(
        bookings.filter(
          (booking) => 
            new Date(booking.parkingDate).toLocaleDateString('en-GB') === new Date(selectedDate).toLocaleDateString('en-GB')
        )
      );
    } else {
      setFilteredBookings(bookings);
    }
  }, [selectedDate, bookings]);
  

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex justify-center items-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-600 font-medium">{error}</div>
    );
  }

  return (
    <div className="py-4 flex flex-col items-center">
      <div className="mb-4 w-full flex justify-center items-center gap-2 px-4">
        <label className='w-20 rounded-md underline text-xs'>เลือกวันที่</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border border-gray-300 rounded-lg p-3 w-full sm:w-auto bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      <div className="max-w-full overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-gray-50">
        <table className="w-full table-auto divide-y divide-gray-200 mx-4 sm:mx-8">
          <thead className="bg-gray-50">
            <tr className="text-xs uppercase tracking-wider text-gray-700 text-center">
              <th className="px-2 py-2 sm:px-4 font-semibold">คิว</th>
              <th className="px-2 py-2 sm:px-4 font-semibold">หมายเลขทะเบียนรถ</th>
              <th className="px-2 py-2 sm:px-4 font-semibold">บริษัท</th>
              <th className="px-2 py-2 sm:px-4 font-semibold">วันที่จอง</th>
              <th className="px-2 py-2 sm:px-4 font-semibold">ช่องจอด</th>
              <th className="px-2 py-2 sm:px-4 font-semibold">เบอร์คนขับ</th>
              <th className="px-2 py-2 sm:px-4 font-semibold">เวลาเข้าจอด</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-2 text-center text-gray-500">
                  ไม่มีการจอง
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr
                  key={booking.bookingId}
                  className="hover:bg-gray-50 transition-colors text-sm text-gray-800 text-center bg-white"
                >
                  <td className="px-2 py-2 sm:px-4">{booking.queueOrder}</td>
                  <td className="px-2 py-2 sm:px-4">{booking.vehicleRegNo}</td>
                  <td className="px-2 py-2 sm:px-4">{booking.transportCompany}</td>
                  <td className="px-2 py-2 sm:px-4">
                    {booking.parkingDate
                      ? new Date(booking.parkingDate).toLocaleString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })
                      : 'N/A'}
                  </td>
                  <td className="px-2 py-2 sm:px-4">{booking.parkingSlot}</td>
                  <td className="px-2 py-2 sm:px-4">{booking.driverPhone}</td>
                   <td className="px-2 py-2 sm:px-4">
                     {new Date(booking.chickInTIme).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;
