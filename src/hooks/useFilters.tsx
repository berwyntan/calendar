import useFilterBookings from "./useFilterBookings";
import { bookingsType } from "../constants/types";

const useFilters = () => {
  const { filterByStatus, filterByRoom, filterByBrand } = useFilterBookings();
  const filterBookings = (unfiltered: bookingsType[]) => {
    // filter by status
    const { renderInfo: dayInfoV1 } = filterByStatus(unfiltered);
    // filter by room
    const { renderInfo: dayInfoV2 } = filterByRoom(dayInfoV1);
    // filter by brand
    const { renderInfo: filteredInfo } = filterByBrand(dayInfoV2);

    return { filteredInfo };
  };
  return { filterBookings };
};

export default useFilters;
