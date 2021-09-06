import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

export default function Appointment(props) {
  console.log(">>>>Appointment", props);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    console.log("interviewer Obj", interviewer);
    console.log("appointment id", props.id);
    //the form captures name+interviewer an passes it as args to this function. We create a new interview object to pass to props.bookInterview.
    //Call proprs.bookInterview with the appointment id (where is this? ==> props.id) and interview - obj created above...
    props.bookInterview(props.id, interview); // this calls the bookInterview function which updates state with the new appointment
    transition(SHOW); //show the new appointment in the previously empty slot
  };

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}
    </article>
  );
}
