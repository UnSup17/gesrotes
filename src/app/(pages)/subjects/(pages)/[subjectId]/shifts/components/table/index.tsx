"use client";

import { useShiftContext } from "../../context/WeekContext";
import Header from "./Header";
import TableSkeleton from "./Skeleton";
import StudentRows from "./StudentRows";

export default function Table() {
  const { weekInfo } = useShiftContext();
  if (!weekInfo) return <TableSkeleton />;
  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-[250px,repeat(7,1fr)] min-w-[1200px]">
          <Header weekInfo={weekInfo} />
          <StudentRows weekInfo={weekInfo} />
        </div>
      </div>
    </div>
  );
}
