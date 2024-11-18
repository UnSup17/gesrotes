"use cliet";

import { createContext, FC, ReactNode, useContext, useState } from "react";
import { useWeekSelector, WeekSelectorReturn } from "../hooks/useWeekSelector";

interface IParams {
  studentFilter: string;
  setStudentFilter: (value: string) => void;
}

const ShiftContext = createContext<(WeekSelectorReturn & IParams) | null>(null);

export const WeekProvider: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [studentFilter, setStudentFilter] = useState<string>("");
  const week = useWeekSelector();

  return (
    <ShiftContext.Provider value={{ ...week, studentFilter, setStudentFilter }}>
      {children}
    </ShiftContext.Provider>
  );
};

export const useShiftContext = () => {
  const shift = useContext(ShiftContext);
  if (!shift)
    throw new Error("ShiftContext must be used within a ShiftProvider");
  return shift;
};
