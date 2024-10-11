"use client";

import DatePicker from "@/app/components/Datepicker";
import SearchBar from "@/app/components/SearchBar";
import { EnumImage } from "@/app/model/EnumImage";
import { useState } from "react";

export default function Parametrizer() {
  const [parameter, setParameter] = useState<string>("");

  const handleSearch = (searchText: string) => {
    setParameter(searchText.toLowerCase());
  };

  const handleSelect = (option: string) => {
    console.log(option);
  };

  return (
    <div className="flex py-4 w-2/3 space-x-5">
      <div className="w-1/2">
        <SearchBar
          searchParam={parameter}
          image={EnumImage.getImage("searchLens")}
          placeholder="Ingrese el nombre de la asignatura"
          onSearch={handleSearch}
        />
      </div>
      <div className="relative w-1/2">
        <DatePicker
          selectDay={true}
          selectMonth={true}
          selectYear={true}
          className="w-full text-sm"
        />
      </div>
    </div>
  );
  
}
