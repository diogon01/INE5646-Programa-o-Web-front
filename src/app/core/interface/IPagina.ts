export interface IPagina {
  content: Array<any>,
  last: boolean,
  totalPages: number,
  totalElements: number,
  size: number,
  first: boolean,
  numberOfElements: number
  empty: boolean
}
