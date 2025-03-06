interface BookingFormProps {
  bookingData: {
    bookingId: string;
    parkingDate: string;
    chickInTIme: string;
    deliveryDate: string;
    vehicleRegNo: string;
    driverPhone: string;
    transportCompany: string;
    parkingSlot: string;
  };
  onSubmit: (e: React.FormEvent) => void;
  onChange: (data: any) => void;
}

function BookingForm({ bookingData, onSubmit, onChange }: BookingFormProps) {
  const isWeekend = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const handleDeliveryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (isWeekend(selectedDate)) {
      alert("ไม่สามารถรับเลือกของวันเสาร์ และ อาทิตย์ได้.");
      onChange({ ...bookingData, deliveryDate: "" });
    } else {
      onChange({ ...bookingData, deliveryDate: selectedDate });
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-lg mx-auto p-4 space-y-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center">Parking Slot Booking</h2>

      <div className="flex flex-col">
        <label htmlFor="parkingSlot" className="text-sm font-medium">ช่องจอด</label>
        <input
          id="parkingSlot"
          type="number"
          value={bookingData.parkingSlot}
          onChange={(e) => onChange({ ...bookingData, parkingSlot: e.target.value })}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="chickInTIme" className="text-sm font-medium">เวลาเข้าจอด</label>
        <input
          id="chickInTIme"
          type="time"
          value={bookingData.chickInTIme}
          onChange={(e) => onChange({ ...bookingData, chickInTIme: e.target.value })}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>


      <div className="flex flex-col">
        <label htmlFor="deliveryDate" className="text-sm font-medium">Delivery Date</label>
        <input
          id="deliveryDate"
          type="date"
          value={bookingData.deliveryDate}
          onChange={handleDeliveryDateChange}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="vehicleRegNo" className="text-sm font-medium">Vehicle Registration Number</label>
        <input
          id="vehicleRegNo"
          type="text"
          value={bookingData.vehicleRegNo}
          onChange={(e) => onChange({ ...bookingData, vehicleRegNo: e.target.value })}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="driverPhone" className="text-sm font-medium">Driver Phone</label>
        <input
          id="driverPhone"
          type="text"
          value={bookingData.driverPhone}
          onChange={(e) => onChange({ ...bookingData, driverPhone: e.target.value })}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="transportCompany" className="text-sm font-medium">Transport Company</label>
        <input
          id="transportCompany"
          type="text"
          value={bookingData.transportCompany}
          onChange={(e) => onChange({ ...bookingData, transportCompany: e.target.value })}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer">
        Book Slot
      </button>
    </form>
  );
}

export default BookingForm;