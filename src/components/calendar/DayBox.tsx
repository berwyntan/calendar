interface DayBoxProps {
    day: number | undefined;
    month: boolean | undefined;
}

const DayBox = ({ day, month }: DayBoxProps) => {
    return (
        <>
            <div className={`w-28 h-32 ${month && `font-bold`} border border-black`}>
                {day}
                <div 
                    className="bg-white text-black mr-5 rounded cursor-pointer"
                    
                >
                        Event
                </div>
            </div>            
        </>
    )
}

export default DayBox