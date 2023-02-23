import { bookingsType } from "../../constants/types"
import { useState, useEffect } from "react"
import selectedBox from "../../constants/selectedBox"
import moreBox from "../../constants/moreBox"
import useCalendarStore from "../../store/useCalendarStore"

export interface DayBoxProps {
    day: number | undefined
    month: boolean | undefined
    events: bookingsType[] | undefined
    coord: string | undefined
    ht: string
}

const DayBox = ({ day, month, events, coord, ht }: DayBoxProps) => {
    // console.log(coord)
    const [hidden, setHidden] = useState(true)
    // selected event that is clicked by user
    const [selected, setSelected] = useState<bookingsType>()
    const [selectedClass, setSelectedClass] = useState<string>()
    const showSelected = (ev: bookingsType, coord: string | undefined) => {
        // console.log(ev)
        // console.log(coord)
        setHidden(prev => !prev)
        setSelected(ev)
        // cannot pass undefined as argument
        // @ts-ignore
        setSelectedClass(selectedBox[coord])
    }
    // full list of events of the day that is clicked by user by clicking "more..."
    const [showFull, setShowFull] = useState(false)
    const [fullClass, setFullClass] = useState<string | undefined>()

    // sort events by chrono order
    const eventSorted = events?.sort((a, b) => {
        const startA = a.start_time
        const startB = b.start_time
        if (startA > startB) {
            return 1
        }
        if (startA < startB) {
            return -1
        }
        return 0
    })
    
    const room = useCalendarStore((state) => state.room)
    const status = useCalendarStore((state) => state.status)
    // events in a given day - render up to 3 only
    const eventCards = eventSorted?.map((ev, i) => {
        // get color based on room
        let col = ""
        for (const r of room) {
            if (r.name === ev.type) {
                col = r.color
            }
        }
        let sta = ""
        for (const s of status) {
            if (s.name === ev.status) {
                sta = s.color
            }
        }
        

        if (i < 3) {
            return (
                <div className={`relative ${col} ${sta}`} key={ev.uuid}>
                    <div className="text-xs truncate cursor-pointer my-1"
                        onClick={() => showSelected(ev, coord)}>
                        {`${ev.start_time.slice(0, 5)} ${ev.name}`}
                    </div>
                </div>
            )
        } else if (i === 3) {
            return (
                <div className="text-xs cursor-pointer bg-gray-100 bg-opacity-50"
                    onClick={ ()=> {
                        setShowFull(true)
                    } }>more...</div>
            )
        }        
    })

    // events in a given day - render all
    const eventCardsFull = eventSorted?.map((ev, i) => {
        // get color based on room
        let col = ""
        for (const r of room) {
            if (r.name === ev.type) {
                col = r.color
            }
        }
        return (
            <div className={`relative w-36 ${col} mb-1`} key={ev.uuid}>
                <div className="text-xs truncate cursor-pointer"
                    onClick={() => showSelected(ev, coord)}>
                    {`${ev.start_time.slice(0, 5)} ${ev.name}`}
                </div>
            </div>
        )        
    })

    // listener to close full day events on click outside element
    useEffect(() => {
        const closeBox = (e: MouseEvent) => {
            const container = document.getElementById(`${coord}full`)
            
            // @ts-expect-error
            if (!container?.contains(e?.target)) {                
                container?.classList.add('hidden');
            }
        }

        document.addEventListener('mouseup', closeBox);
    
        return () => {
            document.removeEventListener('mouseup', closeBox)
        }
    }, [showFull])
    
    // listener to close selected event on click outside element
    useEffect(() => {
        const closeBox = (e: MouseEvent) => {
            // @ts-expect-error
            const container = document.getElementById(selected?.uuid)
            
            // @ts-expect-error
            if (!container?.contains(e?.target)) {                
                container?.classList.add('hidden');
            }
        }

        document.addEventListener('mouseup', closeBox);
    
        return () => {
            document.removeEventListener('mouseup', closeBox)
        }
    }, [selected])

    useEffect(() => {
        // cannot pass undefined as argument
        // @ts-ignore
        setFullClass(moreBox[coord])   
    }, [showFull])

    return (
        <>
            <div className={`flex flex-col flex-grow w-16 ${ht} p-1 ${month && `bg-gray-100 bg-opacity-50 font-medium`} border border-black`}>
                <span className="text-lg">{day}</span>
                <div className="bg-gray-100 bg-opacity-50 text-black mr-1 rounded relative">
                        {eventCards}  
                        {/* selected event */}
                      <span className={`card w-96 bg-gray-300 shadow-xl z-50 absolute p-5 ${hidden && `hidden`} ${selectedClass}`}
                        id={selected?.uuid}>
                        <span className="card-body">
                            <span className="card-actions justify-end items-center">
                            <p>{selected?.name}</p>
                            <button className="btn btn-square btn-xs" onClick={() => setHidden(prev => !prev)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                            </span>
                            
                        </span>
                        <p>{selected?.date}</p>
                        <p>Type: {selected?.type}</p>
                        <p>Status: {selected?.status}</p>
                        <p>{selected?.start_time} - {selected?.end_time}</p>
                        <p>Code: {selected?.code}</p>
                        <p>User: {selected?.user_uuid}</p>
                        </span>
                        {/* to show all events if not enough space */}
                        <span className={`card w-44 bg-blue-50 shadow-xl z-50 absolute p-2 ${showFull || `hidden`}
                            -top-20 ${fullClass}`}
                        id={`${coord}full`}>
                        <span className="card-body p-1 w-40">
                            <span className="card-actions justify-end items-center">
                            <p className="text-xl font-medium mx-3">{day}</p>
                            <button className="btn btn-square btn-xs" onClick={() => setShowFull(prev => !prev)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                            </span>
                            <span className="flex flex-col w-36">
                                {eventCardsFull}
                            </span>
                        </span>                        
                        
                        </span>
                </div>
            </div>   

            
        </>
    )
}

export default DayBox