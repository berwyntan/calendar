import useCalendarStore from "../../store/useCalendarStore"
import { monthNameShort } from "../../constants/names"

const MonthSelector = () => {
    const month: number = useCalendarStore((state) => state.month) 
    const year: number = useCalendarStore((state) => state.year) 
    const yearInSelector: number = useCalendarStore((state) => state.yearInSelector)
    const setMonth: (data: number) => void = useCalendarStore((state) => state.setMonth) 
    const setYear: (data: number) => void = useCalendarStore((state) => state.setYear) 
    const setYearInSelector: (data: number) => void = useCalendarStore((state) => state.setYearInSelector) 

    const monthRows = monthNameShort.map(month => {
      return (
        <div 
          id={month}
          className="w-10"
          onClick={(e) => {
            console.log(e.target)
            let target = e.target as HTMLInputElement
            console.log(target.id)
            }}>
            {month}
          </div>
      )
    })

    const handlePrevYear: () => void = () => {        
        setYearInSelector(yearInSelector - 1)              
    }

    const handleNextYear: () => void = () => {
        setYearInSelector(yearInSelector + 1)         
    }

    return (
      <>
        <div className="flex flex-col w-28">
            <div className="flex flex-wrap">
              {/* <span className="mx-1">{monthNameShort[month]}</span> */}
              <span className="mx-1">{yearInSelector}</span>
              <button onClick={handlePrevYear}>Left</button>
              <button onClick={handleNextYear}>Right</button>            
            </div>
            <div className="flex flex-wrap">
              {monthRows}
            </div>
            <div>
              Today is 
            </div>
        </div>
      </>
    )
}

export default MonthSelector