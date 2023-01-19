import { Box, Button, Card, Typography } from "@mui/material";
import axios from "axios";
import { getToken, getUsername } from "../utils/Common";

export default function EventTile({ gymEvents, setGymEvents, gymEvent }) {
  const removeRegistration = () => {
    axios
      .delete(
        `http://localhost:8080/api/registrations/by_username?eventId=${
          gymEvent.key
        }&username=${getUsername()}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(function (response) {
        if (response.status === 204) {
          setGymEvents(
            gymEvents.map((curr) => {
              if (curr.key === gymEvent.key) {
                curr.signedUp = false;
              }
              return curr;
            })
          );
        }
      })
      .catch(() => setGymEvents([]));
  };

  const addRegistration = () => {
    axios
      .post(
        `http://localhost:8080/api/registrations/by_username?eventId=${
          gymEvent.key
        }&username=${getUsername()}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(function (response) {
        if (response.status === 201) {
          setGymEvents(
            gymEvents.map((curr) => {
              if (curr.key === gymEvent.key) {
                curr.signedUp = true;
              }
              return curr;
            })
          );
        }
      })
      .catch(() => setGymEvents([]));
  };

  return (
    <Card sx={{ borderRadius: "16px", padding: "10px" }}>
      <Typography style={{ color: "teal" }}>{gymEvent.title}</Typography>
      <Typography>
        {gymEvent.startTime.substring(0, gymEvent.startTime.length - 3)} -
        {gymEvent.endTime.substring(0, gymEvent.endTime.length - 3)}
      </Typography>
      <Box textAlign="center">
        {getToken() != null && (
          <Button
            onClick={() =>
              gymEvent.signedUp ? removeRegistration() : addRegistration()
            }
            variant="contained"
            size="large"
            type="submit"
          >
            {gymEvent.signedUp ? "Wypisz się" : "Zarejestruj się"}
          </Button>
        )}
      </Box>
    </Card>
  );
}
