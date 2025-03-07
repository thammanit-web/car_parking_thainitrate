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
}

const BookingTable = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

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
      const filtered = bookings.filter((booking) => {
        const bookingDate = new Date(booking.parkingDate).toLocaleDateString();
        const selected = new Date(selectedDate).toLocaleDateString();
        return bookingDate === selected;
      });
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(bookings);
    }
  }, [selectedDate, bookings]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex justify-center items-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-600 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded p-2"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
        <table className="w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-xs uppercase tracking-wider text-gray-700 text-center">
              <th className="px-2 py-2 sm:px-4 font-semibold">คิว</th>
              <th className="px-2 py-2 sm:px-4 font-semibold">หมายเลขทะเบียนรถ</th>
              <th className="px-2 py-2 sm:px-4 font-semibold">บริษัท</th>
              <th className="px-2 py-2 sm:px-4 font-semibold">วันที่จอง</th>
              <th className="px-2 py-2 sm:px-4 font-semibold">ช่องจอด</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr
                  key={booking.bookingId}
                  className="hover:bg-gray-50 transition-colors text-sm text-gray-800 text-center "
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
