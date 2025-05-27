import { useEffect, useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import debounce from "lodash/debounce";

import { fetchCustomers } from "../api/CustomerAPI";
import Table from "../components/Table";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchParams);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, error, refetch } = useQuery({
    queryKey: ["customers", pagination],
    queryFn: () => fetchCustomers(pagination),
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

  const handleRowClick = (customer: ICustomer) => {
    router.navigate({ to: `/${customer.id}` });
  };

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedQuery(searchParams);
    }, 500);

    handler();

    return () => {
      handler.cancel();
    };
  }, [searchParams]);

  if (error) return <div>Error: {error?.message}</div>;
  // if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </div>

          <input
            type="search"
            aria-label="Search"
            className="w-full h-10 pl-10 pr-4 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={"Search Customer..."}
            value={searchParams}
            onChange={(e) => setSearchParams(e.target.value)}
          />
        </div>
        <button
          className="w-25 bg-black rounded text-white"
          onClick={() => refetch()}
        >
          Search
        </button>
      </div>
      <Table
        data={customersData}
        columns={columns}
        handleRowClick={handleRowClick}
      />
    </div>
  );
}
