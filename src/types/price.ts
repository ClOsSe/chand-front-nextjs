export interface Token {
  ab: string
  av: string
  en: string
  fa: string
  ps: PriceList[]
  ty: string
}

export interface PriceList {
  bp?: number
  sp: number
  ts: string
}
