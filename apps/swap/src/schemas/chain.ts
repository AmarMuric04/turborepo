import type { config } from "wagmi.config";

export type Chain = (typeof config)["chains"][number];

export type ChainId = Chain["id"];
