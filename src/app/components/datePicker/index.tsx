import { FC, useEffect, useState } from "react";
import { useShiftContext } from "../../(pages)/subjects/(pages)/[subjectId]/shifts/context/WeekContext";
import GeneralPreview from "./GeneralPreview";
import MonthSelector from "./MonthSelector";
import WeekSelector from "./WeekSelector";
import YearSelector from "./YearSelector";

export const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// Definir las propiedades del componente
interface DatePickerProps {
  selectYear?: boolean;
  selectMonth?: boolean;
}

const DatePicker: FC<DatePickerProps> = ({
  selectYear = true,
  selectMonth = true,
}) => {
  const [auxWeekNumber, setAuxWeekNumber] = useState<number | undefined>();

  const { weekParams, handleWeekSelection } = useShiftContext();

  useEffect(() => {
    setAuxWeekNumber(weekParams.weekNumber);
  }, [weekParams.weekNumber]);

  // Manejo de selección
  const handleYearSelect = (year: number) => {
    handleWeekSelection({ ...weekParams, date: { year, month: undefined } });
  };

  const handleMonthSelect = (monthIndex: number) => {
    console.log(monthIndex);
    handleWeekSelection({
      ...weekParams,
      date: { ...weekParams.date, month: monthIndex },
    });
  };

  const handleWeekSelect = (weekNumber: number) => {
    handleWeekSelection({ ...weekParams, weekNumber });
  };

  console.log(
    JSON.stringify({ selectYear, selectMonth, weekParams, auxWeekNumber })
  );

  const flagYearSelector = selectYear && !weekParams.date.year;
  const flagMonthSelector =
    selectYear &&
    selectMonth &&
    weekParams.date.year &&
    weekParams.date.month === undefined;
  const flagWeekSelector =
    weekParams.date.year &&
    weekParams.date.month !== undefined &&
    auxWeekNumber === undefined;

  return (
    <>
      {/* Mostrar año y mes seleccionados y permitir volver a ellos */}
      {weekParams.date.year && (
        <GeneralPreview
          {...{
            weekParams,
            handleWeekSelection,
            setAuxWeekNumber,
          }}
        />
      )}

      <div className="relative">
        <div className={"w-1/2 flex flex-col items-center absolute"}>
          {flagYearSelector ? (
            <YearSelector
              {...{
                yearSelected: weekParams.date.year,
                handleYearSelect,
              }}
            />
          ) : flagMonthSelector ? (
            <MonthSelector
              {...{
                months,
                handleMonthSelect,
              }}
            />
          ) : (
            flagWeekSelector && (
              <WeekSelector
                {...{
                  handleWeekSelect,
                  setAuxWeekNumber,
                }}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default DatePicker;
