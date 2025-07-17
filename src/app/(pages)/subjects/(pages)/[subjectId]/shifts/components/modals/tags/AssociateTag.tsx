import { IEnumImage } from "@/app/model/EnumImage";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useShiftContext } from "../../../context/ShiftContext";
import { Service } from "../../../context/util/services";
import { Tag } from "../../../context/util/tags";

interface IAssociateTag {
  closeImage: IEnumImage;
  tags: Tag[];
}

export default function AssociateTag({ closeImage, tags }: IAssociateTag) {
  const [selectedTag, setSelectedTag] = useState<number>(0);
  const [selectedService, setSelectedService] = useState<number>(0);
  const [services, setServices] = useState<Service[]>([]);

  const { filterServices, associatedTags, associateTag, dissociateTag } =
    useShiftContext();

  const handleAssociateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTag && selectedService) {
      associateTag(selectedTag, selectedService);
      setSelectedTag(0);
      setSelectedService(0);
    }
  };

  const handleSelectTag = async (e: ChangeEvent<HTMLSelectElement>) => {
    const aux = +e.target.value;
    setSelectedTag(aux);
    const idScenario = tags.find((item) => item.id == aux)?.idScenario;
    if (typeof idScenario === "number") {
      setServices(await filterServices(idScenario));
    }
  };

  return (
    <>
      <form onSubmit={handleAssociateSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="relative">
            <div className="space-y-1">
              <label className="block text-sm font-medium">
                Selección de etiqueta <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedTag}
                onChange={handleSelectTag}
                required
              >
                <option value={0} disabled>
                  ...
                </option>
                {tags?.map((item) => (
                  <option key={`tag-option-${item.id}`} value={item.id}>
                    {item.tag}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <div className="space-y-1">
              <label className="block text-sm font-medium">
                Selección de servicio <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedService}
                onChange={(e) => setSelectedService(+e.target.value)}
                required
              >
                <option value={0} disabled>
                  {selectedTag ? "..." : "Seleccione una etiqueta primero"}
                </option>
                {services.map((item) => (
                  <option key={`service-option-${item.id}`} value={item.id}>
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
            ASOCIAR
          </button>
        </div>
      </form>

      {/* Associated tags list */}
      <div>
        <h3 className="font-medium mb-4">LISTA DE ETIQUETAS ASOCIADAS</h3>
        <div className="border rounded max-h-96 overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Etiqueta</th>
                <th className="px-4 py-2 text-left">Servicio</th>
                <th className="px-4 py-2 text-left">Hospital</th>
                <th className="px-4 py-2 text-left">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {associatedTags.map((tag) => (
                <tr key={tag.id} className="border-t">
                  <td className="px-4 py-2">{tag.tag}</td>
                  <td className="px-4 py-2">{tag.service}</td>
                  <td className="px-4 py-2">{tag.scenario}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => dissociateTag(tag.id)}
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
