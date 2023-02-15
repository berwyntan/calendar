import useCalendarStore from "../../store/useCalendarStore"
import { monthName } from "../../constants/names"

const MonthSelector = () => {
    const month: number = useCalendarStore((state) => state.month) 
    const year: number = useCalendarStore((state) => state.year) 

    return (
      <>
        <div className="flex flex-col">
            <span className="mx-1">{monthName[month]}</span>
            <span className="mx-1">{year}</span>
            {/* <button onClick={handleToday}>Today</button>
            <button onClick={handlePrevMonth}>Left</button>
            <button onClick={handleNextMonth}>Right</button>             */}
        </div>
      </>
    )
}

export default MonthSelector