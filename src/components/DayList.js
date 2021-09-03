import React from "react";
//import classNames from "classnames";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  //console.log(props);
  // const { day, days, setDay } = props;
  // console.log(day, days, setDay);
  const listItem = props.days.map((day) => (
    <DayListItem
      key={day.id}
      {...day}
      selected={props.day === day.name}
      setDay={props.setDay}
    />
  ));
  return <ul>{listItem}</ul>;
}
