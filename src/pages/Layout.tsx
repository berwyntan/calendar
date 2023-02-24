import Navbar from "../components/Navbar";
import MonthSelector from "../components/calendar/MonthSelector";
import CalendarMonthly from "../components/calendar/CalendarMonthly";
import EventsList from "../components/events/EventsList";
import useCalendarStore from "../store/useCalendarStore";

import { useGetData } from "../hooks/useGetData";
import useGetBookingCat from "../hooks/useGetBookingCat";

const Layout = () => {
  const setConfirmedBookings = useCalendarStore(
    (state) => state.setConfirmedBookings
  );
  const setCancelledBookings = useCalendarStore(
    (state) => state.setCancelledBookings
  );
  const setStatus = useCalendarStore((state) => state.setStatus);
  const setRoom = useCalendarStore((state) => state.setRoom);
  const setBrand = useCalendarStore((state) => state.setBrand);

  const { parseConfirmedData, parseCancelledData } = useGetData();
  const { data: confirmedBookings } = parseConfirmedData();
  setConfirmedBookings(confirmedBookings);

  const { data: cancelledBookings } = parseCancelledData();
  setCancelledBookings(cancelledBookings);

  const { getStatusCat, getRoomCat, getBrandCat } = useGetBookingCat();
  const { status } = getStatusCat();
  setStatus(status);
  const { room } = getRoomCat();
  setRoom(room);
  const { brand } = getBrandCat();
  setBrand(brand);

  return (
    <>
      <div className="flex flex-col">
        <div>
          <Navbar />
        </div>
        <div className="flex">
          <div className="flex flex-col">
            <MonthSelector />
            <EventsList />
          </div>
          <CalendarMonthly />
        </div>
      </div>
    </>
  );
};

export default Layout;
