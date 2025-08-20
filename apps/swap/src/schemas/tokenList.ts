import { isAddress } from "viem";
import { z } from "zod";

export const TokenInfoSchema = z.object({
  chainId: z.number(),
  address: z.string().refine(isAddress, { error: "Invalid Address" }),
  name: z.string(),
  symbol: z.string(),
  decimals: z.number(),
  logoURI: z.url().optional(),
});

export type TokenInfo = z.infer<typeof TokenInfoSchema>;

export const TokenListSchema = z.object({
  name: z.string(),
  timestamp: z.string(),
  version: z.object({
    major: z.number(),
    minor: z.number(),
    patch: z.number(),
  }),
  tokens: z.array(TokenInfoSchema),
});

export type TokenList = z.infer<typeof TokenListSchema>;
