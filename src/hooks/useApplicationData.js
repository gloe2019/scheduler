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

    //We've updated the state locally, need to make a PUT request to make data persistent
    return axios
      .put(`/api/appointments/${id}`, { interview: interview })
      .then((res) => {
        console.log(res);
        //setState only after a successful put request, to ensure data persists!
        setState({
          ...state,
          appointments,
        });
      });
  };

  const cancelInterview = (id) => {
    //have app id info passed from onDelete
    console.log(id);
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    console.log("appointment to delete", appointment, appointments);
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      console.log("delete response", res);
      setState({
        ...state,
        appointments,
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
