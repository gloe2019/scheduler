import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "./Appointment";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, //-- remove/comment hardcoded appointments eventually
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      //console.log("all", all);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //console.log(">>>>>interviewers", state.interviewers);

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
    // const appToDelete = appointments.find((app) => app.id === id)
    // console.log("cancelInterview", appToDelete);
    // appToDelete.interview = null;
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

  const appointments = getAppointmentsForDay(state, state.day);
  const appointmentList = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {appointmentList}
        <Appointment key='last' time='5pm' />
      </section>
    </main>
  );
}
