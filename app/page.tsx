import Booked from "./components/Booked";
import GetBooking from "./components/GetBooking";


export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid place-content-center mt-10">
        <div className="flex -w-full justify-end">
          <a
            href="/parking"
            className="border border-gray-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-200 text-gray-800 font-medium"
          >
            + จองที่จอดรถ
          </a>
        </div>
        <GetBooking />
        <Booked/>
      </div>
    </div>
  );
}
