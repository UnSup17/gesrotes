import { getTopLeftFunctions } from "@subjects/(pages)/[subjectId]/shifts/util/Functions";
import { Fragment } from "react";

export default function ViewFunctions() {
  const topLeftFunctions = getTopLeftFunctions();
  return (
    <Fragment>
      {topLeftFunctions.map((item, index) => (
        <button key={index} className="px-4 py-2 bg-[#000066] text-white">
          {item.label}
        </button>
      ))}
    </Fragment>
  );
}
