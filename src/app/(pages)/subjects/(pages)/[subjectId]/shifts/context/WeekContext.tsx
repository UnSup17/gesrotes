"use cliet";

import { createContext, FC, ReactNode, useContext, useState } from "react";
import { useWeekSelector, WeekSelectorReturn } from "../hooks/useWeekSelector";

interface IParams {
  studentFilter: string;
  setStudentFilter: (value: string) => void;
}

const WeekContext = createContext<(WeekSelectorReturn & IParams) | null>(null);

export const WeekProvider: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [studentFilter, setStudentFilter] = useState<string>("");
  const week = useWeekSelector();

  return (
    <WeekContext.Provider value={{ ...week, studentFilter, setStudentFilter }}>
      {children}
    </WeekContext.Provider>
  );
};

export const useWeekContext = () => {
  const week = useContext(WeekContext);
  if (!week) throw new Error("WeekContext must be used within a WeekProvider");
  return week;
};
