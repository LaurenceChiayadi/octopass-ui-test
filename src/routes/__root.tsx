import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const routes = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/customer',
    label: 'Customers',
  },
  {
    href: '/order',
    label: 'Orders',
  },
];

export const Route = createRootRoute({
  component: () => (
    <div className="bg-gray-300 min-h-screen">
      <div className="flex w-full justify-center items-center">
        <div className="flex justify-between items-center w-[1000px] py-1">
          <h1 className="font-semibold">Customer and Ordering System</h1>
          <div className="p-2 flex gap-2">
            {routes.map((route, index) => (
              <Link
                key={index}
                to={route.href}
                className=" px-2 py-1 rounded-sm font-semibold [&.active]:bg-[#111111] [&.active]:text-white"
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center items-center">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
});
