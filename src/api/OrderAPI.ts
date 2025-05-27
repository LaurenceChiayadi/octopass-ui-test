import { API_BASE_URL } from "../constants/api";

export const fetchOrders = async (params: IAPIParams) => {
  const url = new URL("/query/orders", API_BASE_URL);
  if (params.sortField && params.sortDirection) {
    url.searchParams.append(
      params.sortDirection === "asc" ? "OrderBy" : "OrderByDesc",
      params.sortField
    );
  }
  const response = await fetch(url.toString(), {
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
