import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <div>Hello! This is the homepage for Customer and Ordering System</div>
      <div>Please proceed to select the tab option above.</div>
    </div>
  );
}
