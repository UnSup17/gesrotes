"use client";

import ViewFunctions from "@subjects/(pages)/[subjectId]/shifts/components/functions";
import Parametrizer from "@subjects/(pages)/[subjectId]/shifts/components/parametrizer";
import { Fragment, useState } from "react";

export interface IParameters {
  studentFilter?: string;
  weekFilter: {
    year: number;
    month: number;
  }
}
export default function ShiftsPage() {
  const [parameters, setParameters] = useState<IParameters>({
    studentFilter: undefined,
    weekFilter: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    },
  });

  const handleChangeParameters = (parameter: string, value: any) => {
    setParameters((prev) => ({
      ...prev,
      [parameter]: value,
    }));
  };

  return (
    <Fragment>
      <div className="py-2 px-4 flex space-x-10">
        <ViewFunctions />
        <Parametrizer {...{ parameters, handleChangeParameters }} />
      </div>
      <div className="">parameters.studentFilter: <p className="text-xl font-bold break-words">{parameters.studentFilter}</p></div>
      <div className="">parameters.weekFilter.year: <p className="text-xl font-bold">{parameters.weekFilter.year}</p></div>
      <div className="">parameters.weekFilter.month:<p className="text-xl font-bold">{parameters.weekFilter.month}</p></div>
    </Fragment>
  );
}
