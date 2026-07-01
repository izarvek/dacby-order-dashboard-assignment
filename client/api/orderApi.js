import api from "./axios";

export const createOrder = (data) =>
  api.post("/orders", data);

export const getOrders = (status) =>
  api.get("/orders", { params: { status } });

export const getOrderById = (id) =>
  api.get(`/orders/${id}`);

export const updateOrder = (id, data) =>
  api.patch(`/orders/${id}`, data);

export const deleteOrder = (id) =>
  api.delete(`/orders/${id}`);