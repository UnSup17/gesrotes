"use client";

import { Avatar } from "@/app/components/ui/avatar";
import { Fragment, useEffect, useState } from "react";
import { useShiftContext } from "../../context/ShiftContext";
import { Student } from "../../context/util/students";
import ShiftCell from "./ShiftCell";
import TableSkeleton from "./Skeleton";

export default function StudentRows() {
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const { loading, students, studentFilter, weekInfo, shifts } =
    useShiftContext();

  useEffect(() => {
    if (students)
      setFilteredStudents(
        students.filter((item) =>
          item.fullName.toLowerCase().includes(studentFilter.toLowerCase())
        )
      );
  }, [studentFilter, students]);

  if (loading || weekInfo.length === 0) {
    return <TableSkeleton />;
  }

  return (
    <>
      {/* filteredStudents and attendance cells */}
      {filteredStudents.map((student) => (
        <Fragment key={student.id}>
          <div className="sticky left-0 z-10 bg-white p-4 border-b flex items-center gap-3">
            <Avatar
              src={student.avatarUrl}
              alt={`${student.fullName}`}
              fallback={student.fullName.charAt(0)}
            />
            <div className="flex flex-col">
              <span className="font-medium">{student.fullName}</span>
            </div>
          </div>
          {/* Attendance cells */}
          {Array(7)
            .fill(0)
            .map((_, index) => (
              <div
                key={`${student.id}-${index}`}
                className={`p-2 border-b flex items-center justify-center ${
                  weekInfo[index].isHighlighted ? "bg-blue-50" : ""
                }`}
              >
                <ShiftCell
                  {...{
                    student,
                    date: weekInfo[index].calendarDate,
                    shifts: shifts[weekInfo[index].id]?.filter(
                      (item) => item?.idestudiante === +student?.id
                    ),
                  }}
                />
              </div>
            ))}
        </Fragment>
      ))}
    </>
  );
}
