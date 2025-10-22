import { api, ENDPOINTS } from "./client";

export function buildServicePayload(src) {
  return {
    name: src.name ?? "",
    iconPath: src.iconPath ?? "",
    imagePath: src.imagePath ?? "",
    minHoursRequired: Number(src.minHoursRequired) || 0,
    price: Number(src.price) || 0,
    additionalHourPrice: Number(src.additionalHourPrice) || 0,
    introTitle: src.introTitle ?? "",
    introduction: typeof src.introduction === "string" ? src.introduction : "",
    whyChooseUs: typeof src.whyChooseUs === "string" ? src.whyChooseUs : "",
    description: src.description ?? "",
    metaTitle: src.metaTitle ?? "",
    metaDescription: src.metaDescription ?? "",
    is_license_required: !!src.is_license_required,
    status: src.status ?? "active",
    slug: src.slug ?? "",
  };
}

export async function createService(data) {
  const payload = buildServicePayload(data);
  const res = await api.post(ENDPOINTS.services, payload);
  return res?.data;
}

export async function updateService(id, data) {
  const payload = buildServicePayload(data);
  const res = await api.put(`${ENDPOINTS.services}/${id}`, payload);
  return res?.data;
}

export async function updateServiceStatus(id, status) {
  const res = await api.put(`${ENDPOINTS.services}/${id}`, { status });
  return res?.data;
}

export async function uploadServiceFile(file, folder = "services", carousal = "false") {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", folder);
  fd.append("carousal", carousal);
  const res = await api.post(ENDPOINTS.upload, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return (
    res?.data?.data?.url ||
    res?.data?.data?.Location ||
    res?.data?.data?.path ||
    res?.data?.url ||
    res?.data?.path ||
    ""
  );
}

export async function deleteService(id) {
  const res = await api.delete(`${ENDPOINTS.services}/${id}`);
  return res?.data;
}