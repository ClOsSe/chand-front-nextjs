import { queryOptions } from "@tanstack/react-query";
import { getTokens } from "./price.service";
import { AppError } from "./api-error";

export const priceQueryKeys = {
  all: ["prices"] as const,
  tokens: () => [...priceQueryKeys.all, "tokens"] as const,
};

export const tokensQueryOptions = queryOptions({
  queryKey: priceQueryKeys.tokens(),
  queryFn: getTokens,
  staleTime: 10 * 60 * 1000,
  refetchOnMount: "always",
  retry: (failureCount, error) =>
    !(error instanceof AppError && error.status === 401) && failureCount < 1,
});
