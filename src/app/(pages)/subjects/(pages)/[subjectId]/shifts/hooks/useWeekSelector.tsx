import { useEffect, useState } from "react";
import { DayInfo, getWeekDaysOfYear } from "../lib/weeek";

export interface IWeekSelector {
  year: number;
  month: number;
  week: number;
}

export const useWeekSelector = () => {
  const [week, setWeek] = useState<DayInfo[]>();
  const [currentWeekNumber, setCurrentWeekNumber] = useState<IWeekSelector>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    week: 0,
  });

  useEffect(() => {
    setWeek(getWeekDaysOfYear());
  }, []);

  const handleWeekSelection = (year: number, weekNumber: number) => {
    setWeek(getWeekDaysOfYear(year, weekNumber));
    setCurrentWeekNumber(weekNumber);
  };

  const handleNextWeek = () => {
    const currentWeekNumber = week?.findIndex((day) => day.id === week[0].id);
    handleWeekSelection(week[0].day, currentWeekNumber + 1);
  };

  const handlePreviousWeek = () => {
    const currentWeekNumber = week?.findIndex((day) => day.id === week[0].id);
    handleWeekSelection(week[0].day, currentWeekNumber - 1);
  };

  return {
    week,
    handleWeekSelection,
  };
};
