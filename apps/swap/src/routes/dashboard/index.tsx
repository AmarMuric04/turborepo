import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "components/pages/dashboard-page";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
});
