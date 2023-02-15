import Navbar from "../components/Navbar"
import DateSelector from "../components/calendar/DateSelector"
import CalendarMonthly from "../components/calendar/CalendarMonthly"

const Layout = () => {
    
    return (
        <>
            <div className="flex flex-col">
                <div>
                    <Navbar />
                </div>
                <div className="flex">
                    <div className="flex flex-col">
                        <DateSelector />
                        {/* events filter */}
                    </div>                    
                    <CalendarMonthly />
                </div>
            </div>
            
        </>
    )
}

export default Layout