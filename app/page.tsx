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
        <div className="flex -w-full justify-end">
          <button
            onClick={handleScrollToBooked}
            className="w-full sm:w-auto border border-transparent px-6 py-3 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
          >
            + จองที่จอดรถ
          </button>




        </div>
        <GetBooking />
        <div ref={bookedRef}>
          <Booked />
        </div>
      </div>
    </div>
  );
}
