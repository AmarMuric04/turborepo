import { Outlet, createRootRoute } from "@tanstack/react-router";
import { PageSection } from "components/atoms";
import { Footer, Header } from "components/molecules";

const RootComponent = () => {
  return (
    <>
      <PageSection>
        <Header />
      </PageSection>

      <Outlet />

      <PageSection>
        <Footer />
      </PageSection>
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
