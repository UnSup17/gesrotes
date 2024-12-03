import { months } from ".";

interface IMonthSelector {
  handleMonthSelect: (monthIndex: number) => void;
}

export default function MonthSelector({ handleMonthSelect }: IMonthSelector) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {months.map((month, index) => (
        <button
          key={month}
          className={`p-2 rounded bg-gray-200`}
          onClick={() => handleMonthSelect(index)}
        >
          {month + " - " + index}
        </button>
      ))}
    </div>
  );
}
