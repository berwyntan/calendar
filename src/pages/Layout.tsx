import Navbar from "../components/Navbar"
import MonthSelector from "../components/calendar/MonthSelector"
import CalendarMonthly from "../components/calendar/CalendarMonthly"
import EventsList from "../components/events/EventsList"
import useCalendarStore from "../store/useCalendarStore"

const Layout = () => {
    const month: number = useCalendarStore((state) => state.month) 
    const year: number = useCalendarStore((state) => state.year) 
    const setMonth: (data: number) => void = useCalendarStore((state) => state.setMonth) 
    const setYear: (data: number) => void = useCalendarStore((state) => state.setYear) 
    const setToday: () => void = useCalendarStore((state) => state.setToday)    
    
    // const handlePrevMonth: () => void = () => {        
    //     let newMonth = month - 1
    //     let newYear = year
    //     if (newMonth < 0) {
    //         newMonth = 11
    //         newYear -= 1
    //         setYear(newYear)
    //     }
    //     setMonth(newMonth)                  
    // }

    // const handleNextMonth: () => void = () => {
    //     let newMonth = month + 1
    //     let newYear = year
    //     if (newMonth > 11) {
    //         newMonth = 0
    //         newYear += 1
    //         setYear(newYear)
    //     }
    //     setMonth(newMonth)        
    // }

    // const handleToday: () => void = () => {
    //     setToday()
    // }
    
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
    )
}

export default Layout