import { API_BASE_URL } from "../constants/api";

export const fetchOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: ISuccessResponse<IOrder> = await response.json();
  return data.results;
};
