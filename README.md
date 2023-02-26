# Calendar

### Dependencies

- DaisyUI: Styling
- DayJS: Date library
- Papaparse: Parse CSV data
- Zustand: State management

### Dev dependencies

- TailwindCSS, line-clamp, postcss, autoprefixer: Styling
- Prettier: Formatting
- Vite

### Components

![](https://res.cloudinary.com/dkilrhnk7/image/upload/v1677399630/Components_mrtqbz.png)

### Custom hooks

##### useFilterBookings
To filter the bookings information based on the following criteria: previous month, current month, next month, day, status, room or brand. For the purpose of rendering only the selected criteria. Filtering based on the month is for styling: to render the current month differently.

##### useFilters
Combining the filters for status, room and brand from `useFilterBookings` together to make code dry.

##### useGetBookingCat
The room types and brands are not hard coded. The bookings are iterated through and all unique values are stored in a set, before being added as a state in `useCalendarStore`. Statuses are hard coded so that "Cancelled" status bookings are always in italics and don't have full opacity.

##### useGetData
Parse the provided CSV data using the library Papaparse, then storing it in `useCalendarStore`.
