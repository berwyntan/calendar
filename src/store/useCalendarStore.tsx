import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import dayjs from "dayjs"
import { bookingsType } from '../constants/types'

interface CalendarState {
  month: number
  year: number
  setMonth: (data: number) => void
  setYear: (data: number) => void
  setToday: () => void
  yearInSelector: number
  setYearInSelector: (data: number) => void
  confirmedBookings: bookingsType[]
  setConfirmedBookings: (data: bookingsType[]) => void
  cancelledBookings: bookingsType[]
  setCancelledBookings: (data: bookingsType[]) => void
  status: string[]
  setStatus: (data: string[]) => void
  type: string[]
  setType: (data: string[]) => void
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
        confirmedBookings: [],
        setConfirmedBookings: (data) => set({ confirmedBookings: data }),
        cancelledBookings: [],
        setCancelledBookings: (data) => set({ cancelledBookings: data }),
        status: [],
        setStatus: (data) => set({ status: data }),
        type: [],
        setType: (data) => set({ type: data })
        })    
    )
)

export default useCalendarStore