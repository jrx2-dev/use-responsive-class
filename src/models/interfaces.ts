export interface breakpointsInput {
  readonly [key: string]: number;
}

export interface mediaBreakpoints {
  class: string;
  from: number;
  toUnder: number;
}
