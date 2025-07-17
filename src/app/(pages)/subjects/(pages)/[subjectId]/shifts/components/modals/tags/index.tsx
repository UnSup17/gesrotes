import { EnumImage } from "@/app/model/EnumImage";
import { useState } from "react";
import { useShiftContext } from "../../../context/ShiftContext";
import AssociateTag from "./AssociateTag";
import CreateTag from "./CreateTag";

export function TagsManager() {
  const [activeTab, setActiveTab] = useState<"create" | "associate">("create");
  const { tags, handleSetTags } = useShiftContext();

  const closeImage = EnumImage.getImage("close");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b">
        <div className="flex">
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "create"
                ? "border-b-2 border-red-800 text-red-800"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("create")}
          >
            CREAR ETIQUETAS
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "associate"
                ? "border-b-2 border-red-800 text-red-800"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("associate")}
          >
            ASOCIAR ETIQUETAS
          </button>
        </div>
      </div>

      {activeTab === "create" ? (
        <CreateTag {...{ tags, closeImage, handleSetTags }} />
      ) : (
        <AssociateTag {...{ closeImage, tags }} />
      )}
    </div>
  );
}
