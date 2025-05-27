import { useMemo } from 'react';
import type { ColumnDef, Row } from '@tanstack/react-table';

import Table from '../Table';
import { convertRawDateToDate } from '../../utils/dateUtils';
import OrderTableChild from './OrderTableChild';

interface OrderTableProps {
  orders: IOrder[];
}

const OrderTable = (props: OrderTableProps) => {
  const columns = useMemo<ColumnDef<IOrder>[]>(
    () => [
      {
        id: 'expander',
        header: () => null,
        cell: ({ row }) => {
          if (!row.original.orderDetails) return <>{'>'}</>;
          return (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: 'pointer' },
              }}
            >
              {row.getIsExpanded() ? '👇' : '👉'}
            </button>
          );
        },
      },
      {
        accessorKey: 'order.id',
        header: 'ID',
      },
      {
        accessorKey: 'order.customerId',
        header: 'Customer',
      },
      {
        accessorKey: 'order.employeeId',
        header: 'Employee ID',
      },
      {
        accessorFn: (row) => row.order.orderDate,
        header: 'Order Date',
        cell: (info) => convertRawDateToDate(info.getValue() as string),
      },
      {
        accessorFn: (row) => row.order.requiredDate,
        header: 'Required Date',
        cell: (info) => convertRawDateToDate(info.getValue() as string),
      },
      {
        accessorFn: (row) => row.order.shippedDate,
        header: 'Shipped Date',
        cell: (info) => convertRawDateToDate(info.getValue() as string),
      },
      {
        accessorKey: 'order.shipVia',
        header: 'Ship Via',
      },
      { accessorKey: 'order.freight', header: 'Freight' },
      {
        accessorKey: 'order.shipName',
        header: 'Ship Name',
      },
      {
        header: 'Ship Address',
        cell: (info) =>
          `${info.row.original.order.shipAddress}, ${info.row.original.order.shipCity}, ${info.row.original.order.shipPostalCode}, ${info.row.original.order.shipCountry}`,
      },
    ],
    []
  );

  const renderSubComponent = ({
    row,
  }: {
    row: Row<IOrder>;
  }): React.ReactElement => {
    if (row.original.orderDetails)
      return <OrderTableChild orderDetails={row.original.orderDetails} />;
    return <></>;
  };

  if (!props.orders || props.orders.length === 0) return <></>;

  return (
    <Table
      data={props.orders}
      columns={columns}
      renderSubComponent={renderSubComponent}
    />
  );
};

export default OrderTable;
