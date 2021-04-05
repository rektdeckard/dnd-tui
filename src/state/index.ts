import create from "zustand";

import { Character, ICharacter, Roll, RollResult, performRoll } from "../lib";

const defaultCharData: ICharacter = {
  playerName: "Tobias Fried",
  name: "Roman Karesh",
  sex: "Male",
  race: "Human",
  class: "Monk",
  alignment: "Lawful Good",
  level: 6,
  proficiency: 3,
  inspiration: true,
  abilities: {
    strength: { base: 13, proficient: true },
    dexterity: { base: 19, proficient: true },
    constitution: { base: 14, proficient: false },
    intelligence: { base: 9, proficient: false },
    wisdom: { base: 18, proficient: false },
    charisma: { base: 10, proficient: false },
  },
  skills: {
    acrobatics: { modifiers: 0, proficient: true },
    animalHandling: { modifiers: 0, proficient: false },
    arcana: { modifiers: 0, proficient: false },
    athletics: { modifiers: 0, proficient: true },
    deception: { modifiers: 0, proficient: false },
    history: { modifiers: 0, proficient: false },
    insight: { modifiers: 3, proficient: true },
    intimidation: { modifiers: 0, proficient: false },
    investigation: { modifiers: 0, proficient: false },
    medicine: { modifiers: 0, proficient: true },
    nature: { modifiers: 0, proficient: false },
    perception: { modifiers: 0, proficient: false },
    performance: { modifiers: 0, proficient: false },
    persuasion: { modifiers: 0, proficient: false },
    religion: { modifiers: 0, proficient: false },
    sleightOfHand: { modifiers: 0, proficient: false },
    stealth: { modifiers: 0, proficient: true },
    survival: { modifiers: 0, proficient: false },
  },
  attacksAndSpells: {
    basic: [
      {
        name: "Yari",
        proficient: true,
        roll: { die: 6 },
        damageType: "Piercing",
      },
      {
        name: "Yari (r)",
        proficient: true,
        roll: { die: 6 },
        damageType: "Piercing",
        range: [20, 60],
      },
      {
        name: "Unarmed",
        proficient: true,
        roll: { die: 6 },
        damageType: "Bludgeoning",
      },
    ],
    additional: [
      {
        name: "Extra Attack",
        text: "2 Attack actions instead of 1 on your turn",
      },
      {
        name: "Flurry of Blows",
        text: "Add 2 unarmed strikes as bonus act (1 ki)",
      },

      {
        name: "Patient Defense",
        text: "Dodge action as bonus action (1 ki)",
      },
      {
        name: "Step of the Wind",
        text:
          "Disengage or Dash as bonus action. Jump distance is doubled (1 ki)",
      },
      {
        name: "Stunning Strike",
        text:
          "When you hit a creature, w/ melee attack, they must pass a CON save or be stunned until the end of your next turm (1 ki)",
      },
    ],
  },
};

export type CharacterSetterOrUpdater = (
  c: Character | ((c: Character) => Character)
) => void;

interface CharacterState {
  character: Character;
  setCharacter: CharacterSetterOrUpdater;
  [key: string]: any;
}

export const useCharacter = create<CharacterState>((set, get) => ({
  character: new Character(defaultCharData),
  setCharacter: (c: Character | ((c: Character) => Character)) => {
    if (typeof c === "function") {
      set({ ...get(), character: c(get().character) }, true);
    } else {
      set({ character: c });
    }
  },
}));

type ViewPane = null | "overview" | "saves" | "attacks" | keyof Character;

interface ViewState {
  activeView?: ViewPane;
  setActiveView: (view: ViewPane) => void;
  [key: string]: any;
}

export const useViewState = create<ViewState>((set) => ({
  activeView: null,
  setActiveView: (view: ViewPane) => set({ activeView: view }),
}));

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
