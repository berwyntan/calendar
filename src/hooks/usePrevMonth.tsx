import useCalendarStore from "../store/useCalendarStore"

interface hookReturn {
    newMonth: number,
    newYear: number
}

const useCountPrevMonth = (): hookReturn => {
    const month: number = useCalendarStore((state) => state.month) 
    const year: number = useCalendarStore((state) => state.year) 
    
    let newMonth = month - 1
    let newYear = year
    if (newMonth < 0) {
        newMonth = 11
        newYear -= 1
    }

    return { newMonth, newYear }    
}

export default useCountPrevMonth