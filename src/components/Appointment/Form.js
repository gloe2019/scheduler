import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = () => {
    setName("");
    setInterviewer(null);
  };
  const cancel = () => {
    // console.log("name", name);
    reset();
    props.onCancel();
  };
  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form autoComplete='off'>
          <input
            className='appointment__create-input text--semi-bold'
            name='name'
            value={name}
            type='text'
            placeholder='Enter Student Name'
            onChange={(event) => setName(event.target.value)}
            onSubmit={(event) => event.preventDefault()}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button
            confirm
            onClick={() => {
              props.onSave(name, interviewer); //review why you have to make this an arrow function... when you click you want to execute the function, so you must do it as a callback/reference. if you wrote props.onSave, you'll be asking for the result of the function call... we don't do that here!
            }}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
