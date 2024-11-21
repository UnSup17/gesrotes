"use client";

import { useShiftContext } from "../../context/WeekContext";

export default function Table() {
  const { weekInfo } = useShiftContext();
  return <div>{JSON.stringify(weekInfo)}</div>;
}
