"use client";

import { EnumImage } from "@/app/model/EnumImage";
import Image from "next/image";
import React from "react";

interface Student {
  name: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  schedule: string;
}
export function FeedingManager() {
  const students: Student[] = [
    {
      name: "Aguirre Chilito Juan Sebastian",
      breakfast: true,
      lunch: true,
      dinner: true,
      schedule: "6:30 a.m. a 9:30 p.m.",
    },
    {
      name: "Bravo Londoño Jonatan David",
      breakfast: true,
      lunch: false,
      dinner: true,
      schedule: "6:30 a.m. a 11:30 a.m. y 2:00a.m. a 9:00 p.m.",
    },
    {
      name: "Gaviria Ortega Yulieth Alexandra",
      breakfast: true,
      lunch: true,
      dinner: false,
      schedule: "6:30 a.m. a 2:30 p.m.",
    },
    {
      name: "Mejía Mendoza Karen Lizeth",
      breakfast: false,
      lunch: true,
      dinner: true,
      schedule: "11:30 a.m. a 9:30 p.m.",
    },
  ];

  const checkIcon = EnumImage.getImage("check");
  const closeImage = EnumImage.getImage("close");

  return (
    <div className="space-y-4">
      {/* Date header */}
      <div className="flex justify-center gap-4">
        <div className="bg-[#0A2167] text-white px-4 py-1 rounded">
          MES: NOVIEMBRE
        </div>
        <div className="bg-[#0A2167] text-white px-4 py-1 rounded">
          AÑO: 2022
        </div>
        <div className="bg-[#0A2167] text-white px-4 py-1 rounded">
          DÍA: 2 / MIÉRCOLES
        </div>
      </div>

      {/* Table */}
      <div className="border rounded">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Nombres y Apellidos</th>
              <th className="px-4 py-2 text-center">Desayuno</th>
              <th className="px-4 py-2 text-center">Almuerzo</th>
              <th className="px-4 py-2 text-center">Comida</th>
              <th className="px-4 py-2 text-left">Horario Turno</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">
                  <div className="flex justify-center">
                    {student.breakfast ? (
                      <div className="h-5 w-5 text-green-500">
                        <Image
                          src={checkIcon.src}
                          alt={checkIcon.ariaLabel}
                          width={20}
                          height={20}
                        />
                      </div>
                    ) : (
                      <div className="h-5 w-5 text-red-500">
                        <Image
                          src={closeImage.src}
                          alt={closeImage.ariaLabel}
                          width={20}
                          height={20}
                        />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-center">
                    {student.lunch ? (
                      <div className="h-5 w-5 text-green-500">
                        <Image
                          src={checkIcon.src}
                          alt={checkIcon.ariaLabel}
                          width={20}
                          height={20}
                        />
                      </div>
                    ) : (
                      <div className="h-5 w-5 text-red-500">
                        <Image
                          src={closeImage.src}
                          alt={closeImage.ariaLabel}
                          width={20}
                          height={20}
                        />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-center">
                    {student.dinner ? (
                      <div className="h-5 w-5 text-green-500">
                        <Image
                          src={checkIcon.src}
                          alt={checkIcon.ariaLabel}
                          width={20}
                          height={20}
                        />
                      </div>
                    ) : (
                      <div className="h-5 w-5 text-red-500">
                        <Image
                          src={closeImage.src}
                          alt={closeImage.ariaLabel}
                          width={20}
                          height={20}
                        />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-2">{student.schedule}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}