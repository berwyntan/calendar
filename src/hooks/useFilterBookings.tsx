import useCalendarStore from "../store/useCalendarStore";
import { bookingsType } from "../constants/types";

const useFilterBookings = () => {
  const month = useCalendarStore((state) => state.month);
  const year = useCalendarStore((state) => state.year);
  const status = useCalendarStore((state) => state.status);
  const room = useCalendarStore((state) => state.room);
  const brand = useCalendarStore((state) => state.brand);

  // filter by current month year
  const filterByCurrentMonth = (unfiltered: bookingsType[]) => {
    let renderInfo: bookingsType[] = [];

    for (const booking of unfiltered) {
      const checkMonth = parseInt(booking?.date.split("-")[1]) - 1; // months start from 0

      const checkYear = parseInt(booking?.date.split("-")[0]);

      if (checkMonth === month && checkYear === year) {
        renderInfo.push(booking);
      }
    }
    return { renderInfo };
  };

  // filter by next month
  const filterByNextMonth = (unfiltered: bookingsType[]) => {
    let renderInfo: bookingsType[] = [];

    for (const booking of unfiltered) {
      let checkMonth = parseInt(booking?.date.split("-")[1]) - 1; // months start from 0

      let checkYear = parseInt(booking?.date.split("-")[0]);

      let nextMonth = month + 1;
      let nextYear = year;
      if (nextMonth > 11) {
        nextMonth = 0;
        nextYear += 1;
      }

      if (checkMonth === nextMonth && checkYear === nextYear) {
        renderInfo.push(booking);
      }
    }
    return { renderInfo };
  };

  // filter by prev month
  const filterByPrevMonth = (unfiltered: bookingsType[]) => {
    let renderInfo: bookingsType[] = [];

    for (const booking of unfiltered) {
      let checkMonth = parseInt(booking?.date.split("-")[1]) - 1; // months start from 0

      let checkYear = parseInt(booking?.date.split("-")[0]);

      let prevMonth = month - 1;
      let prevYear = year;
      if (prevMonth < 0) {
        prevMonth = 11;
        prevYear -= 1;
      }

      if (checkMonth === prevMonth && checkYear === prevYear) {
        renderInfo.push(booking);
      }
    }
    return { renderInfo };
  };

  // filter by day
  const filterByDay = (unfiltered: bookingsType[], day: number) => {
    let renderInfo: bookingsType[] = [];

    for (const booking of unfiltered) {
      const checkDay = parseInt(booking?.date.split("-")[2]);
      if (checkDay === day) {
        renderInfo.push(booking);
      }
    }
    return { renderInfo };
  };

  // filter by status
  const filterByStatus = (unfiltered: bookingsType[]) => {
    let renderInfo: bookingsType[] = [];
    const statusToRender: string[] = [];

    for (const stat of status) {
      if (stat.visible) {
        statusToRender.push(stat.name);
      }
    }

    for (const booking of unfiltered) {
      for (const stat of statusToRender) {
        if (booking.status === stat) {
          renderInfo.push(booking);
        }
      }
    }
    return { renderInfo };
  };

  // filter by room type
  const filterByRoom = (unfiltered: bookingsType[]) => {
    let renderInfo: bookingsType[] = [];
    const roomToRender: string[] = [];

    for (const r of room) {
      if (r.visible) {
        roomToRender.push(r.name);
      }
    }

    for (const booking of unfiltered) {
      for (const room of roomToRender) {
        if (booking.type === room) {
          renderInfo.push(booking);
        }
      }
    }
    return { renderInfo };
  };

  // filter by brand
  const filterByBrand = (unfiltered: bookingsType[]) => {
    let renderInfo: bookingsType[] = [];
    const brandToRender: string[] = [];

    for (const b of brand) {
      if (b.visible) {
        brandToRender.push(b.name);
      }
    }

    for (const booking of unfiltered) {
      const codeArr = booking.code.split("_");
      const brand = codeArr[1] + " " + codeArr[2];
      for (const b of brandToRender) {
        if (b === brand) {
          renderInfo.push(booking);
        }
      }
    }
    return { renderInfo };
  };

  return {
    filterByCurrentMonth,
    filterByNextMonth,
    filterByPrevMonth,
    filterByDay,
    filterByStatus,
    filterByRoom,
    filterByBrand,
  };
};

export default useFilterBookings;
