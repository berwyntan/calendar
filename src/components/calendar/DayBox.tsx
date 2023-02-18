import { bookingsType } from "../../constants/types";

export interface DayBoxProps {
    day: number | undefined
    month: boolean | undefined
    events: bookingsType[] | undefined
}

const DayBox = ({ day, month, events }: DayBoxProps) => {
    // console.log(events)
    const eventCards = events?.map(ev => {
        return (
            <div className="text-xs truncate cursor-pointer"
                key={ev.uuid}>
                {`${ev.start_time} ${ev.code}`}
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