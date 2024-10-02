import React, { useState } from "react";

// Función para obtener el primer día del mes
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

// Función para obtener el número de días en un mes
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const DatePicker = ({
  selectYear = true,
  selectMonth = true,
  selectDay = true,
}) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear - 6 + i); // Matriz de años
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

  // Obtener días del mes actual en una matriz
  const daysInMonth =
    selectedYear !== null && selectedMonth !== null
      ? getDaysInMonth(selectedYear, selectedMonth)
      : 0;
  const firstDayOfMonth =
    selectedYear !== null && selectedMonth !== null
      ? getFirstDayOfMonth(selectedYear, selectedMonth)
      : 0;

  // Crear matriz de días con días de la semana ordenados
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddedDays = Array.from({ length: firstDayOfMonth }, () => null).concat(
    daysArray
  );

  // Manejo de selección
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setSelectedMonth(null); // Resetear mes
    setSelectedDay(null); // Resetear día
  };

  const handleMonthSelect = (monthIndex) => {
    setSelectedMonth(monthIndex);
    setSelectedDay(null); // Resetear día
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    console.log(
      `Selected Date: ${selectedYear}-${months[selectedMonth]}-${day}`
    );
  };

  return (
    <div className="flex flex-col items-center">
      {/* Mostrar año y mes seleccionados y permitir volver a ellos */}
      {selectedYear && (
        <div className="flex space-x-4 mb-4">
          <button onClick={() => setSelectedMonth(null)} className="underline">
            {months[selectedMonth] || "Seleccionar mes"}
          </button>
          <span>|</span>
          <button onClick={() => setSelectedYear(null)} className="underline">
            {selectedYear}
          </button>
        </div>
      )}

      {/* Year Selector */}
      {selectYear && !selectedYear && (
        <div className="grid grid-cols-3 gap-4">
          {years.map((year) => (
            <button
              key={year}
              className={`p-2 rounded ${
                year === selectedYear ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => handleYearSelect(year)}
            >
              {year}
            </button>
          ))}
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
