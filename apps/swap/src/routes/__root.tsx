import { Outlet, createRootRoute } from "@tanstack/react-router";
import { PageSection } from "components/atoms";
import { Footer, Header } from "components/molecules";

const RootComponent = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <PageSection>
          <Header />
        </PageSection>

        <Outlet />
      </main>

      <PageSection>
        <Footer />
      </PageSection>
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
