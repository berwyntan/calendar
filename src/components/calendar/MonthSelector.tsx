import useCalendarStore from "../../store/useCalendarStore"
import { monthNameShort } from "../../constants/names"
import dayjs from "dayjs"

const MonthSelector = () => {
    
    const yearInSelector: number = useCalendarStore((state) => state.yearInSelector)
    const setMonth: (data: number) => void = useCalendarStore((state) => state.setMonth) 
    const setYear: (data: number) => void = useCalendarStore((state) => state.setYear) 
    const setYearInSelector: (data: number) => void = useCalendarStore((state) => state.setYearInSelector) 

    const handleClickMonth = (e: React.MouseEvent<HTMLElement>) => {
      let target = e.target as HTMLInputElement
      const month = monthNameShort.findIndex(mon => mon === target.id)
      setMonth(month)
      setYear(yearInSelector)
    }

    const monthRows = monthNameShort.map(month => {
      return (
        <div 
          id={month}
          key={month}
          className="w-8 ml-1 mt-1 cursor-pointer"
          onClick={(e) => {handleClickMonth(e)}}>
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
        <div className="flex flex-col w-36 mt-5 items-center">
            <div className="flex p-1">
              {/* <span className="mx-1">{monthNameShort[month]}</span> */}
              <button onClick={handlePrevYear} className="mr-2">&#60;&#60;</button>
              <span className="mx-1">{yearInSelector}</span>    
              <button onClick={handleNextYear} className="ml-2">&#62;&#62;</button>                     
              {/* <button onClick={handleClickMonth}>Test</button>             */}
            </div>
            
            <div className="flex flex-wrap justify-around ml-1">
              {monthRows}
            </div>
            <div className="my-1 mx-3">
              Today is
            </div>
            <div className="mx-3">
              {dayjs().format('DD MMM YYYY')}
            </div>
        </div>
      </>
    )
}

export default MonthSelector