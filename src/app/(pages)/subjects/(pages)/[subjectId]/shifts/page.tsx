"use client";

import ViewFunctions from "@subjects/(pages)/[subjectId]/shifts/components/functions";
import Parametrizer from "@subjects/(pages)/[subjectId]/shifts/components/parametrizer";
import { WeekProvider } from "./context/WeekContext";
import Table from "./components/table";

export default function ShiftsPage() {
  return (
    <WeekProvider>
      <div className="py-2 px-4 flex space-x-10">
        <ViewFunctions />
        <Parametrizer />
      </div>
      <Table />
    </WeekProvider>
  );
}
