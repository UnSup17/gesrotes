import { months } from ".";

interface IMonthSelector {
  monthSelected: number | undefined;
  handleMonthSelect: (monthIndex: number) => void;
}

export default function MonthSelector({
  monthSelected,
  handleMonthSelect,
}: IMonthSelector) {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {months.map((month, index) => (
        <button
          key={month}
          className={`p-2 rounded ${
            index === monthSelected ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleMonthSelect(index)}
        >
          {month}
        </button>
      ))}
    </div>
  );
}
