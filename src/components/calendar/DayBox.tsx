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
    const [selected, setSelected] = useState<bookingsType>()
    const [selectedClass, setSelectedClass] = useState<string>()
    const showSelected = (ev: bookingsType, coord: string | undefined) => {
        // console.log(ev)
        // console.log(coord)
        setHidden(prev => !prev)
        setSelected(ev)
        // @ts-ignore
        setSelectedClass(selectedBox[coord])

    }
    
    const eventCards = events?.map(ev => {
        
        
        return (
            <div className="relative" key={ev.uuid}>
                <div className="text-xs truncate cursor-pointer"
                    onClick={() => showSelected(ev, coord)}>
                    {`${ev.start_time} ${ev.code}`}
                </div>
                
            </div>
        )
    })

    return (
        <>
            <div className={`w-28 h-32 ${month && `font-bold`} border border-black`}>
                {day}
                <div className="bg-white text-black mr-5 rounded relative">
                        {eventCards}  
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
                </div>
            </div>   

            
        </>
    )
}

export default DayBox