import useCalendarStore from "../store/useCalendarStore"

const useFilterBookings = () => {
  const month: number = useCalendarStore((state) => state.month) 
  const year: number = useCalendarStore((state) => state.year) 

  // filter by current month year
  const filterByCurrentMonth = (unfiltered: []) => {
    
    let renderInfo: [] = []
    // @ts-ignore
    for (const booking of unfiltered) {
      
      // @ts-ignore
      const checkMonth = parseInt(booking?.date.split('-')[1]) - 1 // months start from 0
      
      // @ts-ignore
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
    // console.log(renderInfo)
    return { renderInfo }
  }

  // filter by day
  const filterByDay = (unfiltered: [], day: number) => {
    let renderInfo: [] = []
    // @ts-ignore
    for (const booking of unfiltered) {
      // @ts-ignore
      const checkDay = parseInt(booking?.date.split('-')[2])
      // console.log(checkDay)
      
      if (checkDay === day) {
        renderInfo.push(booking)
      }
    }
    console.log(renderInfo)
    return { renderInfo }
  }

  // filter by status

  // filter by room type

  return {
    filterByCurrentMonth, filterByDay
  }
}

export default useFilterBookings