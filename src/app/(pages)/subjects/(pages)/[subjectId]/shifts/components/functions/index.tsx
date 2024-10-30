"use client";

import { getTopLeftFunctions } from "@/app/(pages)/subjects/(pages)/[subjectId]/shifts/util/shiftFunctions";

export default function ViewFunctions() {
  const topLeftFunctions = getTopLeftFunctions();
  return (
    <div className="flex items-center max-w-fit">
      {topLeftFunctions.map((item, index) => (
        <button
          key={index}
          onClick={item.function}
          className="h-2/3 px-2 py-0 my-2 mx-1 rounded bg-[#000066] text-white"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
