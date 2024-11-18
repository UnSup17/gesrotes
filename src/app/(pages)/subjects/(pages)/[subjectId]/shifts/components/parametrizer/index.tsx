"use client";

import DatePicker from "@/app/components/Datepicker";
import SearchBar from "@/app/components/SearchBar";
import { EnumImage } from "@/app/model/EnumImage";
import { useShiftContext } from "../../context/WeekContext";

export default function Parametrizer() {
  const { studentFilter, setStudentFilter, weekParams, handleWeekSelection } =
    useShiftContext();
  function handleSearchStudent(searchText: string): void {
    setStudentFilter(searchText);
  }

  return (
    <div className="flex py-4 w-2/3 space-x-5">
      <div className="w-1/2">
        <SearchBar
          searchParam={studentFilter}
          image={EnumImage.getImage("searchLens")}
          placeholder="Ingrese el nombre de la asignatura"
          onSearch={handleSearchStudent}
        />
      </div>
      <div className="relative w-1/2">
        <DatePicker
          selectDay={false}
          selectMonth={true}
          selectYear={true}
          selectedDate={weekParams.date}
          onSelectDate={handleWeekSelection}
          className="w-full text-sm"
        />
      </div>
    </div>
  );
}
