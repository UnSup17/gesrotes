"use client";

import React from "react";
import { Avatar } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import { EnumImage } from "@/app/model/EnumImage";

interface Student {
  id: string;
  name: string;
  lastName: string;
  avatarUrl: string;
}

const students: Student[] = [
  {
    id: "1",
    name: "Juan Sebastian",
    lastName: "Aguirre Chilito",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
  {
    id: "2",
    name: "Jonatan David",
    lastName: "Bravo Londoño",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
  {
    id: "3",
    name: "Yulieth Alexandra",
    lastName: "Gaviria Ortega",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
  {
    id: "4",
    name: "Karen Lizeth",
    lastName: "Mejia Mendoza",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
  {
    id: "1",
    name: "Juan Sebastian",
    lastName: "Aguirre Chilito",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
  {
    id: "2",
    name: "Jonatan David",
    lastName: "Bravo Londoño",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
  {
    id: "3",
    name: "Yulieth Alexandra",
    lastName: "Gaviria Ortega",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
  {
    id: "4",
    name: "Karen Lizeth",
    lastName: "Mejia Mendoza",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
  {
    id: "1",
    name: "Juan Sebastian",
    lastName: "Aguirre Chilito",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
  {
    id: "2",
    name: "Jonatan David",
    lastName: "Bravo Londoño",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
  {
    id: "3",
    name: "Yulieth Alexandra",
    lastName: "Gaviria Ortega",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
  {
    id: "4",
    name: "Karen Lizeth",
    lastName: "Mejia Mendoza",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
];

const days = [
  { name: "Dom", date: "30" },
  { name: "Lun", date: "31" },
  { name: "Mar", date: "1" },
  { name: "Mier", date: "2", isHighlighted: true },
  { name: "Jue", date: "3" },
  { name: "Vie", date: "4" },
  { name: "Sab", date: "5" },
];

export default function Table() {
  const image = EnumImage.getImage("plusCircle");
  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-[250px,repeat(7,1fr)] min-w-[1200px]">
          {/* Header */}
          <div className="sticky top-0 left-0 z-20 bg-gray-100 p-4 border-b font-medium">
            Estudiante
          </div>
          {days.map((day) => (
            <div
              key={day.name}
              className={`sticky top-0 z-10 p-4 text-center border-b font-medium ${
                day.isHighlighted ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              <div>{day.name}</div>
              <div
                className={day.isHighlighted ? "text-blue-800 font-bold" : ""}
              >
                {day.date}
              </div>
            </div>
          ))}

          {/* Students and attendance cells */}
          {students.map((student) => (
            <React.Fragment key={student.id}>
              <div className="sticky left-0 z-10 bg-white p-4 border-b flex items-center gap-3">
                <Avatar
                  src={student.avatarUrl}
                  alt={`${student.name} ${student.lastName}`}
                  fallback={`${student.name.charAt(0)}${student.lastName.charAt(
                    0
                  )}`}
                />
                <div className="flex flex-col">
                  <span className="font-medium">
                    {student.lastName} {student.name.split(" ")[0]}
                  </span>
                  <span className="text-sm text-gray-500">
                    {student.name} {student.lastName}
                  </span>
                </div>
              </div>
              {/* Attendance cells */}
              {Array(7)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={`${student.id}-${index}`}
                    className={`p-2 border-b flex items-center justify-center ${
                      days[index].isHighlighted ? "bg-blue-50" : ""
                    }`}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full h-full min-h-[100px] border-dashed"
                    >
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <Image
                          alt={image.ariaLabel}
                          src={image.src}
                          width={30}
                          height={30}
                        />
                        <span className="text-xs">Sin asignar</span>
                      </div>
                    </Button>
                  </div>
                ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
