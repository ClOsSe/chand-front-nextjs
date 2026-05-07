import { queryOptions } from "@tanstack/react-query";
import { getTokens } from "./price.service";

export const priceQueryKeys = {
  all: ["prices"] as const,
  tokens: () => [...priceQueryKeys.all, "tokens"] as const,
};

export const tokensQueryOptions = queryOptions({
  queryKey: priceQueryKeys.tokens(),
  queryFn: getTokens,
  staleTime: 60000,
});
