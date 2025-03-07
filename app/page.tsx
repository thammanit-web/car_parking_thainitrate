'use client'
import { useRef } from "react";
import Booked from "./components/Booked";
import GetBooking from "./components/GetBooking";

export default function Home() {
  const bookedRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToBooked = () => {
    if (bookedRef.current) {
      bookedRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid place-content-center mt-10">
        <div className="header flex flex-col w-full justify-center items-center">
          <img src="https://www.thainitrate.com/images/tnc-logo.png" alt="TNC Logo" className="h-20 mb-4" />
          <p className="text-center mb-2 text-2xl">จองที่จอดรถรอรับสินค้า(ค้างคืน)</p>
          <hr className="border-gray-400 mb-4 w-full" />
          <p className="text-center mb-4">ของบริษัท ไนเตรทไทย จำกัด</p>
          <p className="font-semibold text-center mb-4 mx-10">**จากข้อร้องเรียนปัญหารถที่มาจอดรอรับสินค้าของ บ. ไนเตรทไทย ส่งผลกระทบกับความไม่ปลอดภัยของผู้อื่น จึงจำเป็นต้องประกาศข้อห้ามดังนี้</p>
          <div className="text-left mb-4 space-y-2">
            <p>1.ห้ามจอดรถทุกชนิด เกินขอบรั้วโรงงาน ไนเตรทไทย</p>
            <p>2.ห้ามไปกลับรถ บนพื้นที่ของผู้อื่น</p>
          </div>
          <p className="text-center">-- ต้องขออภัยในความไม่สะดวกและขอบคุณในความร่วมมือ --</p>
          <hr className="border-gray-400 mt-4 mb-4 w-full" />
        </div>

        <div className="flex -w-full justify-end mx-8">
          <button
            onClick={handleScrollToBooked}
            className="w-full sm:w-auto border border-transparent px-6 py-3 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
          >
            เช็คการจอง
          </button>
        </div>
        <Booked />
        <div ref={bookedRef}>
          <GetBooking />
        </div>
      </div>
    </div>
  );
}
