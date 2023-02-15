import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import dayjs from "dayjs"

interface CalendarState {
  month: number
  year: number
  setMonth: (data: number) => void
  setYear: (data: number) => void
  setToday: () => void
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
        })    
    )
)

export default useCalendarStore