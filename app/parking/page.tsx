'use client'
import { useRef } from "react";
import GetBooking from "../components/GetBooking";

export default function Home() {
    const bookedRef = useRef<HTMLDivElement | null>(null);

    const handleScrollToBooked = () => {
        if (bookedRef.current) {
            bookedRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="min-w-screen flex flex-col justify-center bg-white">
            <div className="header flex flex-col w-full justify-center items-center px-4 mt-10">
                <img src="https://www.thainitrate.com/images/tnc-logo.png" alt="TNC Logo" className="h-20 mb-4" />
                <p className="text-center mb-2 text-2xl sm:text-3xl">เช็ควันจอดรถ</p>
            </div>
            <div className="mt-10">
                <GetBooking />   
                <div className="flex -w-full justify-end mx-8 mt-10">
                    <a
                        href="/"
                        className="text-center w-full sm:w-auto border border-transparent px-6 py-2 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                    >
                        กลับ
                    </a>
                </div>
            </div>

        </div>
    );
}
