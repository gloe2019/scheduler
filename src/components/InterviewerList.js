import React from "react";

import InterviewerListItem from "./InterviewerListItem";

import "./InterviewerList.scss";

//props:
//interviewers = arr
//interviewer = id/#
//setInterviewer = fnc
export default function InterviewerList(props) {
  // console.log(">>>IL", props);
  const { interviewers, value, onChange } = props;
  const listItem = interviewers.map((int) => (
    <InterviewerListItem
      key={int.id}
      {...int}
      selected={int.id === value}
      setInterviewer={(event) => onChange(int.id)}
    />
  ));
  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>{listItem}</ul>
    </section>
  );
}
