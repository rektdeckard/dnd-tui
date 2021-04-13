import create from "zustand";

import { Roll, RollResult, performRoll } from "../lib";
import { useCharacter } from ".";

interface RollState {
  rollResult?: RollResult[];
  rolling: boolean;
  performRolls: (...r: Roll[]) => Promise<void>;
  [key: string]: any;
}

export const useRollState = create<RollState>((set) => ({
  rolling: false,
  performRolls: async (...r) => {
    set({ rolling: true });
    const character = useCharacter.getState().character;
    const rollResult = r.map((roll) => {
      const diceResult = performRoll(roll);
      const numericModifier =
        roll.modifier === undefined
          ? 0
          : typeof roll.modifier === "number"
          ? roll.modifier
          : character[roll.modifier];
      return { ...diceResult, total: diceResult.total + numericModifier };
    });
    setTimeout(() => {
      set({ rollResult, rolling: false });
    }, 500);
  },
}));
