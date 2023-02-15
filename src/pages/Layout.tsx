import Navbar from "../components/Navbar"
import CalendarMonthly from "../components/calendar-views/CalendarMonthly"

const Layout = () => {
    const month = 12
    const year = 2022
    return (
        <>
            <Navbar />
            <CalendarMonthly 
                month={month}
                year={year}
                />
        </>
    )
}

export default Layout