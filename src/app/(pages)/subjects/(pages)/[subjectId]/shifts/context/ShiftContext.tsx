"use client";

import { useParams } from "next/navigation";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWeekSelector, WeekSelectorReturn } from "../hooks/useWeekSelector";
import { fetchScenarios, Scenario } from "./util/scenarios";
import { fetchServicesMap, Service, ServicesMap } from "./util/services";
import {
  fetchCreateShift,
  fetchShifts,
  IFetchCreateShift,
  Shift,
} from "./util/shifts";
import { fetchStudentList, Student } from "./util/students";
import {
  AssociatedTag,
  fetchAssociatedTags,
  fetchAssociateTag,
  fetchCreateTag,
  fetchDeleteTag,
  fetchDissociateTag,
  fetchTags,
  Tag,
} from "./util/tags";
import { fetchWorkdays, Workday } from "./util/workday";

interface IParams {
  loading: boolean;
  students: Student[];
  scenarios: Scenario[];
  workdays: Workday[];
  tags: Tag[];
  associatedTags: AssociatedTag[];
  servicesMap: ServicesMap;
  shifts: { [key: string]: Shift[] };
  selectedShifts: Shift[];
  studentFilter: string;
  handleSetTags: (tags: Tag[]) => void;
  filterServices: (idScenario: number) => Promise<Service[]>;
  createTag: (tag: string, scenario: number) => Promise<void>;
  deleteTag: (tag: number) => Promise<void>;
  associateTag: (tag: number, service: number) => void;
  dissociateTag: (associatedId: number) => Promise<void>;
  createShift: (params: IFetchCreateShift) => Promise<void>;
  setStudentFilter: (value: string) => void;
  setSelectedShifts: (shifts: Shift[]) => void;
}

const ShiftContext = createContext<(IParams & WeekSelectorReturn) | null>(null);

export const ShiftProvider: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [studentFilter, setStudentFilter] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [workdays, setWorkday] = useState<Workday[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [servicesMap, setServicesMap] = useState<ServicesMap>([]);
  const [associatedTags, setAssociatedTags] = useState<AssociatedTag[]>([]);
  const [shifts, setShifts] = useState<{ [key: string]: Shift[] }>({});
  const [selectedShifts, setSelectedShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const weekSelector = useWeekSelector();
  const { subjectId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const [scenarios, workdays, tags, associatedTags, servicesMap] =
          await Promise.all([
            fetchScenarios(),
            fetchWorkdays(),
            fetchTags(),
            fetchAssociatedTags(),
            fetchServicesMap(),
          ]);

        setScenarios(scenarios);
        setWorkday(workdays);
        setTags(tags);
        setAssociatedTags(associatedTags);
        setServicesMap(servicesMap);
      } catch (error) {
        alert("Error al cargar datos:" + error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const aux = await fetchStudentList(+(subjectId as string));
      setStudents(aux);
    }
    if (subjectId) {
      fetchData();
    }
  }, [subjectId]);

  useEffect(() => {
    async function fetchData() {
      try {
        const aux = await fetchShifts({
          classGroup: +(subjectId || ""),
          startDay: weekSelector.weekInfo[0].calendarDate,
          endDay: weekSelector.weekInfo[6].calendarDate,
        });
        setShifts(aux);
      } catch (error: any) {
        alert("No se encontraron resultados para los turnos. " + error.message);
      }
    }
    if (subjectId && weekSelector?.weekInfo) {
      fetchData();
    }
  }, [subjectId, weekSelector.weekInfo]);

  const handleSetTags = (tags: Tag[]) => {
    setTags(tags);
  };

  const filterServices = async (idScenario: number): Promise<Service[]> => {
    return servicesMap[idScenario] || [];
  };

  const associateTag = async (tag: number, service: number) => {
    try {
      const aux = await fetchAssociateTag({ tag, service });
      setAssociatedTags(aux);
    } catch (error: any) {
      alert(error.message);
    }
  };
  const dissociateTag = async (associatedId: number) => {
    try {
      const aux = await fetchDissociateTag({ associatedId });
      setAssociatedTags(aux);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const createTag = async (tag: string, scenario: number) => {
    try {
      const aux = await fetchCreateTag({
        tag,
        scenario,
      });
      handleSetTags(aux);
    } catch (error: any) {
      alert(error.message);
    }
  };
  const deleteTag = async (tag: number) => {
    try {
      const aux = await fetchDeleteTag({ tag });
      handleSetTags(aux);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const createShift = async (params: IFetchCreateShift) => {
    try {
      const aux = await fetchCreateShift(params);
      const key = params.day.replaceAll("-", "");
      setShifts((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), ...aux],
      }));
      alert("Turno creado");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <ShiftContext.Provider
      value={{
        loading,
        ...weekSelector,
        students,
        scenarios,
        workdays,
        servicesMap,
        tags,
        associatedTags,
        shifts,
        selectedShifts,
        studentFilter,
        handleSetTags,
        filterServices,
        createTag,
        deleteTag,
        associateTag,
        dissociateTag,
        createShift,
        setStudentFilter,
        setSelectedShifts,
      }}
    >
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
