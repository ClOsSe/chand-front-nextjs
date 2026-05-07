import type { Token } from "@/types/price";

export type TokenIcon = {
  label: string;
  src: string;
};

const fiatIconBySymbol: Record<string, TokenIcon> = {
  USD: { label: "US flag", src: "https://flagcdn.com/us.svg" },
  EUR: { label: "European Union flag", src: "https://flagcdn.com/eu.svg" },
  GBP: { label: "United Kingdom flag", src: "https://flagcdn.com/gb.svg" },
  CHF: { label: "Switzerland flag", src: "https://flagcdn.com/ch.svg" },
  CAD: { label: "Canada flag", src: "https://flagcdn.com/ca.svg" },
  JPY: { label: "Japan flag", src: "https://flagcdn.com/jp.svg" },
  TRY: { label: "Turkey flag", src: "https://flagcdn.com/tr.svg" },
};

const cryptoIconBySymbol: Record<string, TokenIcon> = {
  BTC: {
    label: "Bitcoin",
    src: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  },
  USDT: {
    label: "Tether",
    src: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
  },
};

export function getTokenIcon(token: Token): TokenIcon {
  const symbol = normalizeTokenText(token.ab);
  const tokenText = normalizeTokenText(`${token.ab} ${token.en} ${token.ty}`);
  const knownIcon = fiatIconBySymbol[symbol] ?? cryptoIconBySymbol[symbol];

  if (knownIcon) {
    return knownIcon;
  }

  if (isGoldToken(tokenText)) {
    return {
      label: `${token.en} gold coin`,
      src: createBadgeSvg("G", {
        background: "#f5d36b",
        foreground: "#7a5500",
        ring: "#d1a72c",
      }),
    };
  }

  return {
    label: token.en,
    src: createBadgeSvg(symbol.slice(0, 3) || "?", {
      background: "#e5e7eb",
      foreground: "#111827",
      ring: "#cbd5e1",
    }),
  };
}

function isGoldToken(value: string) {
  return [
    "GOLD",
    "GRAM",
    "GERAMI",
    "AZADI",
    "EMAMI",
    "HALF",
    "QUARTER",
    "COIN",
  ].some((keyword) => value.includes(keyword));
}

function normalizeTokenText(value: string) {
  return value.trim().toUpperCase();
}

function createBadgeSvg(
  text: string,
  colors: { background: string; foreground: string; ring: string },
) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="38" fill="${colors.background}" stroke="${colors.ring}" stroke-width="4"/>
      <text x="40" y="47" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="${colors.foreground}">${escapeSvgText(text)}</text>
    </svg>
  `;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function escapeSvgText(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
