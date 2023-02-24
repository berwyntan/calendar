import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import dayjs from "dayjs";
import {
  bookingsType,
  statusType,
  roomType,
  brandType,
} from "../constants/types";

interface CalendarState {
  month: number;
  year: number;
  setMonth: (data: number) => void;
  setYear: (data: number) => void;
  setToday: () => void;
  yearInSelector: number;
  setYearInSelector: (data: number) => void;
  confirmedBookings: bookingsType[];
  setConfirmedBookings: (data: bookingsType[]) => void;
  cancelledBookings: bookingsType[];
  setCancelledBookings: (data: bookingsType[]) => void;
  status: statusType[];
  setStatus: (data: statusType[]) => void;
  room: roomType[];
  setRoom: (data: roomType[]) => void;
  brand: brandType[];
  setBrand: (data: brandType[]) => void;
}

const useCalendarStore = create<CalendarState>()(
  devtools((set) => ({
    month: dayjs().month(), // month being viewed in main calendar
    year: dayjs().year(), // year being viewed in main calendar
    setMonth: (data) => set({ month: data }), // set month being viewed
    setYear: (data) => set({ year: data }), // set year being viewed
    setToday: () => {
      set({ month: dayjs().month() });
      set({ year: dayjs().year() }); // set month, year to today
    },
    yearInSelector: dayjs().year(), // year being viewed in side calendar
    setYearInSelector: (data) => set({ yearInSelector: data }), // set year being viewed in side calendar
    confirmedBookings: [], // confirmed bookings parsed from csv
    setConfirmedBookings: (data) => set({ confirmedBookings: data }), // set confirmed bookings parsed from csv
    cancelledBookings: [], // cancelled bookings parsed from csv
    setCancelledBookings: (data) => set({ cancelledBookings: data }), // set cancelled bookings parsed from csv
    status: [], // status categories parsed from bookings
    setStatus: (data) => set({ status: data }), // set/update status categories parsed from bookings
    room: [], // room categories parsed from bookings
    setRoom: (data) => set({ room: data }), // set/update room categories parsed from bookings
    brand: [], // brand categories parsed from bookings
    setBrand: (data) => set({ brand: data }), // set/update brand categories parsed from bookings
  }))
);

export default useCalendarStore;
