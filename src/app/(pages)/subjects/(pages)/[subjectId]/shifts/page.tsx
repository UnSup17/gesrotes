import ViewFunctions from "@subjects/(pages)/[subjectId]/shifts/components/functions";
import Parametrizer from "@subjects/(pages)/[subjectId]/shifts/components/parametrizer";
import { Fragment } from "react";

export default function ShiftsPage() {
  return (
    <Fragment>
      <div className="py-2 px-4 flex space-x-10 w-full">
        <ViewFunctions />
        <Parametrizer />
      </div>
      <div className="">b</div>
    </Fragment>
  );
}
