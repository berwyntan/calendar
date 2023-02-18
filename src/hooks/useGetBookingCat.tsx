import useCalendarStore from "../store/useCalendarStore"
import { statusType, roomType } from "../constants/types"

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
        const status: statusType[] = []
        for (const item of statusSet) {
            if (item !== 'CANCELLED') {
                status.push({
                    name: item,
                    visible: true
                })
            } else {
                status.push({
                    name: item,
                    visible: false
                })
            }
        }
        return { status }
    }

    // type
    const getRoomCat = () => {
        const roomSet: Set<string> = new Set()
        for (const booking of confirmedBookings) {
            if (!roomSet.has(booking.type)) {
                roomSet.add(booking.type)
            }
        }
        for (const booking of cancelledBookings) {
            if (!roomSet.has(booking.type)) {
                roomSet.add(booking.type)
            }
        }
        const room: roomType[] = []
        for (const item of roomSet) {
            room.push({
                name: item,
                visible: true
            })
        }
        return { room }
    }

    // brand (only brand needs to hardcode the brand names COLAB & ITCD)
    
    return { getStatusCat, getRoomCat }
    
}

export default useGetBookingCat