'use client'
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

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/bookings');
        const data = await response.json();
        if (response.ok) {
          setBookings(data);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred');
      } finally {
        setLoading(false); 
      }
    };

    fetchBookings();
  }, []);

  if (loading) return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
      <div className="animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full"></div>
    </div>
  );

  if (error) return <div className="text-center py-4 text-red-500">{  }</div>;

  return (
    <div className="overflow-x-auto py-4">
      <table className="w-full table-auto bg-white border border-gray-100 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-50 text-xs sm:text-sm">
            <th className="px-2 sm:px-4 py-2 text-left border-b whitespace-nowrap">หมายเลขคิว</th>
            <th className="px-2 sm:px-4 py-2 text-left border-b whitespace-nowrap">หมายเลขทะเบียนรถขนส่ง</th>
            <th className="px-2 sm:px-4 py-2 text-left border-b whitespace-nowrap">บริษัทรถขนส่ง</th>
            <th className="px-2 sm:px-4 py-2 text-left border-b whitespace-nowrap">วันที่จอง</th>
            <th className="px-2 sm:px-4 py-2 text-left border-b whitespace-nowrap">ช่องที่จอง</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingId} className="hover:bg-gray-100 text-center text-xs sm:text-sm">
              <td className="px-2 sm:px-4 py-2 border-b">{booking.queueOrder}</td>
              <td className="px-2 sm:px-4 py-2 border-b">{booking.vehicleRegNo}</td>
              <td className="px-2 sm:px-4 py-2 border-b">{booking.transportCompany}</td>
              <td className="px-2 sm:px-4 py-2 border-b">
                {booking.parkingDate
                  ? new Date(booking.parkingDate.toString()).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })
                  : 'N/A'}
              </td>
              <td className="px-2 sm:px-4 py-2 border-b">{booking.parkingSlot}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
