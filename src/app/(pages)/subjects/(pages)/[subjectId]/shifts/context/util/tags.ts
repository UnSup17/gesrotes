"use server"

import { fetchData } from "@/app/util/fetch";

export interface Tag {
  id: number;
  tag: string;
  scenario: string;
  idScenario: number;
}
export async function fetchTags(): Promise<Tag[]> {
  return fetchData({
    specificEndpoint: `etiquetas/all`,
  })
    .then((response) => response.json())
    .then((json) => Array.from(json).map((item: any) => {
      return { id: item.id, tag: item.etiqueta, scenario: item.escenario, idScenario: item.idEscenario } as Tag;
    }))
    .catch((err) => err);
}

export interface AssociatedTag {
  id: number;
  tag: string;
  scenario: string;
  service: string;
}
export async function fetchAssociatedTags(): Promise<AssociatedTag[]> {
  return fetchData({
    specificEndpoint: `etiquetas/asociadas`,
  })
    .then((response) => response.json())
    .then((json) => Array.from(json).map((item: any) => {
      return { id: item.id, tag: item.etiqueta, scenario: item.escenario, service: item.servicio } as AssociatedTag;
    }))
    .catch((err) => err);
}

export interface CreateTag {
  tag: string;
  scenario: number;
}
export async function fetchCreateTag({ tag, scenario }: CreateTag): Promise<Tag[]> {
  const response = await fetchData({
    specificEndpoint: `etiquetas/nueva`,
    init: {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
    },
    body: JSON.stringify({
      escenario: scenario,
      etiqueta: tag
    })
  })

  if (!response.ok) {
    const errorJson = await response.json();
    throw new Error(errorJson.message || 'Ocurrió un error inesperado');
  }

  const json = await response.json();
  return json.data.map((item: any) => ({
    id: item.id,
    tag: item.etiqueta,
    scenario: item.escenario,
    idScenario: item.idEscenario,
  }));
}

export interface AssociateTag {
  tag: number;
  service: number;
}
export async function fetchAssociateTag({ tag, service }: AssociateTag): Promise<AssociatedTag[]> {
  const response = await fetchData({
    specificEndpoint: `etiquetas/asociar`,
    init: {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
    },
    body: JSON.stringify({
      servicio: service,
      etiqueta: tag
    })
  })

  if (!response.ok) {
    const errorJson = await response.json();
    throw new Error(errorJson.message || 'Ocurrió un error inesperado');
  }

  const json = await response.json();
  return json.data.map((item: any) => ({
    id: item.id,
    tag: item.etiqueta,
    scenario: item.escenario,
    idScenario: item.idEscenario,
  }));
}

export interface DeleteTag {
  tag: number;
}
export async function fetchDeleteTag({ tag }: DeleteTag): Promise<Tag[]> {
  const response = await fetchData({
    specificEndpoint: `etiquetas/${tag}/eliminar`,
    init: {
      method: "DELETE",
    },
  });

  if (!response.ok) {
    const errorJson = await response.json();
    throw new Error(errorJson.message || 'Ocurrió un error inesperado');
  }

  const json = await response.json();
  return json.data.map((item: any) => ({
    id: item.id,
    tag: item.etiqueta,
    scenario: item.escenario,
    idScenario: item.idEscenario,
  }));
}

export interface DissociateTag {
  associatedId: number;
}
export async function fetchDissociateTag({ associatedId }: DissociateTag): Promise<AssociatedTag[]> {
  return fetchData({
    specificEndpoint: `etiquetas/${associatedId}/desasociar`,
    init: {
      method: "DELETE",
    }
  })
    .then((response) => response.json())
    .then((json) => json.data.map((item: any) => {
      return { id: item.id, tag: item.etiqueta, scenario: item.escenario, service: item.servicio } as AssociatedTag;
    }))
    .catch((err) => err);
}