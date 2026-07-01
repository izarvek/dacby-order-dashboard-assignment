import api from "./axios";

export const getOrders = async (status = "") => {
  const response = await api.get("/orders", {
    params: {
      status,
    },
  });

  return response.data;
};