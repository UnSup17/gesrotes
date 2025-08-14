"use server"

interface IFetchData {
  specificEndpoint: string | URL | globalThis.Request;
  init?: RequestInit;
  body?: any;
}
export async function fetchData({ specificEndpoint, init, body }: IFetchData): Promise<Response> {
  const url = `${process.env.API_URL}/${specificEndpoint}`;
  console.log(`Requesting: ${url}, body: ${body}`);
  const aux = fetch(url, {
    ...init, body
  }
  );
  return aux;
}