export type StatModifier = "str" | "dex" | "con" | "int" | "wis" | "cha";

export interface Roll {
	die: number;
	count?: number;
	modifier?: number | StatModifier;
}

export type RollOrFixed = Roll | number;
