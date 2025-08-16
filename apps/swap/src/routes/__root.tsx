import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Header } from "components/molecules";

const RootComponent = () => {
  return (
    <React.Fragment>
      <div className="text-content-primary bg-background-primary">
        <Header />
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
