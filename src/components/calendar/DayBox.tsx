import { bookingsType } from "../../constants/types"
import { useState } from "react"

export interface DayBoxProps {
    day: number | undefined
    month: boolean | undefined
    events: bookingsType[] | undefined
    coord: string | undefined
}

const DayBox = ({ day, month, events, coord }: DayBoxProps) => {
    console.log(coord)
    const eventCards = events?.map(ev => {
        // const [hidden, setHidden] = useState(true)
        return (
            <div className="relative" key={ev.uuid}>
                <div className="text-xs truncate cursor-pointer"
                    /*onClick={() => setHidden(!hidden)}*/>
                    {`${ev.start_time} ${ev.code}`}
                </div>
                {/* <span className={`absolute ${hidden && 'hidden'} 
                    right-24 -top-5 bg-gray-200 w-28 h-28`}>
                    {ev.name}
                </span> */}
            </div>
        )
    })
    return (
        <>
            <div className={`w-28 h-32 ${month && `font-bold`} border border-black`}>
                {day}
                <div className="bg-white text-black mr-5 rounded">
                      {eventCards}  
                </div>
            </div>            
        </>
    )
}

export default DayBox