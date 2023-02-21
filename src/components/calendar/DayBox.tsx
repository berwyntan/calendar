import { bookingsType } from "../../constants/types"
import { useState } from "react"
import selectedBox from "../../constants/selectedBox"

export interface DayBoxProps {
    day: number | undefined
    month: boolean | undefined
    events: bookingsType[] | undefined
    coord: string | undefined
}

const DayBox = ({ day, month, events, coord }: DayBoxProps) => {
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
    
    // events in a given day - render up to 4 only
    const eventCards = eventSorted?.map((ev, i) => {
        
        if (i < 4) {
            return (
                <div className="relative" key={ev.uuid}>
                    <div className="text-xs truncate cursor-pointer"
                        onClick={() => showSelected(ev, coord)}>
                        {`${ev.start_time.slice(0, 5)} ${ev.name}`}
                    </div>
                </div>
            )
        } else if (i === 4 && eventSorted.length > 4) {
            return (
                <div className="text-sm cursor-pointer"
                    onClick={()=>setShowFull(true)}>more...</div>
            )
        }        
    })

    // events in a given day - render all
    const eventCardsFull = eventSorted?.map((ev, i) => {
                
        return (
            <div className="relative w-36" key={ev.uuid}>
                <div className="text-xs truncate cursor-pointer"
                    onClick={() => showSelected(ev, coord)}>
                    {`${ev.start_time.slice(0, 5)} ${ev.name}`}
                </div>
            </div>
        )        
    })

    return (
        <>
            <div className={`flex flex-col flex-grow w-16 h-32 p-1 ${month && `font-bold`} border border-black`}>
                {day}
                <div className="bg-white text-black mr-5 rounded relative">
                        {eventCards}  
                        {/* selected event */}
                      <span className={`card w-96 bg-base-100 shadow-xl z-50 absolute p-2 ${hidden && `hidden`} ${selectedClass}`}
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
                        <span className={`card w-44 bg-base-100 shadow-xl z-50 absolute p-2 ${showFull || `hidden`}
                            -top-32`}
                        id={`${day}${month}full`}>
                        <span className="card-body p-1 w-40">
                            <span className="card-actions justify-end items-center">
                            <p>{day}</p>
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