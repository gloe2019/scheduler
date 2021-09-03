//selector - function that accepts state as an argument and returns data derived from that state..
//selectors depend only on the arguments passed to them!

export function getAppointmentsForDay(state, day) {
  //return an array of appointments for the given day..
  const filteredDay = state.days.filter(
    (selectedDay) => selectedDay.name === day
  );

  const dayAppointments = [];
  for (const day of filteredDay) {
    for (const [id, app] of Object.entries(state.appointments)) {
      if (day.appointments.includes(app.id)) {
        dayAppointments.push(app);
      }
    }
  }
  //console.log("dayAppointments", dayAppointments);
  return dayAppointments;
}

export function getInterview(state, interview) {
  if (interview) {
    const obj = {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
    return obj;
  }
  return null;
}
