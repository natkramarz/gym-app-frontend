import {
  Box,
  Button,
  Hidden,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export default function MainToolbar({ setGymEvents }) {
  const [startDate, setStartDate] = useState(null);
  const navigate = useNavigate();
  const routeChange = () => {
    let path = `login`;
    navigate(path);
  };
  const getEventsByDate = (date) => {
    var tzoffset = date.getTimezoneOffset() * 60000;
    var localISOTime = new Date(date - tzoffset).toISOString().slice(0, -1);
    axios
      .get(
        `http://localhost:8080/api/v1/events?date=${localISOTime.substring(
          0,
          10
        )}`
      )
      .then(function (response) {
        if (response.status === 200) {
          setGymEvents(
            response.data.map((gymEvent) => {
              return {
                title: gymEvent.title,
                startTime: gymEvent.startTime,
                endTime: moment(gymEvent.startTime, "HH:mm:ss")
                  .add(gymEvent.duration)
                  .format("HH:mm:ss"),
              };
            })
          );
        }
      })
      .catch(() => setGymEvents([]));
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ borderRadius: "16px", padding: "5px" }}
    >
      <Box
        sx={{
          width: "60%",
          m: 0,
          borderRadius: "16px",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Wybierz datę"
            value={startDate}
            onChange={(startDate) => {
              setStartDate(startDate);
              getEventsByDate(startDate);
            }}
            renderInput={(params) => (
              <TextField
                fullWidth
                {...params}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "16px",
                  "& fieldset": {
                    borderRadius: "16px",
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Box>
      <Button
        variant="text"
        onClick={routeChange}
        sx={{
          paddingLeft: "100px",
          paddingRight: "100px",
          m: "-1px",
          color: "black",
          backgroundColor: "white",
          borderRadius: "16px",
          "&:hover": {
            backgroundColor: "white",
            border: "1px solid black",
          },
        }}
      >
        <Typography>Zaloguj się</Typography>
      </Button>
    </Stack>
  );
}
