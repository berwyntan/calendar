import useCalendarStore from "../../store/useCalendarStore"
import { useState } from "react"
import useFilterBookings from "../../hooks/useFilterBookings"
import { statusType, roomType } from "../../constants/types"

const EventsList = () => {
  const status = useCalendarStore((state) => state.status)
  const setStatus = useCalendarStore((state) => state.setStatus)
  const room = useCalendarStore((state) => state.room)
  const setRoom = useCalendarStore((state) => state.setRoom)
  // const { filterByStatus } = useFilterBookings()

  const updateStatus = (name: string) => {
    const updateStatus: statusType[] = []
    for (const stat of status) {
      if (stat.name === name) {
        updateStatus.push({
          name: stat.name,
          visible: !stat.visible
        })
      } else updateStatus.push(stat)
    }
    setStatus(updateStatus)
  }
  
  const statusCards = status.map(cat => {
    const [ check, setCheck ] = useState(cat.visible)
    const handleCheck = (name: string) => {
      if (!check) {
        console.log('check', name)
      } else {
        console.log('uncheck', name)
      }
      setCheck(prev => !prev)
      updateStatus(name)
    }
    return (
      <>
      <div key={cat.name}>
        {cat.name}
      </div>
      <input type="checkbox" checked={check} 
        className="checkbox" onChange={() => handleCheck(cat.name)}/>
      </>
    )
  })

  const updateRoom = (name: string) => {
    const updateRoom: roomType[] = []
    for (const r of room) {
      if (r.name === name) {
        updateRoom.push({
          name: r.name,
          visible: !r.visible
        })
      } else updateRoom.push(r)
    }
    setRoom(updateRoom)
  }

  const roomCards = room.map(cat => {
    const [ check, setCheck ] = useState(cat.visible)
    const handleCheck = (name: string) => {
      if (!check) {
        console.log('check', name)
      } else {
        console.log('uncheck', name)
      }
      setCheck(prev => !prev)
      updateRoom(name)
    }
    return (
      <>
      <div key={cat.name}>
        {cat.name}
      </div>
      <input type="checkbox" checked={check} 
        className="checkbox" onChange={() => handleCheck(cat.name)}/>
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
        {roomCards}
      </div>
    </>
    
  )
}

export default EventsList