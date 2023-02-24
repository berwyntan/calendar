import useCalendarStore from "../../store/useCalendarStore"
import { useState } from "react"
import { statusType, roomType } from "../../constants/types"

const EventsList = () => {
  const status = useCalendarStore((state) => state.status)
  const setStatus = useCalendarStore((state) => state.setStatus)
  const room = useCalendarStore((state) => state.room)
  const setRoom = useCalendarStore((state) => state.setRoom)
  const brand = useCalendarStore((state) => state.brand)
  const setBrand = useCalendarStore((state) => state.setBrand)

  // handle checkbox of status
  const updateStatus = (name: string) => {
    const updateStatus: statusType[] = []
    for (const stat of status) {
      if (stat.name === name) {
        updateStatus.push({
          name: stat.name,
          visible: !stat.visible,
          color: stat.color
        })
      } else updateStatus.push(stat)
    }
    setStatus(updateStatus)
  }
  
  // status components
  const statusCards = status.map(cat => {
    const [ check, setCheck ] = useState(cat.visible)
    const handleCheck = (name: string) => {
      if (!check) {
        // console.log('check', name)
      } else {
        // console.log('uncheck', name)
      }
      setCheck(prev => !prev)
      updateStatus(name)
    }
    return (
      <div className="flex justify-between mb-2" key={cat.name}>
      <div className={`${cat.color} text-sm mr-2`}>
        {cat.name}
      </div>
      <input type="checkbox" checked={check} 
        className="checkbox" onChange={() => handleCheck(cat.name)}/>
      </div>
    )
  })

  // handle checkbox of rooms
  const updateRoom = (name: string) => {
    const updateRoom: roomType[] = []
    for (const r of room) {
      if (r.name === name) {
        updateRoom.push({
          name: r.name,
          visible: !r.visible,
          color: r.color
        })
      } else updateRoom.push(r)
    }
    setRoom(updateRoom)
  }

  // room components
  const roomCards = room.map(cat => {
    const [ check, setCheck ] = useState(cat.visible)
    const handleCheck = (name: string) => {
      if (!check) {
        // console.log('check', name)
      } else {
        // console.log('uncheck', name)
      }
      setCheck(prev => !prev)
      updateRoom(name)
    }
    return (
      <div className="" key={cat.name}>
      <div className={`${cat.color} text-sm mr-3 my-1`}>
        {cat.name}
      </div>
      <input type="checkbox" checked={check} 
        className="checkbox" onChange={() => handleCheck(cat.name)}/>
      </div>
    )
  })

  // handle checkbox of brands
  const updateBrand = (name: string) => {
    const updateRoom: roomType[] = []
    for (const r of room) {
      if (r.name === name) {
        updateRoom.push({
          name: r.name,
          visible: !r.visible,
          color: r.color
        })
      } else updateRoom.push(r)
    }
    setRoom(updateRoom)
  }

  // brand components
  const brandCards = room.map(cat => {
    const [ check, setCheck ] = useState(cat.visible)
    const handleCheck = (name: string) => {
      if (!check) {
        // console.log('check', name)
      } else {
        // console.log('uncheck', name)
      }
      setCheck(prev => !prev)
      updateRoom(name)
    }
    return (
      <div className="" key={cat.name}>
      <div className={`${cat.color} text-sm mr-3 my-1`}>
        {cat.name}
      </div>
      <input type="checkbox" checked={check} 
        className="checkbox" onChange={() => handleCheck(cat.name)}/>
      </div>
    )
  })

  return (
    <>
      <div className="my-2 mt-5 ml-4 text-lg font-medium">Calendars</div>
      <div className="flex flex-col ml-2">
        <span className="font-medium my-1 ml-2">Status</span>
        {statusCards}
        <span className="font-medium my-1 ml-2">Type</span>
        {roomCards}
      </div>
    </>
    
  )
}

export default EventsList