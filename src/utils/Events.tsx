import axios from "axios";

export function getEventsByDate() {
  var events: GymEvent[] = [];

  axios
    .get("http://localhost:8080/api/v1/events")
    .then(function (response) {
      if (response.status === 200) {
        console.log(response.data);
      }
    })
    .catch(() => (events = []));

  return events;
}

export type GymEvent = {
  title: String;
};
