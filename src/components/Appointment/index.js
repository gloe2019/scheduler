import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";

export default function Appointment(props) {
  console.log(">>>>Appointment", props);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    console.log("interviewer Obj", interviewer);
    console.log("appointment id", props.id);
    //Call proprs.bookInterview with the appointment id (where is this? ==> props.id) and interview - obj created above...
    props.bookInterview(props.id, interview).then(() => {
      //show the new appointment in the previously empty slot -- for the structure of this app, we need to return the axios req. promise, then set the new transition
      transition(SHOW);
    });
  };

  const onDelete = () => {
    transition(CONFIRM);
    transition(DELETING);
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    });
  };

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}
      {mode === SAVING && <Status message='Saving...' />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={() => onDelete()}
          message='Are you sure you want to do this?'
        />
      )}
      {mode === DELETING && <Status message='Deleting...' />}
    </article>
  );
}
