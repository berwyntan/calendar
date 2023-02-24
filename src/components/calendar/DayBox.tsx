import { bookingsType } from "../../constants/types";
import { useState, useEffect } from "react";
import selectedBox from "../../constants/selectedBox";
import moreBox from "../../constants/moreBox";
import useCalendarStore from "../../store/useCalendarStore";

export interface DayBoxProps {
  day: number | undefined;
  month: boolean | undefined;
  events: bookingsType[] | undefined;
  coord: string | undefined;
  ht: string;
}

const DayBox = ({ day, month, events, coord, ht }: DayBoxProps) => {
  const [hidden, setHidden] = useState(true);
  // selected event that is clicked by user
  const [selected, setSelected] = useState<bookingsType>();
  const [selectedClass, setSelectedClass] = useState<string>();
  const showSelected = (ev: bookingsType, coord: string | undefined) => {
    // console.log(ev)
    // console.log(coord)
    setHidden((prev) => !prev);
    setSelected(ev);
    // get color based on room
    let col = "";
    for (const r of room) {
      if (r.name === ev.type) {
        col = r.color;
      }
    }
    let brd = "";
    const codeArr = ev.code.split("_");
    const brandString = codeArr[1] + " " + codeArr[2];
    for (const b of brand) {
      if (b.name === brandString) {
        brd = b.color;
      }
    }
    // cannot pass undefined as argument
    // @ts-ignore
    setSelectedClass(`${selectedBox[coord]} ${col} ${brd}`);
  };
  // full list of events of the day that is clicked by user by clicking "more..."
  const [showFull, setShowFull] = useState(false);
  const [fullClass, setFullClass] = useState<string | undefined>();

  // sort events by chrono order
  const eventSorted = events?.sort((a, b) => {
    const startA = a.start_time;
    const startB = b.start_time;
    if (startA > startB) {
      return 1;
    }
    if (startA < startB) {
      return -1;
    }
    return 0;
  });

  const room = useCalendarStore((state) => state.room);
  const status = useCalendarStore((state) => state.status);
  const brand = useCalendarStore((state) => state.brand);
  // events in a given day - render up to 3 only
  const eventCards = eventSorted?.map((ev, i) => {
    // get color based on room
    let col = "";
    for (const r of room) {
      if (r.name === ev.type) {
        col = r.color;
      }
    }
    // get font style based on status
    let sta = "";
    for (const s of status) {
      if (s.name === ev.status) {
        sta = s.color;
      }
    }
    // get border color based on brand
    let brd = "";
    for (const b of brand) {
      const codeArr = ev.code.split("_");
      const brand = codeArr[1] + " " + codeArr[2];
      if (b.name === brand) {
        brd = b.color;
      }
    }
    // render first 3
    if (i < 3) {
      return (
        <div className={`relative rounded ${col} ${sta} ${brd}`} key={ev.uuid}>
          <div
            className="my-1 ml-2 cursor-pointer truncate text-xs"
            onClick={() => showSelected(ev, coord)}
          >
            {`${ev.start_time.slice(0, 5)} ${ev.name}`}
          </div>
        </div>
      );
    } else if (i === 3) {
      // render "more..." if more than 3 events
      return (
        <div
          className="cursor-pointer bg-gray-100 bg-opacity-50 text-xs"
          onClick={() => {
            setShowFull(true);
          }}
        >
          more...
        </div>
      );
    }
  });

  // events in a given day - render all
  const eventCardsFull = eventSorted?.map((ev, i) => {
    // get color based on room
    let col = "";
    for (const r of room) {
      if (r.name === ev.type) {
        col = r.color;
      }
    }
    // get border color based on brand
    let brd = "";
    for (const b of brand) {
      const codeArr = ev.code.split("_");
      const brand = codeArr[1] + " " + codeArr[2];
      if (b.name === brand) {
        brd = b.color;
      }
    }
    return (
      <div className={`relative w-36 rounded ${col} ${brd} mb-1`} key={ev.uuid}>
        <div
          className="cursor-pointer truncate text-xs"
          onClick={() => showSelected(ev, coord)}
        >
          {`${ev.start_time.slice(0, 5)} ${ev.name}`}
        </div>
      </div>
    );
  });

  // listener to close full day events on click outside element
  useEffect(() => {
    const closeBox = (e: MouseEvent) => {
      const container = document.getElementById(`${coord}full`);

      // @ts-expect-error
      if (!container?.contains(e?.target)) {
        container?.classList.add("hidden");
      }
    };

    document.addEventListener("mouseup", closeBox);

    return () => {
      document.removeEventListener("mouseup", closeBox);
    };
  }, [showFull]);

  // listener to close selected event on click outside element
  useEffect(() => {
    const closeBox = (e: MouseEvent) => {
      // @ts-expect-error
      const container = document.getElementById(selected?.uuid);

      // @ts-expect-error
      if (!container?.contains(e?.target)) {
        container?.classList.add("hidden");
      }
    };

    document.addEventListener("mouseup", closeBox);

    return () => {
      document.removeEventListener("mouseup", closeBox);
    };
  }, [selected]);

  useEffect(() => {
    // cannot pass undefined as argument
    // @ts-ignore
    setFullClass(moreBox[coord]);
  }, [showFull]);

  return (
    <>
      <div
        className={`flex w-16 flex-grow flex-col ${ht} p-1 ${
          month && `bg-gray-100 bg-opacity-30 font-normal`
        } border border-black`}
      >
        <span className="text-lg">{day}</span>
        <div className="relative mr-1 rounded bg-gray-100 bg-opacity-50 text-black">
          {eventCards}
          {/* selected event */}
          <span
            className={`card absolute z-50 w-96 bg-gray-300 p-5 shadow-xl ${
              hidden && `hidden`
            } ${selectedClass} rounded-lg bg-opacity-95`}
            id={selected?.uuid}
          >
            <span className="card-body">
              <span className="card-actions items-center justify-end">
                <p className="text-lg font-medium">{selected?.name}</p>
                <button
                  className="btn-square btn-xs btn"
                  onClick={() => setHidden((prev) => !prev)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            </span>
            <span className="bg-gray-100 p-2 font-normal">
              <div>
                <span className="text-lg">{selected?.date} </span>
                <span>
                  {" "}
                  {selected?.start_time} - {selected?.end_time}
                </span>
              </div>
              <div>
                <span className="mt-1 text-sm font-medium">Type: </span>
                <span>{selected?.type}</span>
              </div>
              <div>
                <span className="mt-1 text-sm font-medium">Status: </span>
                <span>{selected?.status}</span>
              </div>
              <div>
                <span className="mt-1 text-sm font-medium">Code: </span>
                <span>{selected?.code}</span>
              </div>
              <div>
                <span className="mt-1 text-sm font-medium">User: </span>
                <span>{selected?.user_uuid}</span>
              </div>
            </span>
          </span>

          {/* to show all events if not enough space */}
          <span
            className={`card absolute z-50 w-44 bg-blue-50 p-2 shadow-xl ${
              showFull || `hidden`
            }
                            -top-20 ${fullClass}`}
            id={`${coord}full`}
          >
            <span className="card-body w-40 p-1">
              <span className="card-actions items-center justify-end">
                <p className="mx-3 text-xl font-medium">{day}</p>
                <button
                  className="btn-square btn-xs btn"
                  onClick={() => setShowFull((prev) => !prev)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
              <span className="flex w-36 flex-col">{eventCardsFull}</span>
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default DayBox;
