import { createFileRoute, useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { fetchCustomerDetail } from '../../api/CustomerAPI';
import CustomerInfoPanel from '../../components/Customer/CustomerInfoPanel';
import CustomerOrderTable from '../../components/Customer/CustomerOrderTable';

export const Route = createFileRoute('/customer/$customerId')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = useParams({ from: '/customer/$customerId' });

  const { data, error, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: () => fetchCustomerDetail(params.customerId),
    enabled: !!params.customerId,
    refetchOnWindowFocus: true,
  });
  if (error) return <div>Error: {error?.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>No data found</div>;

  return (
    <div className="flex flex-col gap-4">
      <CustomerInfoPanel customer={data.customer} />
      <h2 className="text-xl font-semibold">Orders</h2>
      {data.orders && data.orders.length > 0 ? (
        <CustomerOrderTable orders={data.orders} />
      ) : (
        <div className="flex justify-center items-center min-w-[800px]">
          Customer has no orders.
        </div>
      )}
    </div>
  );
}
