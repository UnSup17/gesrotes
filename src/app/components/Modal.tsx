import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";

function Modal({
  title,
  children,
  handleClose,
}: {
  title?: string;
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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center p-4">
      <div
        id="childrenModal"
        className="bg-white w-full max-w-3xl rounded-lg shadow-lg mt-16"
      >
        <div className="flex items-center justify-between p-4 bg-[#0A2167] text-white rounded-t-lg">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button
            className="p-1 hover:bg-blue-800 rounded-full transition-colors"
            variant="outline"
            size="default"
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
