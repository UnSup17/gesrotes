import { useEffect, useState } from "react";
import {
  DayInfo,
  getCurrentWeekNumber,
  getWeekDaysOfYear,
  getWeeksInYear,
} from "../util/weekUtils";

export interface IWeekSelector {
  date: {
    year: number | undefined;
    month: number | undefined;
  };
  weekNumber: number;
  weeksInYear: number;
}

export interface IWeekSelectorHandler {
  date: {
    year: number | undefined;
    month: number | undefined;
  };
  weekNumber: number;
}

export interface WeekSelectorReturn {
  weekInfo: DayInfo[];
  weekParams: IWeekSelector;
  handleNextWeek: () => void;
  handlePreviousWeek: () => void;
  handleWeekSelection: (weekSelector: IWeekSelectorHandler) => void;
}

export const useWeekSelector = () => {
  const [weekInfo, setWeekInfo] = useState<DayInfo[]>();
  const [weekParams, setWeekParams] = useState<IWeekSelector>({
    date: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
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

  const handleWeekSelection = ({ date, weekNumber }: IWeekSelectorHandler) => {
    console.log(date, weekNumber);
    if (!date || date.year === undefined || date.month === undefined) {
      const response = getWeekDaysOfYear();
      setWeekInfo(response.week);
      setWeekParams({
        date: {
          year: date.year,
          month: date.month,
        },
        weekNumber,
        weeksInYear: response.weeksInYear,
      });
    } else {
      let response = getWeekDaysOfYear(date.year, weekNumber);
      setWeekInfo(response.week);
      setWeekParams({
        date: {
          year: response.year,
          month: response.month,
        },
        weekNumber,
        weeksInYear: response.weeksInYear,
      });
    }
  };

  const navigateWeek = (offset: number) => {
    const newWeekNumber = weekParams.weekNumber + offset;
    if (newWeekNumber < 0) {
      const previousYear = (weekParams.date.year as number) - 1;
      const previousWeeksInYear = getWeeksInYear(previousYear);
      handleWeekSelection({
        date: { year: previousYear, month: 11 },
        weekNumber: previousWeeksInYear - 1,
      });
    } else if (newWeekNumber >= weekParams.weeksInYear) {
      const nextYear = (weekParams.date.year as number) + 1;
      handleWeekSelection({
        date: { year: nextYear, month: 0 },
        weekNumber: 0,
      });
    } else {
      handleWeekSelection({
        ...weekParams,
        weekNumber: newWeekNumber,
      });
    }
  };

  // Reutiliza la lógica
  const handleNextWeek = () => navigateWeek(1);
  const handlePreviousWeek = () => navigateWeek(-1);

  return {
    weekInfo,
    weekParams,
    handleNextWeek,
    handlePreviousWeek,
    handleWeekSelection,
  } as WeekSelectorReturn;
};
