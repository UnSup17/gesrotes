import { FormEvent, useState } from "react";

import { Select } from "@/app/components/ui/select";
import { EnumImage } from "@/app/model/EnumImage";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";

interface Turn {
  escenario: string;
  jornada: string;
  etiqueta: string;
}

interface AssignTurnProps {
  studentName: string;
  selectedDate: string;
}

export function AssignTurn({ studentName, selectedDate }: AssignTurnProps) {
  const [turns, setTurns] = useState<Turn[]>([
    {
      escenario: "Hospital San José",
      jornada: "Mañana (8-12 p.m)",
      etiqueta: "Salas",
    },
    {
      escenario: "Hospital San José",
      jornada: "Mañana (8-12 p.m)",
      etiqueta: "Salas",
    },
    {
      escenario: "Hospital San José",
      jornada: "Mañana (8-12 p.m)",
      etiqueta: "Salas",
    },
    {
      escenario: "Hospital San José",
      jornada: "Mañana (8-12 p.m)",
      etiqueta: "Salas",
    },
    {
      escenario: "Hospital San José",
      jornada: "Mañana (8-12 p.m)",
      etiqueta: "Salas",
    },
    {
      escenario: "Hospital San José",
      jornada: "Mañana (8-12 p.m)",
      etiqueta: "Salas",
    },
    {
      escenario: "Hospital San José",
      jornada: "Mañana (8-12 p.m)",
      etiqueta: "Salas",
    },
    {
      escenario: "Hospital San José",
      jornada: "Mañana (8-12 p.m)",
      etiqueta: "Salas",
    },
    {
      escenario: "Hospital San José",
      jornada: "Mañana (8-12 p.m)",
      etiqueta: "Salas",
    },
    {
      escenario: "Hospital San José",
      jornada: "Mañana (8-12 p.m)",
      etiqueta: "Salas",
    },
    {
      escenario: "Hospital San José",
      jornada: "Mañana (8-12 p.m)",
      etiqueta: "Salas",
    },
  ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para agregar el turno
  };

  const closeImage = EnumImage.getImage("close");

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
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative">
            <Select label="Nombre del escenario" required>
              <option value="">Escenario</option>
              <option value="hospital">Hospital San José</option>
            </Select>
          </div>

          <div className="relative">
            <Select label="Tipo de jornada" required>
              <option value="">Jornada</option>
              <option value="morning">Mañana (8-12 p.m)</option>
            </Select>
          </div>

          <div className="relative">
            <Select label="Etiqueta" required>
              <option value="">Etiqueta</option>
              <option value="salas">Salas</option>
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
      <div className="mt-8">
        <h3 className="font-semibold mb-4">LISTA DE TURNOS CREADOS</h3>
        <div className="border rounded">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Escenario</th>
                <th className="px-4 py-2 text-left">Jornada</th>
                <th className="px-4 py-2 text-left">Etiqueta</th>
                <th className="px-4 py-2 text-left">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {turns.map((turn, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{turn.escenario}</td>
                  <td className="px-4 py-2">{turn.jornada}</td>
                  <td className="px-4 py-2">{turn.etiqueta}</td>
                  <td className="px-4 py-2">
                    <Button>
                      <Image
                        className=""
                        alt={closeImage.ariaLabel}
                        src={closeImage.src}
                        width={20}
                        height={20}
                      />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
