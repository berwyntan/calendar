import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import dayjs from "dayjs"

interface CalendarState {
  month: number
  year: number
  setMonth: (data: number) => void
  setYear: (data: number) => void
  setToday: () => void
  yearInSelector: number
  setYearInSelector: (data: number) => void
}

const useCalendarStore = create<CalendarState>()(
  devtools(    
    (set) => ({
        month: dayjs().month(),
        year: dayjs().year(),
        setMonth: (data) => set({ month: data}),
        setYear: (data) => set({ year: data}),
        setToday: () => {
          set({ month: dayjs().month()})
          set({ year: dayjs().year()})
        },
        yearInSelector: dayjs().year(),
        setYearInSelector: (data) => set({ yearInSelector: data}),
        })    
    )
)

export default useCalendarStore