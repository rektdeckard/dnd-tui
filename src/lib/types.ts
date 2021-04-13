import { Character } from ".";

export type ValueOf<T> = T[keyof T];

export type KeysOfType<T, P> = {
  [K in keyof T]: T[K] extends P ? K : never;
}[keyof T];

export type PropertiesOfType<T, P> = {
  [K in KeysOfType<T, P>]: P;
};

export type MutableProperties<T extends object = {}> = Pick<
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

export type BooleanKeys<T> = KeysOfType<T, boolean>;
export type OnlyBoolean<T> = PropertiesOfType<T, boolean>;
export type BooleanProperty = NonNullable<BooleanKeys<Character>>;

export type NumericKeys<T> = KeysOfType<T, number>;
export type OnlyNumeric<T> = PropertiesOfType<T, number>;
export type NumericProperty = NonNullable<
  NumericKeys<MutableProperties<Character>>
>;

export type StringKeys<T> = KeysOfType<T, string>;
export type OnlyString<T> = PropertiesOfType<T, string>;
export type StringProperty = NonNullable<
  StringKeys<MutableProperties<Character>>
>;
