import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Header } from "components/molecules";

const RootComponent = () => {
  return (
    <div className="text-content-primary bg-background-primary min-h-screen">
      <div className="container mx-auto">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
