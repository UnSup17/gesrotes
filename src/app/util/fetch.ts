"use server"

interface IFetchData {
  specificEndpoint: string | URL | globalThis.Request;
  init?: RequestInit;
  body?: any;
}
export async function fetchData({ specificEndpoint, init, body }: IFetchData): Promise<Response> {
  const aux = fetch(`${process.env.API_URL}/${specificEndpoint}`, {
    ...init, body
  }
  );
  return aux;
}