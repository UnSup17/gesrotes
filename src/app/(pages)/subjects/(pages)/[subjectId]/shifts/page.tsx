"use client";

import ViewFunctions from "@subjects/(pages)/[subjectId]/shifts/components/functions";
import Parametrizer from "@subjects/(pages)/[subjectId]/shifts/components/parametrizer";
import Table from "./components/table";
import { WeekProvider } from "./context/WeekContext";
import { ShiftProvider } from "./context/ShiftContext";

export default function ShiftsPage() {
  return (
    <ShiftProvider>
      <WeekProvider>
        <div className="py-2 px-4 flex space-x-10">
          <ViewFunctions />
          <Parametrizer />
        </div>
        <Table />
      </WeekProvider>
    </ShiftProvider>
  );
}
