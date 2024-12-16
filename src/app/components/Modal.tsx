import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";

function Modal({
  children,
  handleClose,
}: {
  children: ReactNode;
  handleClose: () => void;
}) {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;
    const closeOnClickOutside = (e: MouseEvent) => {
      const modal = document.getElementById("childrenModal");
      if (
        modal &&
        e.target instanceof Node &&
        !modal.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    document.body.addEventListener("keydown", closeOnEscapeKey);
    document.addEventListener("mousedown", closeOnClickOutside);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
      document.removeEventListener("mousedown", closeOnClickOutside);
    };
  }, [handleClose]);

  return createPortal(
    <div className="fixed inset-0 bg-[000]/0.6 flex flex-col items-center justify-center overflow-hidden z-40 px-10 py-5 bg-slate-400/30">
      <div className="relative w-[70%]">
        <Button
          className="absolute top-4 right-4 z-50 bg-slate-100"
          variant="outline"
          size="default"
          onClick={handleClose}
        >
          Close
        </Button>
      </div>
      <div
        id="childrenModal"
        className="w-[70%] h-[70%] bg-[#282c34] text-[#fff] flex items-center justify-center text-3xl rounded-3xl"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
