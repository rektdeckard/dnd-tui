import { Roll, RollOrFixed } from "./dice";

export type ValueOf<T> = T[keyof T];

export type BooleanKeys<T> = {
  [k in keyof T]: T[k] extends boolean ? k : never;
}[keyof T];

export type OnlyBoolean<T> = { [k in BooleanKeys<T>]: boolean };

export type NumericKeys<T> = {
  [k in keyof T]: T[k] extends number ? k : never;
}[keyof T];

export type OnlyNumeric<T> = { [k in NumericKeys<T>]: number };

export type Mutable<T extends object = {}> = Pick<
  {
    [K in keyof T]: T[K];
  },
  WritableKeys<T>
>;

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;

export type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P
  >;
}[keyof T];

export type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >;
}[keyof T];

export interface RollResult {
  roll: Roll;
  dice: number[];
  total: number;
}

export const formatNumber = (n: number) => (n >= 0 ? `+${n}` : n);

export const formatName = (name: string) =>
  name
    .match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g)
    ?.join(" ")
    .replace(
      /\w\S*/g,
      (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()
    ) ?? name;

export const formatDie = (r: RollOrFixed): string | number => {
  if (typeof r === "number") return r;
  return `${r.count ?? 1}d${r.die}${
    r.modifier ? `+${r.modifier.toString().toUpperCase()}` : ""
  }`;
};

export const performRoll = (roll: Roll): RollResult => {
  const { die, count = 1 } = roll;
  const dice = Array(count)
    .fill(null)
    .map(() => Math.floor(Math.random() * die) + 1);
  const total = dice.reduce((acc, curr) => acc + curr, 0);
  return { roll, dice, total };
};

export const getBorder = (
  isFocused: boolean,
  isActive: boolean
): string | undefined => {
  if (isActive && isFocused) return "cyan";
  if (isFocused) return "yellow";
  return undefined;
};
