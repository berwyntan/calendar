import useCalendarStore from "../../store/useCalendarStore";
import { useState } from "react";
import { statusType, roomType, brandType } from "../../constants/types";

const EventsList = () => {
  const status = useCalendarStore((state) => state.status);
  const setStatus = useCalendarStore((state) => state.setStatus);
  const room = useCalendarStore((state) => state.room);
  const setRoom = useCalendarStore((state) => state.setRoom);
  const brand = useCalendarStore((state) => state.brand);
  const setBrand = useCalendarStore((state) => state.setBrand);

  // handle checkbox of status component
  const updateStatus = (name: string) => {
    const updateStatus: statusType[] = [];
    for (const stat of status) {
      if (stat.name === name) {
        updateStatus.push({
          name: stat.name,
          visible: !stat.visible,
          color: stat.color,
        });
      } else updateStatus.push(stat);
    }
    setStatus(updateStatus);
  };

  // status components
  const statusCards = status.map((cat) => {
    const [check, setCheck] = useState(cat.visible);
    const handleCheck = (name: string) => {
      if (!check) {
        // console.log('check', name)
      } else {
        // console.log('uncheck', name)
      }
      setCheck((prev) => !prev);
      updateStatus(name);
    };
    return (
      <div className="mb-2 flex items-center justify-between" key={cat.name}>
        <div className={`${cat.color} mr-1 text-sm`}>{cat.name}</div>
        <input
          type="checkbox"
          checked={check}
          className="checkbox checkbox-xs"
          onChange={() => handleCheck(cat.name)}
        />
      </div>
    );
  });

  // handle checkbox of room component
  const updateRoom = (name: string) => {
    const updateRoom: roomType[] = [];
    for (const r of room) {
      if (r.name === name) {
        updateRoom.push({
          name: r.name,
          visible: !r.visible,
          color: r.color,
        });
      } else updateRoom.push(r);
    }
    setRoom(updateRoom);
  };

  // room components
  const roomCards = room.map((cat) => {
    const [check, setCheck] = useState(cat.visible);
    const handleCheck = (name: string) => {
      if (!check) {
        // console.log('check', name)
      } else {
        // console.log('uncheck', name)
      }
      setCheck((prev) => !prev);
      updateRoom(name);
    };
    return (
      <div className="flex items-center justify-between" key={cat.name}>
        <div className={`${cat.color} my-1 mr-1 pr-2 text-sm`}>{cat.name}</div>
        <div className="flex justify-end">
          <input
            type="checkbox"
            checked={check}
            className="checkbox checkbox-xs"
            onChange={() => handleCheck(cat.name)}
          />
        </div>
      </div>
    );
  });

  // handle checkbox of brand component
  const updateBrand = (name: string) => {
    const updateBrand: brandType[] = [];
    for (const b of brand) {
      if (b.name === name) {
        updateBrand.push({
          name: b.name,
          visible: !b.visible,
          color: b.color,
        });
      } else updateBrand.push(b);
    }
    setBrand(updateBrand);
  };

  // brand components
  const brandCards = brand.map((cat) => {
    const [check, setCheck] = useState(cat.visible);
    const handleCheck = (name: string) => {
      if (!check) {
        // console.log('check', name)
      } else {
        // console.log('uncheck', name)
      }
      setCheck((prev) => !prev);
      updateBrand(name);
    };
    return (
      <div className="flex items-center justify-between" key={cat.name}>
        <div
          className={`${cat.color} my-1 mr-1 rounded bg-gray-50 pr-5 text-center text-sm`}
        >
          {cat.name}
        </div>
        <div className="flex justify-end">
          <input
            type="checkbox"
            checked={check}
            className="checkbox checkbox-xs"
            onChange={() => handleCheck(cat.name)}
          />
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="my-2 mt-6 ml-4 text-lg font-medium">Calendars</div>
      <div className="ml-2 flex flex-col">
        <span className="my-1 ml-2 font-medium">Status</span>
        {statusCards}
        <span className="my-1 ml-2 font-medium">Type</span>
        {roomCards}
        <span className="my-1 ml-2 font-medium">Brand</span>
        {brandCards}
      </div>
    </>
  );
};

export default EventsList;
