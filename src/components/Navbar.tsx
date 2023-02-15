import useCalendarStore from "../store/useCalendarStore"
import { monthName } from "../constants/names"
import { MouseEvent } from "react"

const Navbar = () => {

    const month: number = useCalendarStore((state) => state.month) 
    const year: number = useCalendarStore((state) => state.year) 
    const setMonth: (data: number) => void = useCalendarStore((state) => state.setMonth) 
    const setYear: (data: number) => void = useCalendarStore((state) => state.setYear) 
    const setToday: () => void = useCalendarStore((state) => state.setToday)    
    
    const handlePrevMonth = (event: MouseEvent<HTMLElement>) => {        
        let newMonth = month - 1
        let newYear = year
        if (newMonth < 0) {
            newMonth = 11
            newYear -= 1
            setYear(newYear)
        }
        setMonth(newMonth)                  
    }

    const handleNextMonth = (event: MouseEvent<HTMLElement>) => {
        let newMonth = month + 1
        let newYear = year
        if (newMonth > 11) {
            newMonth = 0
            newYear += 1
            setYear(newYear)
        }
        setMonth(newMonth)        
    }

    const handleToday = (event: MouseEvent<HTMLElement>) => {
        setToday()
    }

    return (
        <>
            <button onClick={handleToday}>Today</button>
            <button onClick={handlePrevMonth}>Left</button>
            <button onClick={handleNextMonth}>Right</button>
            <span className="mx-1">{monthName[month]}</span>
            <span className="mx-1">{year}</span>
        </>
    )
}

export default Navbar