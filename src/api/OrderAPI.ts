import { API_BASE_URL } from '../constants/api';

export const fetchOrders = async (params: IAPIParams) => {
  const url = new URL('/query/orders', API_BASE_URL);

  if (params.sortField && params.sortDirection) {
    url.searchParams.append(
      params.sortDirection === 'asc' ? 'OrderBy' : 'OrderByDesc',
      params.sortField
    );
  }
  if (params.filter) {
    url.searchParams.append('Freight', params.filter);
  }

  url.searchParams.append(
    'skip',
    (params.pagination.pageIndex * params.pagination.pageSize).toString()
  );
  url.searchParams.append('take', params.pagination.pageSize.toString() ?? 10);

  url.searchParams.append('Include', 'total');

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: ISuccessResponse<IOrderInfo> = await response.json();
  return data;
};
