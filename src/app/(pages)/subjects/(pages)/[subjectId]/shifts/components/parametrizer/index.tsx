"use client";

import DatePicker from "@/app/components/Datepicker";
import SearchBar from "@/app/components/SearchBar";
import { EnumImage } from "@/app/model/EnumImage";
import { useShiftContext } from "../../context/WeekContext";

export default function Parametrizer() {
  const { studentFilter, setStudentFilter } = useShiftContext();

  function handleSearchStudent(searchText: string): void {
    setStudentFilter(searchText);
  }

  return (
    <div className="flex py-4 w-2/3">
      <div className="w-1/2 pl-3">
        <SearchBar
          searchParam={studentFilter}
          image={EnumImage.getImage("searchLens")}
          placeholder="Buscar estudiante"
          onSearch={handleSearchStudent}
        />
      </div>
      <div className="w-1/2">
        <DatePicker selectMonth={true} selectYear={true} />
      </div>
    </div>
  );
}
