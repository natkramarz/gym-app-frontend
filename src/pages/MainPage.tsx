import { Container, Stack } from "@mui/material";
import EventTile from "../components/EventTile";
import MainToolbar from "../components/MainToolbar";
import { getEventsByDate } from "../utils/Events";
import axios from "axios";

export default function MainPage({ gymEvents, setGymEvents }) {
  return (
    <main>
      <Container
        sx={{
          backgroundColor: "lightgray",
          borderRadius: "20px",
          height: "100vh",
          padding: "10px",
        }}
      >
        <MainToolbar setGymEvents={setGymEvents} />
        <Stack
          direction="column"
          justifyContent="center"
          spacing={0.5}
          sx={{ paddingTop: "30px" }}
        >
          {gymEvents.map((gymEvent) => (
            <EventTile gymEvent={gymEvent} />
          ))}
        </Stack>
      </Container>
    </main>
  );
}
