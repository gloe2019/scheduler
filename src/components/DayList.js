import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const listItem = props.days.map((day) => (
    <DayListItem
      key={day.id}
      {...day}
      selected={props.day === day.name}
      dispatch={props.dispatch}
    />
  ));
  return <ul>{listItem}</ul>;
}
