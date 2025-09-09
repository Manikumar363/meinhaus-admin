import { request, getToken } from "../client";

export async function fetchQueries(page = 1, token) {
  const t = token || getToken();
  const json = await request(`/query`, { params: { page }, token: t });
  return json.data?.queries || [];
}

export async function deleteQuery(id, token) {
  const t = token || getToken();
  return request(`/query/${id}`, { method: "DELETE", token: t });
}