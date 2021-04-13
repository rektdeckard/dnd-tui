import create from "zustand";

import { Character, ICharacter } from "../lib";

const defaultCharData: ICharacter = {
  playerName: "Tobias Fried",
  name: "Roman Karesh",
  sex: "Male",
  race: "Human",
  class: "Monk",
  alignment: "Lawful Good",
  background: "Hermit",
  level: 6,
  proficiency: 3,
  inspiration: true,
  experience: "Milestone",
  armorClass: 18,
  speed: 45,
  hitPoints: {
    maximum: 51,
    current: 51,
    temporary: 0,
  },
  hitDice: {
    roll: { count: 6, die: 8 },
    current: 6,
  },
  deathSaves: {
    successes: 0,
    failures: 0,
  },
  equipment: {
    money: {
      cp: 0,
      sp: 1,
      ep: 0,
      gp: 142,
      pp: 0,
    },
    items: [
      { name: "Calligrapher case" },
      { name: "Scroll case" },
      { name: "Winter blanket" },
      { name: "Herbalism kit" },
      { name: "Explorer's pack" },
      { name: "Darts", count: 9 },
      { name: "Sending stone" },
      { name: "Ball bearings", count: 2000 },
      {
        name: "Belt of Meditation",
        description:
          "Once per long rest, you may use a standard action to regain 1 Ki point.",
      },
      { name: "Necklace of Fireball", count: 3 },
      { name: "Large emerald", count: 1 },
    ],
  },
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

void defaultCharData;

export type CharacterSetterOrUpdater = (
  c: Character | ((c: Character) => Character),
  shouldDirty?: boolean
) => void;

interface CharacterState {
  character: Character;
  isDirty: boolean;
  setCharacter: CharacterSetterOrUpdater;
  [key: string]: any;
}

export const useCharacter = create<CharacterState>((set, get) => ({
  character: new Character(),
  isDirty: false,
  setCharacter: (
    c: Character | ((c: Character) => Character),
    shouldDirty = true
  ) => {
    if (typeof c === "function") {
      set({ character: c(get().character), isDirty: shouldDirty });
    } else {
      set({ character: c, isDirty: shouldDirty });
    }
  },
}));
