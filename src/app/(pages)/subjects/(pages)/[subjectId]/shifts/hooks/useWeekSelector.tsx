import { useEffect, useState } from "react";
import { DayInfo, getCurrentWeekNumber, getWeekDaysOfYear } from "../lib/week";

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
    if (!date || date.year === undefined || date.month === undefined) {
      const response = getWeekDaysOfYear();
      setWeekInfo(response.week);
      setWeekParams({
        date: {
          year: undefined,
          month: undefined,
        },
        weekNumber,
        weeksInYear: response.weeksInYear,
      });
    }

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
  };

  const handleNextWeek = () => {
    // Comprobar si la semana actual es la última semana del año
    console.log(weekParams.weekNumber + 1, weekParams.weeksInYear);
    if (weekParams.weekNumber + 1 >= weekParams.weeksInYear)
      handleWeekSelection({
        ...weekParams,
        date: {
          year: (weekParams.date.year as number) + 1,
          month: 0,
        },
        weekNumber: 0,
      });
    else
      handleWeekSelection({
        ...weekParams,
        weekNumber: weekParams.weekNumber + 1,
      });
  };

  const handlePreviousWeek = () => {
    handleWeekSelection({
      ...weekParams,
      weekNumber: weekParams.weekNumber - 1,
    });
  };

  return {
    weekInfo,
    weekParams,
    handleNextWeek,
    handlePreviousWeek,
    handleWeekSelection,
  } as WeekSelectorReturn;
};
