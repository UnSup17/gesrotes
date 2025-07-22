import Modal from "@/app/components/Modal";
import { Button } from "@/app/components/ui/button";
import { EnumImage } from "@/app/model/EnumImage";
import Image from "next/image";
import { useState } from "react";
import { AssignTurn } from "../modals/shift/Assign";
import { Student } from "../../context/util/students";
import { Shift } from "../../context/util/shifts";
import { useShiftContext } from "../../context/ShiftContext";

interface IEmptyCell {
  student: Student;
  date: string;
  shifts: Shift[] | null;
}
export default function ShiftCell({ student, date, shifts }: IEmptyCell) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isAssignStudentModalOpen, setIsAssignStudentModalOpen] =
    useState(false);
  const { setSelectedShifts } = useShiftContext();

  const handleOpenAssignStudentModal = (student: Student, date: string) => {
    setSelectedStudent(student);
    setSelectedDate(date);
    setIsAssignStudentModalOpen(true);
  };

  const filled = shifts && shifts?.length > 0;

  const plusCircleIcon = EnumImage.getImage(
    filled ? "circleCheck" : "plusCircle"
  );
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className={`w-full h-full min-h-[100px] border-dashed ${
          filled ? "bg-emerald-300" : ""
        }`}
        onClick={() => {
          handleOpenAssignStudentModal(student, date);
          setSelectedShifts(shifts as Shift[]);
        }}
      >
        <div className={`flex flex-col items-center gap-2 text-gray-500`}>
          <Image
            alt={plusCircleIcon.ariaLabel}
            src={plusCircleIcon.src}
            width={30}
            height={30}
          />
          {!filled && <span className="text-xs">Sin asignar</span>}
        </div>
      </Button>
      {isAssignStudentModalOpen && selectedStudent && (
        <Modal
          title="GESTIONAR TURNO"
          handleClose={() => {
            setIsAssignStudentModalOpen(false);
            setSelectedShifts([]);
          }}
        >
          <AssignTurn
            studentId={+selectedStudent.id}
            studentName={`${selectedStudent.fullName} - ${selectedStudent.id}`}
            selectedDate={`${selectedDate}`}
          />
        </Modal>
      )}
    </>
  );
}
