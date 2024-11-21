import { useEffect, useState } from "react";
import { DayInfo, getCurrentWeekNumber, getWeekDaysOfYear } from "../lib/week";

export interface IWeekSelector {
  date: {
    year: number;
    month: number;
  };
  weekNumber: number;
  weeksInYear: number;
}

export interface WeekSelectorReturn {
  weekInfo: DayInfo[];
  weekParams: IWeekSelector;
  handleNextWeek: () => void;
  handlePreviousWeek: () => void;
  handleWeekSelection: (weekNumber: number) => void;
}

export const useWeekSelector = () => {
  const [weekInfo, setWeekInfo] = useState<DayInfo[]>();
  const [weekParams, setWeekParams] = useState<IWeekSelector>({
    date: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    },
    weekNumber: getCurrentWeekNumber(),
    weeksInYear: 0,
  });

  useEffect(() => {
    const { weeksInYear, week } = getWeekDaysOfYear();
    setWeekInfo(week);
    setWeekParams((prev) => ({
      ...prev,
      weeksInYear,
    }));
  }, []);

  const handleWeekSelection = (year: number, weekNumber: number) => {
    const { weeksInYear, week } = getWeekDaysOfYear(year, weekNumber);
    setWeekInfo(week);
    setWeekParams((prev) => ({
      date: {
        ...prev.date,
        year,
      },
      weekNumber,
      weeksInYear,
    }));
  };

  const handleNextWeek = () => {
    // Comprobar si la semana actual es la última semana del año
    if (weekParams.weekNumber == weekParams.weeksInYear)
      handleWeekSelection(weekParams.date.year + 1, 0);
    else handleWeekSelection(weekParams.date.year, weekParams.weekNumber + 1);
  };

  const handlePreviousWeek = () => {
    // Comprobar si la semana actual es la primera semana del año
    if (weekParams.weekNumber == 0)
      handleWeekSelection(weekParams.date.year - 1, weekParams.weeksInYear - 1);
    else handleWeekSelection(weekParams.date.year, weekParams.weekNumber - 1);
  };

  return {
    weekInfo,
    weekParams,
    handleNextWeek,
    handlePreviousWeek,
    handleWeekSelection,
  } as WeekSelectorReturn;
};
