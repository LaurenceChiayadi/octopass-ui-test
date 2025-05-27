import { useEffect, useMemo, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';

import { fetchCustomers } from '../../api/CustomerAPI';
import Table from '../../components/Table';

export const Route = createFileRoute('/customer/')({
  component: RouteComponent,
});

const sortableFields = [
  'Id',
  'CompanyName',
  'ContactName',
  'Address',
  'PhoneNumber',
];

function RouteComponent() {
  const router = useRouter();
  const [countryFilter, setCountryFilter] = useState('');
  const [debouncedCountryFilter, setDebouncedCountryFilter] =
    useState(countryFilter);
  const [sortField, setSortField] = useState(sortableFields[0]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, error } = useQuery({
    queryKey: [
      'customers',
      {
        sortField,
        sortDirection,
        pagination,
        debouncedCountryFilter,
      },
    ],
    queryFn: () =>
      fetchCustomers({
        sortField,
        sortDirection,
        pagination,
        filter: debouncedCountryFilter,
      }),
    placeholderData: keepPreviousData,
  });

  const columns = useMemo<ColumnDef<ICustomer>[]>(
    () => [
      {
        accessorKey: 'id',
        header: () => 'ID',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'country',
        header: () => 'Country',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'companyName',
        header: () => 'Company Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'contactName',
        header: () => 'Contact Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'phone',
        header: () => 'Phone Number',
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCountryFilter(countryFilter);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [countryFilter]);

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value);
  };

  const handleSortDirectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value as 'asc' | 'desc';
    setSortDirection(value);
  };

  const handleRowClick = (customer: ICustomer) => {
    router.navigate({ to: `/customer/${customer.id}` });
  };

  if (error) return <div>Error: {error?.message}</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full mx-auto">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="input"
        >
          Country Filter
        </label>
        <input
          id="input"
          type="text"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
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
      <Table
        data={data ? data.results : []}
        columns={columns}
        handleRowClick={handleRowClick}
        pagination={pagination}
        setPagination={setPagination}
        rowCount={data && data.total}
        manualPagination={true}
      />
    </div>
  );
}
