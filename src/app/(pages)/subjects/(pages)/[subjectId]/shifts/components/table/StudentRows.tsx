"use client";

import Modal from "@/app/components/Modal";
import { Avatar } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { EnumImage } from "@/app/model/EnumImage";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useWeekContext } from "../../context/WeekContext";
import { DayInfo } from "../../util/weekUtils";
import { AssignTurn } from "../modals/assignTurn";
import { fetchStudentList } from "./students";

export interface Student {
  id: string;
  fullName: string;
  avatarUrl?: string;
}

export default function StudentRows({ weekInfo }: { weekInfo: DayInfo[] }) {
  const [students, setStudents] = useState<Student[]>();
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isAssignStudentModalOpen, setIsAssignStudentModalOpen] =
    useState(false);

  const params = useParams();
  const { studentFilter } = useWeekContext();

  useEffect(() => {
    async function fetchData() {
      const aux = await fetchStudentList(+(params.subjectId || ""));
      setStudents(aux);
    }
    fetchData();
  }, [params.subjectId]);

  useEffect(() => {
    if (students)
      setFilteredStudents(
        students.filter((item) =>
          item.fullName.toLowerCase().includes(studentFilter.toLowerCase())
        )
      );
  }, [studentFilter, students]);

  const handleOpenAssignStudentModal = (student: Student, date: string) => {
    setSelectedStudent(student);
    setSelectedDate(date);
    setIsAssignStudentModalOpen(true);
  };

  const plusCircleIcon = EnumImage.getImage("plusCircle");

  if (students?.length === 0) {
    return <>No existen estudiantes registrados</>;
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
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-full min-h-[100px] border-dashed"
                  onClick={() =>
                    handleOpenAssignStudentModal(
                      student,
                      weekInfo[index].description
                    )
                  }
                >
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <Image
                      alt={plusCircleIcon.ariaLabel}
                      src={plusCircleIcon.src}
                      width={30}
                      height={30}
                    />
                    <span className="text-xs">Sin asignar</span>
                  </div>
                </Button>
              </div>
            ))}
        </Fragment>
      ))}
      {isAssignStudentModalOpen && selectedStudent && (
        <Modal
          title="GESTIONAR TURNO"
          handleClose={() => {
            console.log("close");
            setIsAssignStudentModalOpen(false);
          }}
        >
          <AssignTurn
            studentName={`${selectedStudent.fullName} - ${selectedStudent.id}`}
            selectedDate={`${selectedDate}`}
          />
        </Modal>
      )}
    </>
  );
}
