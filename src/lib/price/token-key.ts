import type { Token } from "@/types/price";

export function getTokenKey(token: Token) {
  return `${token.ty}-${token.ab}`;
}
