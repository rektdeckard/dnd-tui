import { Roll, RollOrFixed, RollResult } from ".";

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
  return `${r.advantage ? "▲ " : r.disadvantage ? "▼ " : ""}${r.count ?? 1}d${
    r.die
  }${
    r.modifier
      ? `${
          typeof r.modifier !== "number" || r.modifier >= 0 ? "+" : ""
        }${r.modifier.toString().toUpperCase()}`
      : ""
  }`;
};

export const formatExperience = (e: number | string | undefined = 0): string =>
  typeof e === "number" ? `${e} XP` : e;

export const performRoll = (roll: Roll): RollResult => {
  const { die, count = 1, advantage = false, disadvantage = false } = roll;
  const dice = Array(count > 1 ? count : advantage || disadvantage ? 2 : 1)
    .fill(null)
    .map(() => Math.floor(Math.random() * die) + 1);
  const total = advantage
    ? Math.max(...dice)
    : disadvantage
    ? Math.min(...dice)
    : dice.reduce((acc, curr) => acc + curr, 0);
  return { roll, dice, total };
};

export const getColor = (
  isFocused: boolean,
  isActive: boolean
): string | undefined => {
  if (isActive && isFocused) return "red";
  if (isFocused) return "yellow";
};

export const getRollColor = (result: RollResult, index: number = -1) => {
  if (index === -1) {
    if (result.roll.count !== 1) return undefined;
    if (
      !result.roll.disadvantage &&
      Math.max(...result.dice) === result.roll.die
    )
      return "green";
    if (!result.roll.advantage && Math.min(...result.dice) === 1) return "red";
    return undefined;
  }
  if (result.dice[index] === 1) return "red";
  if (result.dice[index] === result.roll.die) return "green";
  return undefined;
};
