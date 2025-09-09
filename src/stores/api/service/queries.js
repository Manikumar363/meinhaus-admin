import { api, ENDPOINTS } from "./client";

export async function getServices(status = "active") {
  const res = await api.request({
    method: "GET",
    url: ENDPOINTS.services,
    data: { status },
    params: { status },
  });
  return res?.data?.data?.services || [];
}

export async function getServiceById(id, status = "active") {
  const res = await api.request({
    method: "GET",
    url: `${ENDPOINTS.services}/${id}`,
    data: { status },
  });
  return res?.data?.data?.service?.[0] || null;
}