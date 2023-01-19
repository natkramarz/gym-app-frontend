import { createContext } from "react";

const GymEventsContext = createContext({
  gymEvents: {},
  setGymEvents: () => {},
});

export default GymEventsContext;
