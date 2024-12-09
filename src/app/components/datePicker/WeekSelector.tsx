import { useShiftContext } from "@/app/(pages)/subjects/(pages)/[subjectId]/shifts/context/WeekContext";
import {
  calculateWeeksInMonth,
  ICalculateWeeksInMonthResponse,
} from "@/app/(pages)/subjects/(pages)/[subjectId]/shifts/util/weekUtils";
import { useEffect, useState } from "react";

interface IWeekSelector {
  handleWeekSelect: (weekNumber: number) => void;
  setAuxWeekNumber: (weekNumber: number) => void;
}
export default function WeekSelector({
  handleWeekSelect,
  setAuxWeekNumber,
}: IWeekSelector) {
  const [weeksInMonth, setWeeksInMonth] = useState<
    ICalculateWeeksInMonthResponse[] | undefined
  >(undefined);

  const { weekParams } = useShiftContext();

  useEffect(() => {
    if (
      weekParams.date.year === undefined ||
      weekParams.date.month === undefined
    )
      return;
    setWeeksInMonth(
      calculateWeeksInMonth(weekParams.date.year, weekParams.date.month)
    );
  }, [weekParams.date.year, weekParams.date.month]);

  console.log(
    JSON.stringify({ year: weekParams.date.year, month: weekParams.date.month })
  );
  if (!weeksInMonth) return null;

  return (
    <div className="grid grid-cols-1 gap-2 mt-4 z-50">
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
