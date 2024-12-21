"use client";

import { EnumImage } from "@/app/model/EnumImage";
import Image from "next/image";
import { useState } from "react";

interface Student {
  id: string;
  name: string;
  selected: boolean;
}

export function StudentManager() {
  const [activeTab, setActiveTab] = useState<"all" | "selected" | "unselected">(
    "all"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "Juan Sebastian Aguirre Chilito", selected: true },
    { id: "2", name: "Héctor Esteban Coral Ruiz", selected: false },
    { id: "3", name: "Karen Lizeth Mejia Mendoza", selected: true },
    { id: "4", name: "Maria Fernanda Ordoñez Imbachi", selected: false },
    { id: "5", name: "Juan Camilo Ramirez Paz", selected: false },
    { id: "6", name: "Yulieth Alexandra Gaviria Ortega", selected: true },
    { id: "7", name: "Gonzalo Andres Muñoz Gomez", selected: true },
    { id: "8", name: "Jonatan David Bravo Londoño", selected: true },
    { id: "9", name: "Jefferson Eduardo Campo", selected: false },
    { id: "10", name: "Richard Amilson Anacona Ibarra", selected: true },
    { id: "11", name: "Danny Alberto Díaz Mage", selected: false },
    { id: "12", name: "Jorge Ivan Solano", selected: false },
  ]);

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    switch (activeTab) {
      case "selected":
        return matchesSearch && student.selected;
      case "unselected":
        return matchesSearch && !student.selected;
      default:
        return matchesSearch;
    }
  });

  const toggleStudent = (id: string) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, selected: !student.selected }
          : student
      )
    );
  };

  const unselectAll = () => {
    setStudents(students.map((student) => ({ ...student, selected: false })));
  };

  const searchIcon = EnumImage.getImage("searchLens");
  const checkIcon = EnumImage.getImage("check");

  return (
    <div className="space-y-4">
      {/* Search and filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400">
            <Image
              src={searchIcon.src}
              alt={searchIcon.ariaLabel}
              width={20}
              height={20}
            />
          </div>
          <input
            type="text"
            placeholder="Buscar estudiante por nombre"
            className="w-full pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="border rounded-md overflow-hidden flex">
            <button
              className={`px-4 py-2 ${
                activeTab === "all"
                  ? "bg-red-800 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("all")}
            >
              TODOS
            </button>
            <button
              className={`px-4 py-2 border-l ${
                activeTab === "selected"
                  ? "bg-red-800 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("selected")}
            >
              SELECCIONADOS
            </button>
            <button
              className={`px-4 py-2 border-l ${
                activeTab === "unselected"
                  ? "bg-red-800 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("unselected")}
            >
              NO SELECCIONADOS
            </button>
          </div>
          <button
            onClick={unselectAll}
            className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-700"
          >
            DESMARCAR TODOS
          </button>
        </div>
      </div>

      {/* Students list */}
      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
        <div className="grid gap-2">
          {filteredStudents.map((student) => (
            <button
              key={student.id}
              onClick={() => toggleStudent(student.id)}
              className="flex items-center justify-between w-full p-3 text-left border rounded-md hover:bg-gray-50"
            >
              <span>{student.name}</span>
              <div
                className={`h-5 w-5 border rounded ${
                  student.selected
                    ? "bg-blue-600 border-blue-600"
                    : "border-gray-300"
                } flex items-center justify-center`}
              >
                {student.selected && (
                  <div className="h-4 w-4 text-white">
                    <Image
                      src={checkIcon.src}
                      alt={checkIcon.ariaLabel}
                      height={20}
                      width={20}
                    />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
