import Navbar from "../components/Navbar"
import MonthSelector from "../components/calendar/MonthSelector"
import CalendarMonthly from "../components/calendar/CalendarMonthly"
import EventsList from "../components/events/EventsList"
import useCalendarStore from "../store/useCalendarStore"
import colab from '../data/colab'
import xcolab from '../data/xcolab'
import { useGetData } from '../hooks/useGetData'
import useFilterBookings from "../hooks/useFilterBookings"
import { bookingsType } from "../constants/types"

interface data {
    data: bookingsType[]
}

const Layout = () => {
    const month: number = useCalendarStore((state) => state.month) 
    const year: number = useCalendarStore((state) => state.year) 
    const setMonth: (data: number) => void = useCalendarStore((state) => state.setMonth) 
    const setYear: (data: number) => void = useCalendarStore((state) => state.setYear) 
    const setToday: () => void = useCalendarStore((state) => state.setToday)
    
    
    const { parseConfirmedData, parseCancelledData } = useGetData()
    const { data: confirmedBookings }: data = parseConfirmedData()
    console.log(confirmedBookings)
    
    console.log(confirmedBookings)
    const { data: cancelledBookings } = parseCancelledData()
    console.log(cancelledBookings)

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
                    <CalendarMonthly 
                        confirmedBookings={confirmedBookings}
                    />
                </div>
            </div>
            
        </>
    )
}

export default Layout