import useCalendarStore from "../store/useCalendarStore"
import { bookingsType } from "../constants/types"



const useFilterBookings = () => {
  const month: number = useCalendarStore((state) => state.month) 
  const year: number = useCalendarStore((state) => state.year) 

  // filter by current month year
  const filterByCurrentMonth = (unfiltered: bookingsType[]) => {
    
    let renderInfo: bookingsType[] = []
    
    for (const booking of unfiltered) {
      
      const checkMonth = parseInt(booking?.date.split('-')[1]) - 1 // months start from 0
      
      const checkYear = parseInt(booking?.date.split('-')[0])
      
      if (checkMonth === month && checkYear === year) {
        renderInfo.push(booking)
      }

      // let nextMonth = checkMonth + 1
      // let nextYear = year
      // if (nextMonth > 11) {
      //   nextMonth = 0
      //   nextYear += 1
      // }
      // if (checkMonth === nextMonth && checkYear === nextYear) {
      //   renderInfo.push(booking)
      // }

      // let prevMonth = checkMonth - 1
      // let prevYear = year
      // if (prevMonth < 0) {
      //   nextMonth = 11
      //   nextYear -= 1
      // }
      // if (checkMonth === prevMonth && checkYear === prevYear) {
      //   renderInfo.push(booking)
      // }
    }
    
    return { renderInfo }
  }

  // filter by next month 
  const filterByNextMonth = (unfiltered: bookingsType[]) => {
    
    let renderInfo: bookingsType[] = []
    
    for (const booking of unfiltered) {
      
      let checkMonth = parseInt(booking?.date.split('-')[1]) - 1 // months start from 0
      
      let checkYear = parseInt(booking?.date.split('-')[0])

      let nextMonth = month + 1
      let nextYear = year
      if (nextMonth > 11) {
        nextMonth = 0
        nextYear += 1
      }

      if (checkMonth === nextMonth && checkYear === nextYear) {
        renderInfo.push(booking)
      }
      
    }
    
    return { renderInfo }
  }

  // filter by prev month 
  const filterByPrevMonth = (unfiltered: bookingsType[]) => {
    
    let renderInfo: bookingsType[] = []
    
    for (const booking of unfiltered) {
      
      let checkMonth = parseInt(booking?.date.split('-')[1]) - 1 // months start from 0
      
      let checkYear = parseInt(booking?.date.split('-')[0])

      let prevMonth = month - 1
      let prevYear = year
      if (prevMonth < 0) {
        prevMonth = 11
        prevYear -= 1
      }

      if (checkMonth === prevMonth && checkYear === prevYear) {
        renderInfo.push(booking)
      }      
    }
    
    return { renderInfo }
  }

  // filter by day
  const filterByDay = (unfiltered: bookingsType[], day: number) => {
    let renderInfo: bookingsType[] = []
    // @ts-ignore
    for (const booking of unfiltered) {
      // @ts-ignore
      const checkDay = parseInt(booking?.date.split('-')[2])
      // console.log(checkDay)
      
      if (checkDay === day) {
        renderInfo.push(booking)
      }
    }
    
    return { renderInfo }
  }

  // filter by status

  // filter by room type

  return {
    filterByCurrentMonth, filterByNextMonth, filterByPrevMonth, filterByDay
  }
}

export default useFilterBookings