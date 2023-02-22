import useCalendarStore from "../store/useCalendarStore"
import { monthName } from "../constants/names"

const Navbar = () => {

    const month: number = useCalendarStore((state) => state.month) 
    const year: number = useCalendarStore((state) => state.year) 
    const setMonth: (data: number) => void = useCalendarStore((state) => state.setMonth) 
    const setYear: (data: number) => void = useCalendarStore((state) => state.setYear) 
    const setToday: () => void = useCalendarStore((state) => state.setToday)

    const handlePrevMonth: () => void = () => {        
        let newMonth = month - 1
        let newYear = year
        if (newMonth < 0) {
            newMonth = 11
            newYear -= 1
            setYear(newYear)
        }
        setMonth(newMonth)                  
    }

    const handleNextMonth: () => void = () => {
        let newMonth = month + 1
        let newYear = year
        if (newMonth > 11) {
            newMonth = 0
            newYear += 1
            setYear(newYear)
        }
        setMonth(newMonth)        
    }

    const handleToday: () => void = () => {
        setToday()
    }
    
    return (
        <>
            <div className="flex items-center p-3">
                <span className="mx-1 mr-5 text-2xl font-extrabold">Calendar</span>
                <button onClick={handleToday}
                    className="btn btn-outline btn-sm mx-4">Today</button>
                <button className="btn btn-outline btn-sm w-20"
                    onClick={handlePrevMonth}>Left</button>
                <button className="btn btn-outline btn-sm w-20"
                    onClick={handleNextMonth}>Right</button>
                <span className="mx-1 ml-5 text-lg font-medium">{monthName[month]}</span>
                <span className="mx-1 text-lg font-medium">{year}</span>
            </div>
        </>
    )
}

export default Navbar