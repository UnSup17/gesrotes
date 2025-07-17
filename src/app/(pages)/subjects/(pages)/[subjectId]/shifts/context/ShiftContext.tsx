"use cliet";

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchScenarios, Scenario } from "./util/scenarios";
import { fetchServicesMap, Service, ServicesMap } from "./util/services";
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

interface IParams {
  scenarios: Scenario[];
  tags: Tag[];
  associatedTags: AssociatedTag[];
  servicesMap: ServicesMap;
  handleSetTags: (tags: Tag[]) => void;
  filterServices: (idScenario: number) => Promise<Service[]>;
  createTag: (tag: string, scenario: number) => Promise<void>
  deleteTag: (tag: number) => Promise<void>;
  associateTag: (tag: number, service: number) => void;
  dissociateTag: (associatedId: number) => Promise<void>;
}

const ShiftContext = createContext<IParams | null>(null);

export const ShiftProvider: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [servicesMap, setServicesMap] = useState<ServicesMap>([]);
  const [associatedTags, setAssociatedTags] = useState<AssociatedTag[]>([]);

  useEffect(() => {
    async function fetchData() {
      const scenarios = await fetchScenarios();
      const tags = await fetchTags();
      const associatedTags = await fetchAssociatedTags();
      const servicesMap = await fetchServicesMap();
      setScenarios(scenarios);
      setTags(tags);
      setAssociatedTags(associatedTags);
      setServicesMap(servicesMap);
    }
    fetchData();
  }, []);

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

  return (
    <ShiftContext.Provider
      value={{
        scenarios,
        servicesMap,
        tags,
        associatedTags,
        handleSetTags,
        filterServices,
        createTag,
        deleteTag,
        associateTag,
        dissociateTag,
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
