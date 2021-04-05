import { RollOrFixed } from "./dice";

export type ValueOf<T> = T[keyof T];

export const formatNumber = (n: number) => (n >= 0 ? `+${n}` : n);

export const formatName = (name: string) =>
	name
		.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g)
		?.join(" ")
		.replace(
			/\w\S*/g,
			(t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()
		) ?? name;

export const formatRoll = (r: RollOrFixed): string | number => {
	if (typeof r === "number") return r;
	return `${r.count ?? 1}d${r.die}${
		r.modifier && typeof r.modifier === "number" ? `+${r.modifier}` : ""
	}`;
};

export const getBorder = (
	isFocused: boolean,
	isActive: boolean
): string | undefined => {
	if (isActive && isFocused) return "cyan";
	if (isFocused) return "yellow";
	return undefined;
};
