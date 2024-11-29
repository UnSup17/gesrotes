import { useShiftContext } from "@/app/(pages)/subjects/(pages)/[subjectId]/shifts/context/WeekContext";
import {
  IWeekSelector,
  IWeekSelectorHandler,
} from "@/app/(pages)/subjects/(pages)/[subjectId]/shifts/hooks/useWeekSelector";
import { Dispatch, SetStateAction } from "react";
import { months } from ".";

interface IGeneralPreview {
  weekParams: IWeekSelector;
  handleWeekSelection: (weekSelector: IWeekSelectorHandler) => void;
  setAuxWeekNumber: Dispatch<SetStateAction<number | undefined>>;
}
export default function GeneralPreview({
  weekParams,
  handleWeekSelection,
  setAuxWeekNumber,
}: IGeneralPreview) {
  const { handleNextWeek, handlePreviousWeek } = useShiftContext();
  return (
    <div className="w-full h-full flex place-content-evenly">
      <button
        onClick={() => {
          handleWeekSelection({
            ...weekParams,
            date: { year: weekParams.date.year, month: undefined },
          });
          setAuxWeekNumber(undefined);
        }}
      >
        {months[weekParams.date.month!] || "Seleccionar mes"}
      </button>
      <span className="self-center">|</span>
      <button
        onClick={() => {
          handleWeekSelection({
            ...weekParams,
            date: { year: undefined, month: undefined },
          });
          setAuxWeekNumber(undefined);
        }}
      >
        {weekParams.date.year}
      </button>
      <button
        className="px-4 bg-slate-300 border rounded-xl"
        onClick={handlePreviousWeek}
      >
        {"<"}
      </button>
      <button
        className="px-4 bg-slate-300 border rounded-xl"
        onClick={handleNextWeek}
      >
        {">"}
      </button>
    </div>
  );
}
