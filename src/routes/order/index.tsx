import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { fetchOrders } from "../../api/OrderAPI";
import OrderTable from "../../components/Order/OrderTable";

export const Route = createFileRoute("/order/")({
  component: RouteComponent,
});

const sortableFields = [
  "Id",
  "Customer Id",
  "Employee Id",
  "Order Date",
  "Required Date",
  "Shipped Date",
  "Ship Via",
  "Freight",
  "Ship Name",
  "Ship Address",
  "Ship City",
  "Ship Postal Code",
  "Ship Country",
];

function RouteComponent() {
  const [sortField, setSortField] = useState(sortableFields[0]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const { data, error } = useQuery({
    queryKey: ["orders", { sortField, sortDirection }],
    queryFn: () => fetchOrders({ sortField, sortDirection }),
  });

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value);
  };

  const handleSortDirectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value as "asc" | "desc";
    setSortDirection(value);
  };

  if (error) return <div>Error: {error?.message}</div>;

  if (!data) return <div>No data found</div>;

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
      <OrderTable orders={data} />
    </div>
  );
}
