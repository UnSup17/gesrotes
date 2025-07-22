"use client";

import { Button } from "@/app/components/ui/button";
import { EnumImage } from "@/app/model/EnumImage";
import Image from "next/image";
import { useShiftContext } from "../../../context/ShiftContext";

export default function ShiftList() {
  const { selectedShifts: shifts } = useShiftContext();

  const closeImage = EnumImage.getImage("close");

  if (!shifts || shifts.length === 0) return <></>;

  return (
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
            {shifts.map((turn, index) => (
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
  );
}
