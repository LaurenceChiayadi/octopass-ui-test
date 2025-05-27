import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import debounce from "lodash/debounce";

import { fetchOrders } from "../../api/OrderAPI";
import OrderTable from "../../components/Order/OrderTable";

export const Route = createFileRoute("/order/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, error, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  if (error) return <div>Error: {error?.message}</div>;

  if (!data) return <div>No data found</div>;

  return (
    <>
      <OrderTable orders={data} />
    </>
  );
}
