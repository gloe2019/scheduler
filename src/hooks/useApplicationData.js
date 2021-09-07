import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
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
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const selectedDay = state.days.find((day) => day.name === state.day);
    console.log(">>>>>", selectedDay);
    const nullAppointments = selectedDay.appointments.filter(
      (appointment) => appointments[appointment].interview === null
    ).length;

    const updatedDays = state.days.map((day) =>
      day.name === state.day ? { ...day, spots: nullAppointments } : day
    );
    console.log("...updatedDays", updatedDays);

    //We've updated the state locally, need to make a PUT request to make data persistent
    return axios
      .put(`/api/appointments/${id}`, { interview: interview })
      .then((res) => {
        console.log(res);
        //setState only after a successful put request, to ensure data persists!
        setState({
          ...state,
          appointments,
          days: updatedDays,
        });
      });
  };

  const cancelInterview = (id) => {
    console.log(id);
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const selectedDay = state.days.find((day) => day.name === state.day);
    console.log(">>>>>", selectedDay);
    const nullAppointments = selectedDay.appointments.filter(
      (appointment) => appointments[appointment].interview === null
    ).length;
    // console.log(nullAppointments);
    const updatedDays = state.days.map((day) =>
      day.name === state.day ? { ...day, spots: nullAppointments } : day
    );
    console.log("...updatedDays", updatedDays);

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      console.log("delete response", res);
      setState({
        ...state,
        appointments,
        days: updatedDays,
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
