import { useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

import { fetchCustomers } from "../api/CustomerAPI";
import Table from "../components/Table";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const sortableFields = [
  "Id",
  "CompanyName",
  "ContactName",
  "Address",
  "PhoneNumber",
];

function RouteComponent() {
  const router = useRouter();
  const [sortField, setSortField] = useState(sortableFields[0]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  // const [pagination, setPagination] = useState<PaginationState>({
  //   pageIndex: 0,
  //   pageSize: 10,
  // });

  const { data, error } = useQuery({
    queryKey: ["customers", { sortField, sortDirection }],
    queryFn: () => fetchCustomers({ sortField, sortDirection }),
    placeholderData: keepPreviousData,
  });
  const customersData = data ?? [];

  const columns = useMemo<ColumnDef<ICustomer>[]>(
    () => [
      {
        accessorKey: "id",
        header: () => "ID",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "companyName",
        header: () => "Company Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "contactName",
        header: () => "Contact Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "address",
        header: () => "Address",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "phone",
        header: () => "Phone Number",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value);
  };

  const handleSortDirectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value as "asc" | "desc";
    setSortDirection(value);
  };

  const handleRowClick = (customer: ICustomer) => {
    router.navigate({ to: `/${customer.id}` });
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
      <Table
        data={customersData}
        columns={columns}
        handleRowClick={handleRowClick}
      />
    </div>
  );
}
