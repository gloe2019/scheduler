import axios from "axios";
import { useState, useEffect } from "react";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    //initialize webSocket
    // const schedulerSocket = new WebSocket("ws://localhost:8001");
    // schedulerSocket.onopen = function (event) {
    //   schedulerSocket.send("ping!"); //this sends a message to the server. How can i send a message FROM the server?
    // };
    // schedulerSocket.onmessage = function (event) {
    //   const parsedData = JSON.parse(event.data);
    //   if (parsedData.type === "SET_INTERVIEW") {
    //     console.log("Message Received:", parsedData);
    //   }
    // };
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //UPDATE SPOTS
    const updateSpots = () => {
      const selectedDay = state.days.find((day) => day.name === state.day);
      const nullAppointments = selectedDay.appointments.filter(
        (appointment) => appointments[appointment].interview === null
      ).length;
      const updatedDays = state.days.map((day) =>
        day.name === state.day ? { ...day, spots: nullAppointments } : day
      );
      return updatedDays;
    };

    //We've updated the state locally, need to make a PUT request to make data persistent
    return axios
      .put(`/api/appointments/${id}`, { interview: interview })
      .then((res) => {
        //setState only after a successful put request, to ensure data persists!
        setState({
          ...state,
          appointments,
          days: updateSpots(),
        });
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    //UPDATE SPOTS
    const updateSpots = () => {
      const selectedDay = state.days.find((day) => day.name === state.day);
      const nullAppointments = selectedDay.appointments.filter(
        (appointment) => appointments[appointment].interview === null
      ).length;
      const updatedDays = state.days.map((day) =>
        day.name === state.day ? { ...day, spots: nullAppointments } : day
      );
      return updatedDays;
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({
        ...state,
        appointments,
        days: updateSpots(),
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
