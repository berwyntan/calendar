import Navbar from "../components/Navbar"
import MonthSelector from "../components/calendar/MonthSelector"
import CalendarMonthly from "../components/calendar/CalendarMonthly"
import EventsList from "../components/events/EventsList"
import useCalendarStore from "../store/useCalendarStore"

import { useGetData } from '../hooks/useGetData'
import useFilterBookings from "../hooks/useFilterBookings"
import { bookingsType } from "../constants/types"
import useGetBookingCat from "../hooks/useGetBookingCat"

const Layout = () => {
    
    const setConfirmedBookings = useCalendarStore((state) => state.setConfirmedBookings)
    const setCancelledBookings = useCalendarStore((state) => state.setCancelledBookings)
    const setStatus = useCalendarStore((state) => state.setStatus)

    const { parseConfirmedData, parseCancelledData } = useGetData()
    const { data: confirmedBookings } = parseConfirmedData()
    setConfirmedBookings(confirmedBookings)
    
    const { data: cancelledBookings } = parseCancelledData()
    setCancelledBookings(cancelledBookings)

    const { getStatusCat, getTypeCat } = useGetBookingCat()
    const { status } = getStatusCat()
    const { type } = getTypeCat()
    console.log(type)
    setStatus(status)
    // const { filterByCurrentMonth, filterByDay } = useFilterBookings()
    // // @ts-ignore
    // const {renderInfo} = filterByCurrentMonth(colabConfirm)

    // console.log(renderInfo)

    // const {renderInfo: dayInfo} = filterByDay(renderInfo, 1)
    // console.log(dayInfo)
    
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