import { IEnumImage } from "@/app/model/EnumImage";
import Image from "next/image";
import { useState } from "react";
import { useShiftContext } from "../../../context/ShiftContext";

interface IAssociateTag {
  closeImage: IEnumImage;
}

export default function CreateTag({ closeImage }: IAssociateTag) {
  const [tagName, setTagName] = useState("");
  const [selectedScenario, setSelectedScenario] = useState<number>(0);
  const { tags, scenarios, createTag, deleteTag } = useShiftContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tagName && selectedScenario != 0) {
      createTag(tagName, selectedScenario);
      setTagName("");
      setSelectedScenario(0);
    }
  };

  const handleDeleteTag = async (id: number) => {
    deleteTag(id);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="relative">
            <div className="space-y-1">
              <label className="block text-sm font-medium">
                Nombre de etiqueta <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ingrese un nombre"
                className="w-full p-2 border rounded-md"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="relative">
            <div className="space-y-1">
              <label className="block text-sm font-medium">
                Selección de escenario <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedScenario}
                onChange={(e) => setSelectedScenario(+e.target.value)}
                required
              >
                <option value={0} disabled>
                  ...
                </option>
                {scenarios.map((item) => (
                  <option key={`scenario-option-${item.id}`} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-[#0A2167] text-white rounded hover:bg-blue-800"
          >
            CREAR
          </button>
        </div>
      </form>

      {/* Tags list */}
      <div>
        <h3 className="font-medium mb-4">LISTA DE ETIQUETAS CREADAS</h3>
        <div className="border rounded max-h-96 overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Etiqueta</th>
                <th className="px-4 py-2 text-left">Hospital</th>
                <th className="px-4 py-2 text-left">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag) => (
                <tr key={tag.id} className="border-t">
                  <td className="px-4 py-2">{tag.tag}</td>
                  <td className="px-4 py-2">{tag.scenario}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteTag(tag.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <div className="h-5 w-5">
                        <Image
                          src={closeImage.src}
                          alt={closeImage.ariaLabel}
                          width={20}
                          height={20}
                        />
                      </div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
