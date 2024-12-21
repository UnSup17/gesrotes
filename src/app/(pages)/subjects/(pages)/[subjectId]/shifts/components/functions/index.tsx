"use client";

import { getTopLeftFunctions } from "@/app/(pages)/subjects/(pages)/[subjectId]/shifts/util/shiftFunctions";
import Modal from "@/app/components/Modal";
import { useState } from "react";

interface IFunctionSelected {
  label: string;
  modalSelected: React.JSXElementConstructor<any>;
}

export default function ViewFunctions() {
  const [functionSelected, setFunctionSelected] = useState<IFunctionSelected>();

  const handleClose = () => {
    setFunctionSelected(undefined);
  };

  const handleSelection = (
    label: string,
    modalSelected: React.JSXElementConstructor<any>
  ) => {
    setFunctionSelected({ label, modalSelected });
  };

  const topLeftFunctions = getTopLeftFunctions();

  return (
    <div className="flex items-center max-w-fit">
      {topLeftFunctions.map((item, index) => (
        <button
          key={index}
          onClick={() => handleSelection(item.label, item.component)}
          className="h-2/3 px-2 py-0 my-2 mx-1 rounded bg-[#000066] text-white"
        >
          {item.label}
        </button>
      ))}
      {functionSelected && (
        <Modal title={functionSelected.label} handleClose={handleClose}>
          <functionSelected.modalSelected />
        </Modal>
      )}
    </div>
  );
}
