import { createFileRoute } from "@tanstack/react-router";
import { SwapPage } from "components/pages";

export const Route = createFileRoute("/swap/")({
  component: SwapPage,
});
