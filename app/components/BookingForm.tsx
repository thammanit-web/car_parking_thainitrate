import React, { useState } from "react";

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

const PASSCODES = ["helloworld", "thammanitrinthangadminsondesktop", "error"];

function BookingForm({ bookingData, onSubmit, onChange }: BookingFormProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passcode, setPasscode] = useState("");

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      onChange({ ...bookingData, driverPhone: value });
    }
  };

  const validateForm = () => {
    const formErrors: { [key: string]: string } = {};

    if (!bookingData.chickInTIme) formErrors.chickInTIme = "กรุณาใส่เวลาเข้าจอด";
    if (!bookingData.deliveryDate) formErrors.deliveryDate = "กรุณาเลือกวันที่รับของ";
    if (!bookingData.vehicleRegNo) formErrors.vehicleRegNo = "กรุณากรอกหมายเลขทะเบียนรถ";
    if (!bookingData.driverPhone) formErrors.driverPhone = "กรุณากรอกหมายเลขโทรศัพท์";
    if (!bookingData.transportCompany) formErrors.transportCompany = "กรุณาเลือกบริษัทขนส่ง";
    if (!PASSCODES.includes(passcode)) formErrors.passcode = "รหัสผ่านไม่ถูกต้อง";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(e);
    } else {
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-center">แบบฟอร์มจองที่จอดรถ</h2>

      <div className="flex flex-col">
        <label htmlFor="chickInTIme" className="text-sm font-medium">เวลาเข้าจอด</label>
        <input
          id="chickInTIme"
          type="time"
          value={bookingData.chickInTIme}
          onChange={(e) => onChange({ ...bookingData, chickInTIme: e.target.value })}
          className={`mt-1 px-3 py-2 border ${errors.chickInTIme ? "border-red-500" : "border-gray-300"} rounded-md`}
        />
        {errors.chickInTIme && <p className="text-red-500 text-sm">{errors.chickInTIme}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="deliveryDate" className="text-sm font-medium">วันที่รับของ</label>
        <input
          id="deliveryDate"
          type="date"
          value={bookingData.deliveryDate}
          onChange={handleDeliveryDateChange}
          disabled
          className={`mt-1 px-3 py-2 border ${errors.deliveryDate ? "border-red-500" : "border-gray-300"} rounded-md bg-gray-50`}
        />
        {errors.deliveryDate && <p className="text-red-500 text-sm">{errors.deliveryDate}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="vehicleRegNo" className="text-sm font-medium">หมายเลขทะเบียนรถ</label>
        <input
          id="vehicleRegNo"
          type="text"
          value={bookingData.vehicleRegNo}
          onChange={(e) => onChange({ ...bookingData, vehicleRegNo: e.target.value })}
          className={`mt-1 px-3 py-2 border ${errors.vehicleRegNo ? "border-red-500" : "border-gray-300"} rounded-md`}
          placeholder="ใส่แค่หมายเลขทะเบียน"
        />
        {errors.vehicleRegNo && <p className="text-red-500 text-sm">{errors.vehicleRegNo}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="driverPhone" className="text-sm font-medium">หมายเลขโทรศัพท์คนขับ</label>
        <input
          id="driverPhone"
          type="text"
          value={bookingData.driverPhone}
          onChange={handlePhoneChange}
          maxLength={10}
          className={`mt-1 px-3 py-2 border ${errors.driverPhone ? "border-red-500" : "border-gray-300"} rounded-md`}
          placeholder="กรอกหมายเลขโทรศัพท์ 10 หลัก"
        />
        {errors.driverPhone && <p className="text-red-500 text-sm">{errors.driverPhone}</p>}
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
              checked={bookingData.transportCompany === "Other"}
              onChange={handleTransportCompanySelect}
              className="mr-2"
            />
            อื่นๆ
          </label>

        </div>
        {errors.transportCompany && <p className="text-red-500 text-sm">{errors.transportCompany}</p>}
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

<div className="flex flex-col">
        <label htmlFor="passcode" className="text-sm font-medium">รหัสผ่าน</label>
        <input
          id="passcode"
          type="text"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          className={`mt-1 px-3 py-2 border ${errors.passcode ? "border-red-500" : "border-gray-300"} rounded-md`}
          placeholder="กรอกรหัสผ่าน"
        />
        {errors.passcode && <p className="text-red-500 text-sm">{errors.passcode}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer"
      >
        บันทึกข้อมูล
      </button>
    </form>
  );
}

export default BookingForm;
