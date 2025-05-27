import { useEffect, useMemo, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';

import { fetchOrders } from '../../api/OrderAPI';
import { convertRawDateToDate } from '../../utils/dateUtils';
import Table from '../../components/Table';

export const Route = createFileRoute('/order/')({
  component: RouteComponent,
});

const sortableFields = [
  'Id',
  'CustomerId',
  'EmployeeId',
  'OrderDate',
  'RequiredDate',
  'ShippedDate',
  'ShipVia',
  'Freight',
  'ShipName',
  'ShipAddress',
  'ShipCity',
  'ShipPostalCode',
  'ShipCountry',
];

function RouteComponent() {
  const [freightFilter, setFreightFilter] = useState('');
  const [debouncedFreightFilter, setDebouncedFreightFilter] =
    useState(freightFilter);
  const [sortField, setSortField] = useState(sortableFields[0]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, error } = useQuery({
    queryKey: [
      'orders',
      { sortField, sortDirection, pagination, debouncedFreightFilter },
    ],
    queryFn: () =>
      fetchOrders({
        sortField,
        sortDirection,
        pagination,
        filter: debouncedFreightFilter,
      }),
    placeholderData: keepPreviousData,
  });

  const columns = useMemo<ColumnDef<IOrderInfo>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'customerId',
        header: 'Customer',
      },
      {
        accessorKey: 'employeeId',
        header: 'Employee ID',
      },
      {
        accessorFn: (row) => row.orderDate,
        header: 'Order Date',
        cell: (info) => convertRawDateToDate(info.getValue() as string),
      },
      {
        accessorFn: (row) => row.requiredDate,
        header: 'Required Date',
        cell: (info) => convertRawDateToDate(info.getValue() as string),
      },
      {
        accessorFn: (row) => row.shippedDate,
        header: 'Shipped Date',
        cell: (info) => convertRawDateToDate(info.getValue() as string),
      },
      {
        accessorKey: 'shipVia',
        header: 'Ship Via',
      },
      { accessorKey: 'freight', header: 'Freight' },
      {
        accessorKey: 'shipName',
        header: 'Ship Name',
      },
    ],
    []
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFreightFilter(freightFilter);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [freightFilter]);

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value);
  };

  const handleSortDirectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value as 'asc' | 'desc';
    setSortDirection(value);
  };

  if (error) return <div>Error: {error?.message}</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full mx-auto">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="input"
        >
          Freight Filter
        </label>
        <input
          id="input"
          type="text"
          value={freightFilter}
          onChange={(e) => setFreightFilter(e.target.value)}
          placeholder="Type something..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex gap-4">
        <label>
          Sort by:
          <select
            id="sortField"
            value={sortField}
            onChange={handleSortFieldChange}
          >
            {sortableFields.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          Direction:
          <select
            id="sortDirection"
            value={sortDirection}
            onChange={handleSortDirectionChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      {data && (
        <Table
          data={data.results}
          columns={columns}
          rowCount={data.total}
          pagination={pagination}
          setPagination={setPagination}
          manualPagination={true}
        />
      )}
    </div>
  );
}
