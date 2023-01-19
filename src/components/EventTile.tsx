import { Card, Typography } from "@mui/material";

export default function EventTile({ gymEvent }) {
  return (
    <Card sx={{ borderRadius: "16px", padding: "10px" }}>
      <Typography style={{ color: "teal" }}>{gymEvent.title}</Typography>
      <Typography>
        {gymEvent.startTime.substring(0, gymEvent.startTime.length - 3)} -
        {gymEvent.endTime.substring(0, gymEvent.endTime.length - 3)}
      </Typography>
    </Card>
  );
}
