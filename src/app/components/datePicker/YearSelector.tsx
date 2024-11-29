import { useState } from "react";

interface IYearSelector {
  yearSelected: number | undefined;
  handleYearSelect: (year: number) => void;
}
export default function YearSelector({
  yearSelected,
  handleYearSelect,
}: IYearSelector) {
  const [yearRange, setYearRange] = useState<number>(new Date().getFullYear());

  // Cambiar el rango de años mostrado (paginación de años)
  const previousYearRange = () => setYearRange(yearRange - 12);
  const nextYearRange = () => setYearRange(yearRange + 12);

  const years = Array.from({ length: 12 }, (_, i) => yearRange - 6 + i); // Matriz de años alrededor del año actual

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-4">
        {years.map((year) => (
          <button
            key={year}
            className={`p-2 rounded ${
              year === yearSelected ? "bg-blue-500 text-white" : "bg-gray-200"
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
  );
}
