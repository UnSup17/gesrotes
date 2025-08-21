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
    {
      id: "NAZLY YASMIN BASTIDAS BENAVIDEZ",
      name: "NAZLY YASMIN BASTIDAS BENAVIDEZ",
      selected: true,
    },
    {
      id: "JUAN FELIPE TOMBÉ TUNUBALÁ",
      name: "JUAN FELIPE TOMBÉ TUNUBALÁ",
      selected: true,
    },
    {
      id: "SANTIAGO  GONZALEZ GAVIRIA",
      name: "SANTIAGO  GONZALEZ GAVIRIA",
      selected: true,
    },
    {
      id: "MARIA ALEJANDRA CRUZ JIMENEZ",
      name: "MARIA ALEJANDRA CRUZ JIMENEZ",
      selected: true,
    },
    {
      id: "MARIO ALEJANDRO MURCIA RUIZ",
      name: "MARIO ALEJANDRO MURCIA RUIZ",
      selected: true,
    },
    {
      id: "VALENTINA  BUENO MARTINEZ",
      name: "VALENTINA  BUENO MARTINEZ",
      selected: true,
    },
    {
      id: "BLANCA ELVIRA TEZ GETIAL",
      name: "BLANCA ELVIRA TEZ GETIAL",
      selected: true,
    },
    {
      id: "DIANA ISABEL ERAZO NAVIA",
      name: "DIANA ISABEL ERAZO NAVIA",
      selected: true,
    },
    {
      id: "GABRIELA  LANDAZURY MUÑOZ",
      name: "GABRIELA  LANDAZURY MUÑOZ",
      selected: true,
    },
    {
      id: "MARÍA PAULA HOYOS JIMÉNEZ",
      name: "MARÍA PAULA HOYOS JIMÉNEZ",
      selected: true,
    },
    {
      id: "ALEIDA BELIANA GUAMIALAMAG IMBACUAN",
      name: "ALEIDA BELIANA GUAMIALAMAG IMBACUAN",
      selected: true,
    },
    {
      id: "JAZZMIN ADRIANA MUELAS MORALES",
      name: "JAZZMIN ADRIANA MUELAS MORALES",
      selected: true,
    },
    {
      id: "JUAN CRISTOBAL ORTIZ RUIZ",
      name: "JUAN CRISTOBAL ORTIZ RUIZ",
      selected: true,
    },
    {
      id: "LEYSLY MARIANA GUZMÁN CRUZ",
      name: "LEYSLY MARIANA GUZMÁN CRUZ",
      selected: true,
    },
    {
      id: "ELENA  ORTIZ CALVACHE",
      name: "ELENA  ORTIZ CALVACHE",
      selected: true,
    },
    {
      id: "FABIAN ALEXIS GARZÓN PAREDES",
      name: "FABIAN ALEXIS GARZÓN PAREDES",
      selected: true,
    },
    {
      id: "LINA MARGARITA YELA LOZA",
      name: "LINA MARGARITA YELA LOZA",
      selected: true,
    },
    {
      id: "JHELEN SOFIA QUINTANA FAJARDO",
      name: "JHELEN SOFIA QUINTANA FAJARDO",
      selected: true,
    },
    {
      id: "NICOLAS ESTEBAN PAZ CARDONA",
      name: "NICOLAS ESTEBAN PAZ CARDONA",
      selected: true,
    },
    {
      id: "NATALIA MARCELA ZAPATA MARTINEZ",
      name: "NATALIA MARCELA ZAPATA MARTINEZ",
      selected: true,
    },
    {
      id: "KAREN VANESSA CASTILLO POPAYÁN",
      name: "KAREN VANESSA CASTILLO POPAYÁN",
      selected: true,
    },
    {
      id: "INGRID YULIETH BENAVIDES PALECHOR",
      name: "INGRID YULIETH BENAVIDES PALECHOR",
      selected: true,
    },
    {
      id: "DAYANA PAOLA ARTEAGA ROSERO",
      name: "DAYANA PAOLA ARTEAGA ROSERO",
      selected: true,
    },
    {
      id: "JUAN PABLO MARTINEZ ERAZO",
      name: "JUAN PABLO MARTINEZ ERAZO",
      selected: true,
    },
    {
      id: "MIKE ALEJANDRO ESPAÑA CAJAS",
      name: "MIKE ALEJANDRO ESPAÑA CAJAS",
      selected: true,
    },
    {
      id: "SEBASTIAN ANDRES GUTIERREZ MOSQUERA",
      name: "SEBASTIAN ANDRES GUTIERREZ MOSQUERA",
      selected: true,
    },
    {
      id: "MELANNY YULIANA GUANCHA BRAVO",
      name: "MELANNY YULIANA GUANCHA BRAVO",
      selected: true,
    },
    {
      id: "ENAR EDIL MUÑOZ ZUÑIGA",
      name: "ENAR EDIL MUÑOZ ZUÑIGA",
      selected: true,
    },
    {
      id: "KEVIN ALEJANDRO MUÑOZ MORALES",
      name: "KEVIN ALEJANDRO MUÑOZ MORALES",
      selected: true,
    },
    {
      id: "FRANCY NICOL VELASCO CUASAPUD",
      name: "FRANCY NICOL VELASCO CUASAPUD",
      selected: true,
    },
    {
      id: "ESTEBAN HERNAN MUÑOZ OLIVA",
      name: "ESTEBAN HERNAN MUÑOZ OLIVA",
      selected: true,
    },
    {
      id: "DARCY JINETH SOLARTE ALTAMIRANO",
      name: "DARCY JINETH SOLARTE ALTAMIRANO",
      selected: true,
    },
    {
      id: "LUISA FERNANDA BOLAÑOS ORTEGA",
      name: "LUISA FERNANDA BOLAÑOS ORTEGA",
      selected: true,
    },
    {
      id: "LUISA FERNANDA CERON MENESES",
      name: "LUISA FERNANDA CERON MENESES",
      selected: true,
    },
    {
      id: "CAMILA ANDREA SOTELO LOPEZ",
      name: "CAMILA ANDREA SOTELO LOPEZ",
      selected: true,
    },
    {
      id: "SARA VALENTINA ACOSTA YACUMAL",
      name: "SARA VALENTINA ACOSTA YACUMAL",
      selected: true,
    },
    {
      id: "DAYRON SADARI RUIZ CORDOBA",
      name: "DAYRON SADARI RUIZ CORDOBA",
      selected: true,
    },
    {
      id: "ISABELLA  LUCUMI VILLEGAS",
      name: "ISABELLA  LUCUMI VILLEGAS",
      selected: true,
    },
    {
      id: "ELIZABETH  LOPERA GRUESO",
      name: "ELIZABETH  LOPERA GRUESO",
      selected: true,
    },
    {
      id: "TANIA FERNANDA LARA ARTEAGA",
      name: "TANIA FERNANDA LARA ARTEAGA",
      selected: true,
    },
    {
      id: "SANTIAGO ESTIVEN HERNANDEZ LOPEZ",
      name: "SANTIAGO ESTIVEN HERNANDEZ LOPEZ",
      selected: true,
    },
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
            className="w-32 pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
