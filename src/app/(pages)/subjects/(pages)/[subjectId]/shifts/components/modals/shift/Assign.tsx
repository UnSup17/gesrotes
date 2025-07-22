import { FormEvent, useState } from "react";

import { Select } from "@/app/components/ui/select";
import ShiftList from "./List";
import { useShiftContext } from "../../../context/ShiftContext";
import { useParams } from "next/navigation";

interface AssignTurnProps {
  studentId: number;
  studentName: string;
  selectedDate: string;
}

export function AssignTurn({
  studentId,
  studentName,
  selectedDate,
}: AssignTurnProps) {
  const [scenario, setScenario] = useState<string>();
  const { scenarios, workdays, tags, createShift } = useShiftContext();
  const { subjectId } = useParams();

  const handleSubmit = async (data: FormData) => {
    const tag = +(data.get("tag") as string);
    const workingDay = +(data.get("workday") as string);
    if (!tag || !workingDay) {
      alert("complete el formulario");
      return;
    }
    createShift({
      day: selectedDate,
      classGroup: +(subjectId as string),
      student: studentId,
      tag,
      workingDay,
    });
  };

  return (
    <div className="space-y-6 max-h-[650px] overflow-y-auto custom-scrollbar">
      {/* Información del estudiante */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <span className="font-semibold">Estudiante:</span>
          <span>{studentName}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Fecha seleccionada:</span>
          <span>{selectedDate}</span>
        </div>
      </div>

      {/* Nota */}
      <div className="text-red-600">
        Nota: El número máximo de horas asociadas a los turnos es de 12.
      </div>

      {/* Formulario */}
      <form action={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative">
            <Select
              name="scenario"
              label="Nombre del escenario"
              required
              onChange={(e) => setScenario(e.target.value)}
            >
              <option value={0}>Escenario</option>
              {scenarios.map((item) => (
                <option key={`scenario-${item.id}-assign`} value={item.id}>
                  {item.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="relative">
            <Select name="workday" label="Tipo de jornada" required>
              <option value={0}>Jornada</option>
              {workdays.map((item) => (
                <option key={`workday-${item.id}-assign`} value={item.id}>
                  {item.description}
                </option>
              ))}
            </Select>
          </div>

          <div className="relative">
            <Select name="tag" label="Etiqueta" required>
              <option value={0}>Etiqueta</option>
              {tags
                .filter((item) => "" + item.idScenario === scenario)
                .map((item) => (
                  <option key={`tag-${item.id}-assign`} value={item.id}>
                    {item.tag}
                  </option>
                ))}
            </Select>
          </div>
        </div>

        <button
          type="submit"
          className="ml-auto block px-4 py-2 bg-[#0A2167] text-white rounded hover:bg-blue-800 transition-colors"
        >
          ASOCIAR
        </button>
      </form>

      {/* Lista de turnos */}
      <ShiftList />
    </div>
  );
}
