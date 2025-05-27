import { API_BASE_URL } from "../constants/api";

export const fetchCustomers = async (options: {
  pageIndex: number;
  pageSize: number;
}) => {
  const url = new URL("/query/customers", API_BASE_URL);
  url.searchParams.append("skip", options.pageIndex.toString());
  url.searchParams.append("take", options.pageSize.toString());
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: ISuccessResponse<ICustomer> = await response.json();
  return data.results;
};

export const fetchCustomerDetail = async (customerId: string) => {
  const response = await fetch(`${API_BASE_URL}/customers/${customerId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: ICustomerDetail = await response.json();
  return data;
};
