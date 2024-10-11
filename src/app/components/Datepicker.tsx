import React, { useState } from "react";

// Definir las propiedades del componente
interface DatePickerProps {
  selectYear?: boolean;
  selectMonth?: boolean;
  selectDay?: boolean;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectYear = true,
  selectMonth = true,
  selectDay = true,
  className,
}) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [yearRange, setYearRange] = useState<number>(new Date().getFullYear());

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

  // Obtener el primer día del mes y el número de días en el mes
  const getFirstDayOfMonth = (year: number, month: number): number =>
    new Date(year, month, 1).getDay();
  const getDaysInMonth = (year: number, month: number): number =>
    new Date(year, month + 1, 0).getDate();

  const daysInMonth =
    selectedYear !== null && selectedMonth !== null
      ? getDaysInMonth(selectedYear, selectedMonth)
      : 0;
  const firstDayOfMonth =
    selectedYear !== null && selectedMonth !== null
      ? getFirstDayOfMonth(selectedYear, selectedMonth)
      : 0;

  // Crear matriz de días del mes
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddedDays: (number | null)[] = Array(firstDayOfMonth)
    .fill(null)
    .concat(daysArray);

  // Manejo de selección
  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setSelectedMonth(null); // Resetear mes
    setSelectedDay(null); // Resetear día
  };

  const handleMonthSelect = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    setSelectedDay(null); // Resetear día
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    console.log(
      `Selected Date: ${selectedYear}-${months[selectedMonth!]}-${day}`
    );
  };

  // Cambiar el rango de años mostrado (paginación de años)
  const previousYearRange = () => setYearRange(yearRange - 12);
  const nextYearRange = () => setYearRange(yearRange + 12);

  const years = Array.from({ length: 12 }, (_, i) => yearRange - 6 + i); // Matriz de años alrededor del año actual

  return (
    <div className={`flex flex-col items-center absolute ${className}`}>
      {/* Mostrar año y mes seleccionados y permitir volver a ellos */}
      {selectedYear && (
        <div className="flex space-x-4 mb-4">
          <button onClick={() => setSelectedMonth(null)} className="underline">
            {months[selectedMonth!] || "Seleccionar mes"}
          </button>
          <span>|</span>
          <button onClick={() => setSelectedYear(null)} className="underline">
            {selectedYear}
          </button>
        </div>
      )}

      {/* Year Selector */}
      {selectYear && !selectedYear && (
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-3 gap-4">
            {years.map((year) => (
              <button
                key={year}
                className={`p-2 rounded ${
                  year === selectedYear
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleYearSelect(year)}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Botones para cambiar el rango de años */}
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
      {selectYear && selectedYear && selectMonth && selectedMonth === null && (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {months.map((month, index) => (
            <button
              key={month}
              className={`p-2 rounded ${
                index === selectedMonth
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

      {/* Day Selector */}
      {selectYear &&
        selectedYear &&
        selectMonth &&
        selectedMonth !== null &&
        selectDay && (
          <div>
            <div className="grid grid-cols-7 gap-2 mt-4 text-center">
              {["L", "M", "X", "J", "V", "S", "D"].map((dayOfWeek, idx) => (
                <div key={idx} className="font-bold">
                  {dayOfWeek}
                </div>
              ))}

              {/* Renderizar los días con días nulos para mantener el formato */}
              {paddedDays.map((day, idx) => (
                <button
                  key={idx}
                  className={`p-2 rounded ${
                    day === selectedDay
                      ? "bg-blue-500 text-white"
                      : day
                      ? "bg-gray-200"
                      : "invisible"
                  }`}
                  onClick={() => day && handleDaySelect(day)}
                >
                  {day || ""}
                </button>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default DatePicker;
