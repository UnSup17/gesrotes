import { DayInfo } from "../../util/weekUtils";

export default function Header({ weekInfo }: { weekInfo: DayInfo[] }) {
  return (
    <>
      {/* Header */}
      <div className="sticky top-0 left-0 z-20 bg-gray-100 p-4 border-b font-medium">
        Estudiante
      </div>
      {weekInfo.map((day) => (
        <div
          key={day.label}
          className={`sticky top-0 z-10 p-4 text-center border-b font-medium ${
            day.isHighlighted ? "bg-blue-100" : "bg-gray-100"
          }`}
        >
          <div>{day.label}</div>
          <div className={day.isHighlighted ? "text-blue-800 font-bold" : ""}>
            {day.date}
          </div>
        </div>
      ))}
    </>
  );
}
