import { dayOfWeek } from "../../constants/names";
import dayjs from "dayjs";
import { ReactElement } from "react";
import useCalendarStore from "../../store/useCalendarStore";
import useFilterBookings from "../../hooks/useFilterBookings";
import useFilters from "../../hooks/useFilters";
import DayBox from "./DayBox";

const CalendarMonthly = () => {
  const month = useCalendarStore((state) => state.month);
  const year = useCalendarStore((state) => state.year);
  const confirmedBookings = useCalendarStore(
    (state) => state.confirmedBookings
  );
  const cancelledBookings = useCalendarStore(
    (state) => state.cancelledBookings
  );
  const allBookings = [...confirmedBookings, ...cancelledBookings];

  const {
    filterByCurrentMonth,
    filterByNextMonth,
    filterByPrevMonth,
    filterByDay,
  } = useFilterBookings();
  const { filterBookings } = useFilters();

  // render Monday to Sunday
  const days: ReactElement[] = dayOfWeek.map((day) => {
    return (
      <div className="ml-4 flex w-16 flex-grow" key={day}>
        {day}
      </div>
    );
  });

  // calculation for dateArray
  const current = dayjs(`${year}-${month + 1}-1`); // current month
  const currentMonth = current.month() + 1; // ISO format
  const currentYear = current.year();
  const firstDayOfMonth = dayjs(`${currentYear}-${currentMonth}-1`);
  const firstDayOfWeekMonth = dayjs(`${currentYear}-${currentMonth}-1`).day(); // get Mon-Sun
  const daysInCurrentMonth = firstDayOfMonth.daysInMonth();
  const lastDayOfWeekMonth = dayjs(
    `${currentYear}-${currentMonth}-${daysInCurrentMonth}`
  ).day();

  const daysInPrevMonth = current.subtract(1, "month").daysInMonth();

  const dateArray = [];

  // push dates for next month
  for (let i = 6 - lastDayOfWeekMonth; i > 0; i--) {
    // get bookings for next month
    const { renderInfo } = filterByNextMonth(allBookings);
    // filter bookings by day
    const { renderInfo: dayInfo } = filterByDay(renderInfo, i);
    // filter by status, room & brand
    const { filteredInfo } = filterBookings(dayInfo);
    // push into array
    dateArray.push({ i: i, currentMonth: false, events: filteredInfo });
  }
  // push dates for curr month
  for (let i = daysInCurrentMonth; i > 0; i--) {
    // get bookings for the month
    const { renderInfo } = filterByCurrentMonth(allBookings);
    // filter bookings by day
    const { renderInfo: dayInfo } = filterByDay(renderInfo, i);
    // filter by status, room & brand
    const { filteredInfo } = filterBookings(dayInfo);
    // push into array
    dateArray.push({ i: i, currentMonth: true, events: filteredInfo });
  }
  // push dates for prev month
  for (let i = firstDayOfWeekMonth; i > 0; i--) {
    // get bookings for the month
    const { renderInfo } = filterByPrevMonth(allBookings);
    // filter bookings by day
    const d = daysInPrevMonth - firstDayOfWeekMonth + i;
    const { renderInfo: dayInfo } = filterByDay(renderInfo, d);
    // filter by status, room & brand
    const { filteredInfo } = filterBookings(dayInfo);
    // push into array
    dateArray.push({ i: d, currentMonth: false, events: filteredInfo });
  }
  // console.log(dateArray)
  // rows to render - 1 row per week based on calendar
  const rowsArray = [];

  while (dateArray.length > 0) {
    const row = [];
    for (let i = 0; i < 7; i++) {
      row.push(dateArray.pop());
    }
    rowsArray.push(row);
  }

  // arrange dates
  const rowsRender = rowsArray.map((row, i) => {
    // height of daybox of there are 5 rows
    let ht = "h-32";
    // height of daybox of there are 6 rows
    if (rowsArray.length > 5) ht = "h-28";

    return (
      <div className="flex" key={i}>
        {row.map((day, j) => {
          const coord = "" + i + j;
          return (
            <DayBox
              day={day?.i}
              month={day?.currentMonth}
              events={day?.events}
              coord={coord}
              ht={ht}
              key={j}
            />
          );
        })}
      </div>
    );
  });

  return (
    <>
      <div className="flex flex-grow flex-col p-2">
        <div className="flex font-medium">{days}</div>
        <div className="flex flex-grow flex-col">{rowsRender}</div>
      </div>
    </>
  );
};

export default CalendarMonthly;
