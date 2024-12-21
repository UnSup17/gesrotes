"use client";

import { useState } from "react";

export function FeedingManager() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="space-y-6 max-h-[650px] overflow-y-auto custom-scrollbar">
      {/* Información del estudiante */}
      Modal de Alimentacion {isOpen && <div>hola</div>}
    </div>
  );
}
