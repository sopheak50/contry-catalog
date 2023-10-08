export interface IContry {
  idd: IContryIdd
  flags: IContryFlags
  name: IContryName
  cca2: string
  cca3: string
  altSpellings: string[]
}

interface IContryName {
  common: string
  official: string
  nativeName: Record<string, INativeName>
}
export interface INativeName {
  official: string
  common: string
}
interface IContryIdd {
  root: string
  suffixes: string[]
}

interface IContryFlags {
  png: string
  svg: string
}

export interface IPagination {
  page: number
  pageSize: number
  hasNex: boolean
  hasPre: boolean
  totalPages: number
  totalItem: number
}
