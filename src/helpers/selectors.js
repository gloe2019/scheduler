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
  return dayAppointments;
}

export function getInterviewersForDay(state, day) {
  const dayInterviewers = [];
  const foundDay = state.days.find((el) => el.name === day);
  //console.log("day.name", day.name, "givenDay", givenDay); //no nested for loops

  if (!foundDay || foundDay.interviewers.length === 0) {
    return dayInterviewers; //check for false case first, return without executing code
  }
  for (const int of foundDay.interviewers) {
    // console.log(state.interviewers[int]);
    dayInterviewers.push(state.interviewers[int]);
  }
  // console.log(dayInterviewers);
  return dayInterviewers;
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
