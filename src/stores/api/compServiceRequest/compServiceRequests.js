

import { request, getToken } from "../client";

/**
 * Fetch Complimentary Service Requests
 * Params: service (optional), status, search
 * Will still fire request even without token (expect 401) so you can see it in Network tab.
 */
export async function fetchCompServiceRequests({ service, status, search, token } = {}) {
  const t = token || getToken();
  const qs = new URLSearchParams();
  if (service) qs.set("service", service);
  if (status && status !== "All" && status !== "") qs.set("status", status);
  if (search) qs.set("search", search);
  const path = `/comp-services-req?${qs.toString()}`;
  console.log("[CompSvc] GET", path, t ? "(auth)" : "(no auth)");
  const json = await request(path, { token: t });
  // Adjust depending on real shape (previous code expected json.data array)
  if (Array.isArray(json.data)) return json.data;
  if (Array.isArray(json.data?.requests)) return json.data.requests;
  return [];
}

/**
 * Update (PUT) status
 */
export async function updateCompServiceRequestStatus(id, newStatus, token) {
  if (!id) throw new Error("id required");
  const t = token || getToken();
  const path = `/comp-services-req/${id}`;
  console.log("[CompSvc] PUT", path, newStatus);
  return request(path, {
    method: "PUT",
    token: t,
    body: JSON.stringify({ status: newStatus }),
  });
}

/**
 * Delete request
 */
export async function deleteCompServiceRequest(id, token) {
  if (!id) throw new Error("id required");
  const t = token || getToken();
  const path = `/comp-services-req/${id}`;
  console.log("[CompSvc] DELETE", path);
  return request(path, {
    method: "DELETE",
    token: t,
  });
}