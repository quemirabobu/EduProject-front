import React from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, PickersDay } from "@mui/x-date-pickers";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#13A625",
    },
  },
});

const today = dayjs();

const AttendCalendar = ({ attendance }) => {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const currentAbortController = requestAbortController.current;
    return () => currentAbortController?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getAttendanceStatus = (date) => {
    const attendanceItem = attendance.find(
      (item) => item.attDate === date.format("YYYY-MM-DD")
    );
    return attendanceItem ? attendanceItem.attContent : undefined;
  };

  const ServerDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const attendanceStatus = getAttendanceStatus(day);

    let badgeContent;
    if (attendanceStatus === "0") {
      badgeContent = "⭕️";
    } else if (attendanceStatus === "1") {
      badgeContent = "⏰";
    } else if (attendanceStatus === "2") {
      badgeContent = "❌";
    }

    return (
      <Badge overlap="circular" badgeContent={badgeContent}>
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={today}
          loading={isLoading}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          sx={{
            transform: "scale(1.8)",
            transformOrigin: "top",
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default AttendCalendar;
