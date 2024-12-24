import { EnumImage } from "@/app/model/EnumImage";
import Image from "next/image";
import React, { useState } from "react";

interface Tag {
  id: string;
  name: string;
  hospital: string;
}

interface AssociatedTag {
  id: string;
  tag: string;
  service: string;
  hospital: string;
}

export function TagsManager() {
  const [activeTab, setActiveTab] = useState<"create" | "associate">("create");
  const [tagName, setTagName] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [tags, setTags] = useState<Tag[]>([
    { id: "1", name: "Primer piso", hospital: "Hospital San José" },
  ]);

  // Estado para la pestaña de asociar
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [associatedTags, setAssociatedTags] = useState<AssociatedTag[]>([
    {
      id: "1",
      tag: "Primer piso",
      service: "Cardiología",
      hospital: "Hospital San José",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagName && selectedHospital) {
      setTags([
        ...tags,
        {
          id: Date.now().toString(),
          name: tagName,
          hospital: selectedHospital,
        },
      ]);
      setTagName("");
      setSelectedHospital("");
    }
  };

  const handleAssociateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTag && selectedService) {
      setAssociatedTags([
        ...associatedTags,
        {
          id: Date.now().toString(),
          tag: selectedTag,
          service: selectedService,
          hospital: "Hospital San José", // En un caso real, esto vendría del backend
        },
      ]);
      setSelectedTag("");
      setSelectedService("");
    }
  };

  const deleteTag = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const deleteAssociatedTag = (id: string) => {
    setAssociatedTags(associatedTags.filter((tag) => tag.id !== id));
  };

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
                    Selección de escenario{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={selectedHospital}
                    onChange={(e) => setSelectedHospital(e.target.value)}
                    required
                  >
                    <option value="">Seleccione el hospital</option>
                    <option value="Hospital San José">Hospital San José</option>
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
            <div className="border rounded">
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
                      <td className="px-4 py-2">{tag.name}</td>
                      <td className="px-4 py-2">{tag.hospital}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => deleteTag(tag.id)}
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
      ) : (
        <>
          <form onSubmit={handleAssociateSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="relative">
                <div className="space-y-1">
                  <label className="block text-sm font-medium">
                    Selección de etiqueta{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    required
                  >
                    <option value="">Etiqueta</option>
                    <option value="Primer piso">Primer piso</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <div className="space-y-1">
                  <label className="block text-sm font-medium">
                    Selección de servicio{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    required
                  >
                    <option value="">Jornada</option>
                    <option value="Cardiología">Cardiología</option>
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
            <div className="border rounded">
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
                      <td className="px-4 py-2">{tag.hospital}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => deleteAssociatedTag(tag.id)}
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
      )}
    </div>
  );
}
