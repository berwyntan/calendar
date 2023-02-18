import { dayOfWeek } from "../../constants/names"
import dayjs from "dayjs"
import { ReactElement } from "react"
import useCalendarStore from "../../store/useCalendarStore"
import useFilterBookings from "../../hooks/useFilterBookings"
import DayBox from "./DayBox"


const CalendarMonthly = () => {

    const month = useCalendarStore((state) => state.month) 
    const year = useCalendarStore((state) => state.year) 
    const confirmedBookings = useCalendarStore((state) => state.confirmedBookings) 
    const cancelledBookings = useCalendarStore((state) => state.cancelledBookings) 
    
    const { filterByCurrentMonth, filterByNextMonth, filterByPrevMonth, filterByDay } = useFilterBookings()

    // render Monday to Sunday
    const days: ReactElement[] = dayOfWeek.map((day) => {
        return (
            <div className="w-28 h-8" key={day}>
                {day}
            </div>
        )
    })
    const current = dayjs(`${year}-${month+1}-1`) // current month
    const currentMonth = current.month() + 1 // ISO format
    const currentYear = current.year()
    const firstDayOfMonth = dayjs(`${currentYear}-${currentMonth}-1`)    
    const firstDayOfWeekMonth = dayjs(`${currentYear}-${currentMonth}-1`).day() // get Mon-Sun   
    const daysInCurrentMonth = firstDayOfMonth.daysInMonth()
    const lastDayOfWeekMonth = dayjs(`${currentYear}-${currentMonth}-${daysInCurrentMonth}`).day()

    const daysInPrevMonth = current.subtract(1, 'month').daysInMonth()    

    const dateArray = []

    // push dates for next month
    for (let i=6-lastDayOfWeekMonth; i>0; i--) {
        // get bookings for next month
        const { renderInfo } = filterByNextMonth(confirmedBookings)
        // filter bookings by day
        const { renderInfo: dayInfo } = filterByDay(renderInfo, i)
        // push into array
        dateArray.push({i:i, currentMonth: false, events: dayInfo})
    }    
    // push dates for curr month
    for (let i=daysInCurrentMonth; i>0; i--) {
        // get bookings for the month
        const { renderInfo } = filterByCurrentMonth(confirmedBookings)
        // filter bookings by day
        const { renderInfo: dayInfo } = filterByDay(renderInfo, i)
        // push into array
        dateArray.push({i: i, currentMonth: true, events: dayInfo})
    }
    // push dates for prev month
    for (let i=firstDayOfWeekMonth; i>0; i--) {
        // get bookings for the month
        const { renderInfo } = filterByPrevMonth(confirmedBookings)
        // filter bookings by day
        const d = daysInPrevMonth-firstDayOfWeekMonth+i
        const { renderInfo: dayInfo } = filterByDay(renderInfo, d)
        // push into array
        dateArray.push({i: d, currentMonth: false, events: dayInfo})        
    }
    console.log(dateArray)
    // rows to render
    const rowsArray = []

    while (dateArray.length > 0) {
        const row = []
        for (let i=0; i<7; i++) {            
            row.push(dateArray.pop())           
        }
        rowsArray.push(row)
    }
    
    const rowsRender = rowsArray.map((row, i) => {
        return (
            <div className="flex" key={i}>
                {
                    row.map((day, j) => {
                        return (
                            <DayBox 
                                day={day?.i} 
                                month={day?.currentMonth}
                                events={day?.events}
                                key={j}
                                />
                        )
                    })                    
                }
            </div>            
        )        
    })

    return (
        <>
            <div className="flex flex-col">
                <div className="flex">
                    {days}
                </div>
                <div className="flex flex-col">
                    {rowsRender}
                </div>

            </div>
        </>
        
    )
}

export default CalendarMonthly