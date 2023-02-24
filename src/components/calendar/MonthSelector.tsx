import useCalendarStore from "../../store/useCalendarStore";
import { monthNameShort } from "../../constants/names";
import dayjs from "dayjs";

const MonthSelector = () => {
  const yearInSelector: number = useCalendarStore(
    (state) => state.yearInSelector
  );
  const setMonth: (data: number) => void = useCalendarStore(
    (state) => state.setMonth
  );
  const setYear: (data: number) => void = useCalendarStore(
    (state) => state.setYear
  );
  const setYearInSelector: (data: number) => void = useCalendarStore(
    (state) => state.setYearInSelector
  );

  // handle click of month component
  const handleClickMonth = (e: React.MouseEvent<HTMLElement>) => {
    let target = e.target as HTMLInputElement;
    const month = monthNameShort.findIndex((mon) => mon === target.id);
    setMonth(month);
    setYear(yearInSelector);
  };

  // month components
  const monthRows = monthNameShort.map((month) => {
    return (
      <div
        id={month}
        key={month}
        className="ml-1 mt-1 w-8 cursor-pointer"
        onClick={(e) => {
          handleClickMonth(e);
        }}
      >
        {month}
      </div>
    );
  });

  const handlePrevYear: () => void = () => {
    setYearInSelector(yearInSelector - 1);
  };

  const handleNextYear: () => void = () => {
    setYearInSelector(yearInSelector + 1);
  };

  return (
    <>
      <div className="mt-5 flex w-36 flex-col items-center">
        <div className="flex items-center p-1">
          {/* <span className="mx-1">{monthNameShort[month]}</span> */}
          <button onClick={handlePrevYear} className="mr-2 text-xl font-bold">
            &#60;
          </button>
          <span className="mx-1">{yearInSelector}</span>
          <button onClick={handleNextYear} className="ml-2 text-xl font-bold">
            &#62;
          </button>
          {/* <button onClick={handleClickMonth}>Test</button>             */}
        </div>

        <div className="ml-1 flex flex-wrap justify-around">{monthRows}</div>
        <div className="my-1 mx-3">Today is</div>
        <div className="mx-3">{dayjs().format("DD MMM YYYY")}</div>
      </div>
    </>
  );
};

export default MonthSelector;
