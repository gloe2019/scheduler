import React from "react";
import classNames from "classnames";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  console.log(props);
  // const { day, days, setDay } = props;
  // console.log(day, days, setDay);
  const test = props.days.map((day) => (
    <DayListItem
      key={day.id}
      {...day}
      selected={props.day === day.name}
      setDay={props.setDay}
    />
  ));
  return <ul>{test}</ul>;
}
