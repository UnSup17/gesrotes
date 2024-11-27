import { FC, useEffect, useState } from "react";
import { useShiftContext } from "../(pages)/subjects/(pages)/[subjectId]/shifts/context/WeekContext";
import { calculateWeeksInMonth } from "../(pages)/subjects/(pages)/[subjectId]/shifts/util/weekUtils";

const months = [
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
  const [yearRange, setYearRange] = useState<number>(new Date().getFullYear());

  const {
    weekParams,
    handleWeekSelection,
    handleNextWeek,
    handlePreviousWeek,
  } = useShiftContext();

  useEffect(() => {
    setAuxWeekNumber(weekParams.weekNumber);
  }, [weekParams.weekNumber]);

  // Manejo de selección
  const handleYearSelect = (year: number) => {
    handleWeekSelection({ ...weekParams, date: { year, month: undefined } });
  };

  const handleMonthSelect = (monthIndex: number) => {
    handleWeekSelection({
      ...weekParams,
      date: { year: weekParams.date.year, month: monthIndex + 1 },
    });
  };

  const handleWeekSelect = (weekNumber: number) => {
    handleWeekSelection({ ...weekParams, weekNumber });
  };

  const weeksInMonth =
    weekParams.date.year !== undefined && weekParams.date.month !== undefined
      ? calculateWeeksInMonth(weekParams.date.year, weekParams.date.month - 1)
      : [];

  // Cambiar el rango de años mostrado (paginación de años)
  const previousYearRange = () => setYearRange(yearRange - 12);
  const nextYearRange = () => setYearRange(yearRange + 12);

  const years = Array.from({ length: 12 }, (_, i) => yearRange - 6 + i); // Matriz de años alrededor del año actual

  return (
    <>
      {/* Mostrar año y mes seleccionados y permitir volver a ellos */}
      {weekParams.date.year && (
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
      )}

      <div className="relative">
        <div className={"w-1/2 flex flex-col items-center absolute"}>
          {/* Year Selector */}
          {selectYear && !weekParams.date.year && (
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-3 gap-4">
                {years.map((year) => (
                  <button
                    key={year}
                    className={`p-2 rounded ${
                      year === weekParams.date.year
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleYearSelect(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={previousYearRange}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Anterior
                </button>
                <button
                  onClick={nextYearRange}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {/* Month Selector */}
          {selectYear &&
            weekParams.date.year &&
            selectMonth &&
            weekParams.date.month === undefined && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {months.map((month, index) => (
                  <button
                    key={month}
                    className={`p-2 rounded ${
                      index === weekParams.date.month
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleMonthSelect(index)}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}

          {/* Week Selector */}
          {weekParams.date.year &&
            weekParams.date.month !== undefined &&
            auxWeekNumber === undefined &&
            weeksInMonth.length > 0 && (
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
            )}
        </div>
      </div>
    </>
  );
};

export default DatePicker;
