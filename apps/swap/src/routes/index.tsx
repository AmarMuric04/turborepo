import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
  return <div>Hello, welcome!</div>;
};

export const Route = createFileRoute("/")({
  component: RouteComponent,
});
