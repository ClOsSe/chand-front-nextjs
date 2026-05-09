import { api } from "@/services/api";
import type { Token } from "@/types/price";

export async function getTokens(): Promise<Token[]> {
  const { data } = await api.get("/prices/latest");

  return data.data;
}