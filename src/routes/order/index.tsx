import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { fetchOrders } from '../../api/OrderAPI';
import OrderTable from '../../components/Order/OrderTable';

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
  const [sortField, setSortField] = useState(sortableFields[0]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const { data, error, isFetching } = useQuery({
    queryKey: ['orders', { sortField, sortDirection }],
    queryFn: () => fetchOrders({ sortField, sortDirection }),
  });

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
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        data && <OrderTable orders={data.map((order) => ({ order: order }))} />
      )}
    </div>
  );
}
