"use client";

import { ShiftProvider } from "./context/ShiftContext";

export default function ShiftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ShiftProvider>{children}</ShiftProvider>;
}
