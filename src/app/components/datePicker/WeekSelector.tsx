import {
  calculateWeeksInMonth,
  ICalculateWeeksInMonthResponse,
} from "@/app/(pages)/subjects/(pages)/[subjectId]/shifts/util/weekUtils";
import { useEffect, useState } from "react";

interface IWeekSelector {
  yearSelected: number | undefined;
  monthSelected: number | undefined;
  handleWeekSelect: (weekNumber: number) => void;
  setAuxWeekNumber: (weekNumber: number) => void;
}
export default function WeekSelector({
  yearSelected,
  monthSelected,
  handleWeekSelect,
  setAuxWeekNumber,
}: IWeekSelector) {
  const [weeksInMonth, setWeeksInMonth] = useState<
    ICalculateWeeksInMonthResponse[] | undefined
  >(undefined);

  useEffect(() => {
    if (yearSelected === undefined || monthSelected === undefined) return;
    setWeeksInMonth(calculateWeeksInMonth(yearSelected, monthSelected - 1));
  }, [yearSelected, monthSelected]);

  console.log(yearSelected, monthSelected);
  if (!weeksInMonth) return null;

  return (
    <div className="grid grid-cols-1 gap-2 mt-4">
      {weeksInMonth.map((week) => (
        <button
          key={week.weekNumber}
          className="p-2 bg-gray-200 rounded hover:bg-blue-300"
          onClick={() => {
            handleWeekSelect(week.weekNumber);
            setAuxWeekNumber(week.weekNumber);
          }}
        >
          {`Semana ${
            week.weekNumber
          }: ${week.startDate.toLocaleDateString()} - ${week.endDate.toLocaleDateString()}`}
        </button>
      ))}
    </div>
  );
}
