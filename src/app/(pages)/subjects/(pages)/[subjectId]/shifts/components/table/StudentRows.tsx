import { Avatar } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { EnumImage } from "@/app/model/EnumImage";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useShiftContext } from "../../context/WeekContext";
import { DayInfo } from "../../util/weekUtils";
import Modal from "@/app/components/Modal";
import { AssignTurn } from "../modals/assignTurn";

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
    id: "11",
    name: "Juan Sebastian",
    lastName: "Aguirre Chilito",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
  {
    id: "12",
    name: "Jonatan David",
    lastName: "Bravo Londoño",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
  {
    id: "13",
    name: "Yulieth Alexandra",
    lastName: "Gaviria Ortega",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
  {
    id: "14",
    name: "Karen Lizeth",
    lastName: "Mejia Mendoza",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
  {
    id: "21",
    name: "Juan Sebastian",
    lastName: "Aguirre Chilito",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
  {
    id: "22",
    name: "Jonatan David",
    lastName: "Bravo Londoño",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
  {
    id: "23",
    name: "Yulieth Alexandra",
    lastName: "Gaviria Ortega",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
  {
    id: "24",
    name: "Karen Lizeth",
    lastName: "Mejia Mendoza",
    avatarUrl: "/svg/profilePhotoDemo.svg",
  },
];

export default function StudentRows({ weekInfo }: { weekInfo: DayInfo[] }) {
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isAssignStudentModalOpen, setIsAssignStudentModalOpen] =
    useState(false);

  const { studentFilter } = useShiftContext();
  useEffect(() => {
    setFilteredStudents(
      students.filter(
        (item) =>
          item.name.toLowerCase().includes(studentFilter.toLowerCase()) ||
          item.lastName.toLowerCase().includes(studentFilter.toLowerCase())
      )
    );
  }, [studentFilter]);

  const handleOpenAssignStudentModal = (student: Student, date: string) => {
    setSelectedStudent(student);
    setSelectedDate(date);
    setIsAssignStudentModalOpen(true);
  };

  const plusCircleIcon = EnumImage.getImage("plusCircle");
  return (
    <>
      {/* filteredStudents and attendance cells */}
      {filteredStudents.map((student) => (
        <Fragment key={student.id}>
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
            studentName={`${selectedStudent.name} ${selectedStudent.lastName} - ${selectedStudent.id}`}
            selectedDate={`${selectedDate}`}
          />
        </Modal>
      )}
    </>
  );
}
