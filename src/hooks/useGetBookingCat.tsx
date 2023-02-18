import useCalendarStore from "../store/useCalendarStore"

const useGetBookingCat = () => {

    const confirmedBookings = useCalendarStore((state) => state.confirmedBookings)
    const cancelledBookings = useCalendarStore((state) => state.cancelledBookings)
   
    const getStatusCat = () => {
        
        // use set to get:
        // status
        const statusSet: Set<string> = new Set()
        for (const booking of confirmedBookings) {
            if (!statusSet.has(booking.status)) {
                statusSet.add(booking.status)
            }
        }
        for (const booking of cancelledBookings) {
            if (!statusSet.has(booking.status)) {
                statusSet.add(booking.status)
            }
        }
        const status = Array.from(statusSet)
        return { status }
    }

    // type
    const getTypeCat = () => {
        const typeSet: Set<string> = new Set()
        for (const booking of confirmedBookings) {
            if (!typeSet.has(booking.type)) {
                typeSet.add(booking.type)
            }
        }
        for (const booking of cancelledBookings) {
            if (!typeSet.has(booking.type)) {
                typeSet.add(booking.type)
            }
        }
        const type = Array.from(typeSet)
        return { type }
    }

    // brand (only brand needs to hardcode the brand names COLAB & ITCD)
    
    return { getStatusCat, getTypeCat }
    
}

export default useGetBookingCat