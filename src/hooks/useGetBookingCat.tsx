import useCalendarStore from "../store/useCalendarStore"
import { statusType, roomType, brandType } from "../constants/types"
import colors from "../constants/colorsRoom"
import colorsStatus from "../constants/colorsStatus"
import colorsBrand from "../constants/colorsBrand"

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
                    visible: true,
                    color: colorsStatus.confirmed
                })
            } else {
                status.push({
                    name: item,
                    visible: false,
                    color: colorsStatus.cancelled
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
        let count = 0
        for (const item of roomSet) {
            room.push({
                name: item,
                visible: true,
                color: colors[count]
            })
            count++
        }
        return { room }
    }

    // brand
    const getBrandCat = () => {
        const brandSet: Set<string> = new Set()
        for (const booking of confirmedBookings) {
            const codeArr = booking.code.split('_')
            const brand = codeArr[1] + " " + codeArr[2]
            if (!brandSet.has(brand)) {
                brandSet.add(brand)
            }
        }
        for (const booking of cancelledBookings) {
            const codeArr = booking.code.split('_')
            const brand = codeArr[1] + " " + codeArr[2]
            if (!brandSet.has(brand)) {
                brandSet.add(brand)
            }
        }
        const brand: brandType[] = []
        let count = 0
        for (const item of brandSet) {
            brand.push({
                name: item,
                visible: true,
                color: colorsBrand[count]
            })
            count++
        }
        return { brand }
    }
    
    return { getStatusCat, getRoomCat, getBrandCat }
    
}

export default useGetBookingCat