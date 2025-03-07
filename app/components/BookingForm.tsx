import React from "react";

interface BookingFormProps {
  bookingData: {
    bookingId: string;
    parkingDate: string;
    chickInTIme: string;
    deliveryDate: string;
    vehicleRegNo: string;
    driverPhone: string;
    transportCompany: string;
    parkingSlot: number;
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

  const handleTransportCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCompany = e.target.value;
    onChange({ ...bookingData, transportCompany: selectedCompany });
  };

  const handleTransportCompanySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCompany = e.target.value;
    onChange({ ...bookingData, transportCompany: selectedCompany });
  };

  return (
    <form onSubmit={onSubmit} className="max-w-lg mx-auto p-4 space-y-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-center">แบบฟอร์มจองที่จอดรถ</h2>

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
        <label htmlFor="deliveryDate" className="text-sm font-medium">วันที่รับของ</label>
        <input
          id="deliveryDate"
          type="date"
          value={bookingData.deliveryDate}
          onChange={handleDeliveryDateChange}
          disabled
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="vehicleRegNo" className="text-sm font-medium">หมายเลขทะเบียนรถ</label>
        <input
          id="vehicleRegNo"
          type="text"
          value={bookingData.vehicleRegNo}
          onChange={(e) => onChange({ ...bookingData, vehicleRegNo: e.target.value })}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="driverPhone" className="text-sm font-medium">หมายเลขโทรศัพท์คนขับ</label>
        <input
          id="driverPhone"
          type="text"
          value={bookingData.driverPhone}
          onChange={(e) => onChange({ ...bookingData, driverPhone: e.target.value })}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="transportCompany" className="text-sm font-medium">เลือกบริษัทขนส่ง</label>
        <div className="flex items-center space-x-4">
          <label>
            <input
              type="radio"
              name="transportCompany"
              value="TMT"
              checked={bookingData.transportCompany === "TMT"}
              onChange={handleTransportCompanySelect}
              className="mr-2"
            />
            TMT
          </label>
          <label>
            <input
              type="radio"
              name="transportCompany"
              value="Other"
              checked={bookingData.transportCompany !== "TMT"}
              onChange={handleTransportCompanySelect}
              className="mr-2"
            />
            อื่นๆ
          </label>
        </div>
      </div>

      {bookingData.transportCompany !== "TMT" && (
        <div className="flex flex-col">
          <label htmlFor="otherTransportCompany" className="text-sm font-medium">กรอกชื่อบริษัท</label>
          <input
            id="otherTransportCompany"
            type="text"
            value={bookingData.transportCompany}
            onChange={handleTransportCompanyChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="กรอกชื่อบริษัท"
          />
        </div>
      )}

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer">
        บันทึกข้อมูล
      </button>
    </form>
  );
}

export default BookingForm;
