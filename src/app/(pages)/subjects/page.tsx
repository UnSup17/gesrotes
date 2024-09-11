"use client";

import SearchBar from "@/app/components/SearchBar";
import SubjectCard from "@subjects/components/SubjectCard";
import { getSubjectMap } from "@subjects/util/subjects";
import { useState } from "react";

export default function SubjectsPage() {
  const defaultSubjects = Object.values(getSubjectMap());
  const [subjects, setSubjects] = useState(defaultSubjects);

  const handleSearch = (searchText: string) => {
    if (searchText === "") {
      setSubjects(defaultSubjects);
      return;
    }

    setSubjects(
      subjects.filter((item) => {
        return item.title.toLowerCase().includes(searchText.toLowerCase());
      })
    );
  };

  return (
    <div className=" bg-[#F7F7F7] flex-1 border rounded-3xl px-8 py-4">
      <SearchBar
        placeholder="Ingrese el nombre de la asignatura"
        timeOut={500}
        onSearch={handleSearch}
      />
      <div className="pt-4 grid gap-5 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 xs:grid-cols-1">
        {subjects.map((item, index) => (
          <SubjectCard
            key={index}
            id={item.id}
            title={item.title}
            program={item.program}
          />
        ))}
      </div>
    </div>
  );
}
