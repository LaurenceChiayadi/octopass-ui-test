import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import Table from "../Table";

interface OrderTableChildProps {
  orderDetails: IOrderDetail[];
}

const OrderTableChild = (props: OrderTableChildProps) => {
  const columns = useMemo<ColumnDef<IOrderDetail>[]>(
    () => [
      {
        accessorKey: "orderId",
        header: "Order ID",
      },
      {
        accessorKey: "productId",
        header: "Product",
      },
      {
        accessorKey: "unitPrice",
        header: "Unit Price",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "discount",
        header: "Discount",
      },
    ],
    []
  );
  return (
    <Table
      data={props.orderDetails}
      columns={columns}
      showPagination={false}
      rounded={false}
    />
  );
};

export default OrderTableChild;
