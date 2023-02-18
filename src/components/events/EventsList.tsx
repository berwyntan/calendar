import useCalendarStore from "../../store/useCalendarStore"
import { useState } from "react"
import useFilterBookings from "../../hooks/useFilterBookings"

const EventsList = () => {
  const status = useCalendarStore((state) => state.status)
  const type = useCalendarStore((state) => state.type)
  const { filterByStatus } = useFilterBookings()
  
  const statusCards = status.map(cat => {
    const [ check, setCheck ] = useState(false)
    const handleCheck = () => {
      if (!check) {
        console.log('check')
      }
      setCheck(prev => !prev)
    }
    return (
      <>
      <div>
        {cat.name}
      </div>
      <input type="checkbox" checked={check} 
        className="checkbox" onChange={handleCheck}/>
      </>
    )
  })

  const typeCards = type.map(cat => {
    const [ check, setCheck ] = useState(false)
    const handleCheck = () => {
      if (!check) {
        console.log('check')
      }
      setCheck(prev => !prev)
    }
    return (
      <>
      <div>
        {cat}
      </div>
      <input type="checkbox" checked={check} 
        className="checkbox" onChange={handleCheck}/>
      </>
    )
  })

  return (
    <>
      <div>Calendars</div>
      <div className="flex flex-col">
        <span>Status</span>
        {statusCards}
        <span>Type</span>
        {typeCards}
      </div>
    </>
    
  )
}

export default EventsList