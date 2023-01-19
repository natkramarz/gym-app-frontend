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
import { getToken, getUsername, removeUserSession } from "../utils/Common";

export default function MainToolbar({ setGymEvents }) {
  const [startDate, setStartDate] = useState(null);
  const navigate = useNavigate();
  const routeChange = () => {
    if (getToken() != null) {
      removeUserSession();
      window.location.reload();
    } else {
      navigate("/login");
    }
  };
  const getEventsByDate = (date) => {
    var tzoffset = date.getTimezoneOffset() * 60000;
    var localISOTime = new Date(date - tzoffset).toISOString().slice(0, -1);
    var gymEvents = [];
    var parsedDate = localISOTime.substring(0, 10);
    axios
      .get(`http://localhost:8080/api/v1/events?date=${parsedDate}`)
      .then(function (response) {
        if (response.status === 200) {
          gymEvents = response.data
            .map((gymEvent) => {
              return {
                key: gymEvent.id,
                title: gymEvent.title,
                startTime: gymEvent.startTime,
                endTime: moment(gymEvent.startTime, "HH:mm:ss")
                  .add(gymEvent.duration)
                  .format("HH:mm:ss"),
                signedUp: false,
              };
            })
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
          if (getToken() != null) {
            const headers = {
              Authorization: `Bearer ${getToken()}`,
            };
            axios
              .get(
                `http://localhost:8080/api/registrations/by_date?username=${getUsername()}&date=${parsedDate}`,
                {
                  headers: headers,
                }
              )
              .then(function (response) {
                var ids = response.data.map(
                  (registration) => registration.eventId
                );
                gymEvents.map((gymEvent) => {
                  if (ids.includes(gymEvent.key)) {
                    gymEvent.signedUp = true;
                  }
                  return gymEvent;
                });
                console.log(gymEvents);
                setGymEvents(gymEvents);
              })
              .catch(() => setGymEvents([]));
          } else {
            setGymEvents(gymEvents);
          }
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
        <Typography>
          {getToken() != null ? "Wyloguj się" : "Zaloguj się"}
        </Typography>
      </Button>
    </Stack>
  );
}
