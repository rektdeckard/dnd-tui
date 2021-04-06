import { RollOrFixed } from "./dice";

export class Character implements ICharacter {
  playerName = "";
  name = "";
  sex: Sex = "Male";
  race: Race = "Dwarf";
  class: Class = "Barbarian";
  alignment: Alignment = "Neutral";
  level = 1;
  experience: number | "Milestone" | undefined = 0;
  proficiency = 2;
  inspiration = false;
  abilities: Abilities = {
    strength: { base: 10, proficient: false },
    dexterity: { base: 10, proficient: false },
    constitution: { base: 10, proficient: false },
    intelligence: { base: 10, proficient: false },
    wisdom: { base: 10, proficient: false },
    charisma: { base: 10, proficient: false },
  };
  skills: Skills = {
    acrobatics: { modifiers: 0, proficient: false },
    animalHandling: { modifiers: 0, proficient: false },
    arcana: { modifiers: 0, proficient: false },
    athletics: { modifiers: 0, proficient: false },
    deception: { modifiers: 0, proficient: false },
    history: { modifiers: 0, proficient: false },
    insight: { modifiers: 0, proficient: false },
    intimidation: { modifiers: 0, proficient: false },
    investigation: { modifiers: 0, proficient: false },
    medicine: { modifiers: 0, proficient: false },
    nature: { modifiers: 0, proficient: false },
    perception: { modifiers: 0, proficient: false },
    performance: { modifiers: 0, proficient: false },
    persuasion: { modifiers: 0, proficient: false },
    religion: { modifiers: 0, proficient: false },
    sleightOfHand: { modifiers: 0, proficient: false },
    stealth: { modifiers: 0, proficient: false },
    survival: { modifiers: 0, proficient: false },
  };
  otherProficienciesAndLanguages?: string;
  attacksAndSpells: Attacks = {
    basic: [],
  };

  constructor(charData?: ICharacter) {
    if (charData) {
      this.playerName = charData.playerName;
      this.name = charData.name;
      this.sex = charData.sex;
      this.race = charData.race;
      this.class = charData.class;
      this.alignment = charData.alignment;
      this.level = charData.level;
      this.experience = charData.experience;
      this.proficiency = charData.proficiency;
      this.inspiration = charData.inspiration;
      this.abilities = charData.abilities;
      this.skills = charData.skills;
      this.otherProficienciesAndLanguages =
        charData.otherProficienciesAndLanguages;
      this.attacksAndSpells = charData.attacksAndSpells;
    }
  }

  private abilityModifier(base: number): number {
    return Math.floor((base - 10) / 2);
  }

  private abilitySave(ability: AbilityAttributes) {
    const { base, proficient } = ability;
    return this.abilityModifier(base) + (proficient ? this.proficiency : 0);
  }

  private skillModifier(skill: SkillAttributes, abilityModifier: number) {
    const { modifiers, proficient } = skill;
    return abilityModifier + modifiers + (proficient ? this.proficiency : 0);
  }

  get str(): number {
    return this.abilityModifier(this.abilities.strength.base);
  }

  set str(n: number) {
    this.abilities.strength.base = n;
  }

  get dex(): number {
    return this.abilityModifier(this.abilities.dexterity.base);
  }

  set dex(n: number) {
    this.abilities.dexterity.base = n;
  }

  get con(): number {
    return this.abilityModifier(this.abilities.constitution.base);
  }

  set con(n: number) {
    this.abilities.constitution.base = n;
  }

  get int(): number {
    return this.abilityModifier(this.abilities.intelligence.base);
  }

  set int(n: number) {
    this.abilities.intelligence.base = n;
  }

  get wis(): number {
    return this.abilityModifier(this.abilities.wisdom.base);
  }

  set wis(n: number) {
    this.abilities.wisdom.base = n;
  }

  get cha(): number {
    return this.abilityModifier(this.abilities.charisma.base);
  }

  set cha(n: number) {
    this.abilities.charisma.base = n;
  }

  get strSave(): number {
    return this.abilitySave(this.abilities.strength);
  }

  get dexSave(): number {
    return this.abilitySave(this.abilities.dexterity);
  }

  get conSave(): number {
    return this.abilitySave(this.abilities.constitution);
  }

  get intSave(): number {
    return this.abilitySave(this.abilities.intelligence);
  }

  get wisSave(): number {
    return this.abilitySave(this.abilities.wisdom);
  }

  get chaSave(): number {
    return this.abilitySave(this.abilities.charisma);
  }

  get acrobatics(): number {
    return this.skillModifier(this.skills.acrobatics, this.dex);
  }

  get animalHandling(): number {
    return this.skillModifier(this.skills.animalHandling, this.wis);
  }

  get arcana(): number {
    return this.skillModifier(this.skills.arcana, this.int);
  }

  get athletics(): number {
    return this.skillModifier(this.skills.athletics, this.str);
  }

  get deception(): number {
    return this.skillModifier(this.skills.deception, this.cha);
  }

  get history(): number {
    return this.skillModifier(this.skills.history, this.int);
  }

  get insight(): number {
    return this.skillModifier(this.skills.insight, this.wis);
  }

  get intimidation(): number {
    return this.skillModifier(this.skills.intimidation, this.cha);
  }

  get investigation(): number {
    return this.skillModifier(this.skills.investigation, this.int);
  }

  get medicine(): number {
    return this.skillModifier(this.skills.medicine, this.wis);
  }

  get nature(): number {
    return this.skillModifier(this.skills.nature, this.int);
  }

  get perception(): number {
    return this.skillModifier(this.skills.perception, this.wis);
  }

  get performance(): number {
    return this.skillModifier(this.skills.performance, this.cha);
  }

  get persuasion(): number {
    return this.skillModifier(this.skills.persuasion, this.cha);
  }

  get religion(): number {
    return this.skillModifier(this.skills.religion, this.int);
  }

  get sleightOfHand(): number {
    return this.skillModifier(this.skills.sleightOfHand, this.dex);
  }

  get stealth(): number {
    return this.skillModifier(this.skills.stealth, this.dex);
  }

  get survival(): number {
    return this.skillModifier(this.skills.survival, this.wis);
  }

  get passiveWisdom(): number {
    return 10 + this.wis;
  }
}

export interface ICharacter {
  playerName: string;
  name: string;
  sex: Sex;
  race: Race;
  class: Class;
  alignment: Alignment;
  level: number;
  proficiency: number;
  inspiration: boolean;
  abilities: Abilities;
  skills: Skills;
  otherProficienciesAndLanguages?: string;
  attacksAndSpells: Attacks;
  experience?: number | "Milestone";
}

interface Attacks {
  basic: Attack[];
  additional?: AdditionalAction[];
}

interface Attack {
  name: string;
  proficient: boolean;
  roll: RollOrFixed;
  damageType?: DamageType;
  range?: [number, number];
}

interface AdditionalAction {
  name: string;
  text?: string;
}

type DamageType =
  | "Slashing"
  | "Piercing"
  | "Bludgeoning"
  | "Cold"
  | "Lightning"
  | "Fire"
  | "Acid"
  | "Thunger"
  | "Necrotic"
  | "Psychic"
  | "Radiant"
  | "Force"
  | "Magical";

type Sex = "Male" | "Female" | "Other";

type Race =
  | "Dwarf"
  | "Elf"
  | "Halfling"
  | "Human"
  | "Dragonborn"
  | "Gnome"
  | "Half-Elf"
  | "Half-Orc"
  | "Tiefling";

type Class =
  | "Barbarian"
  | "Bard"
  | "Cleric"
  | "Druid"
  | "Fighter"
  | "Monk"
  | "Paladin"
  | "Ranger"
  | "Rogue"
  | "Sorcerer"
  | "Warlock"
  | "Wizard";

export interface Abilities extends Record<Ability, AbilityAttributes> {}

export interface AbilityAttributes {
  base: number;
  proficient: boolean;
}

export type Ability =
  | "strength"
  | "dexterity"
  | "constitution"
  | "intelligence"
  | "wisdom"
  | "charisma";

interface Skills extends Record<Skill, SkillAttributes> {}

interface SkillAttributes {
  modifiers: number;
  proficient: boolean;
}

export type Skill =
  | "acrobatics"
  | "animalHandling"
  | "arcana"
  | "athletics"
  | "deception"
  | "history"
  | "insight"
  | "intimidation"
  | "investigation"
  | "medicine"
  | "nature"
  | "perception"
  | "performance"
  | "persuasion"
  | "religion"
  | "sleightOfHand"
  | "stealth"
  | "survival";

type Alignment =
  | "Lawful Good"
  | "Neutral Good"
  | "Chaotic Good"
  | "Lawful Neutral"
  | "Neutral"
  | "Chaotic Neutral"
  | "Lawful Evil"
  | "Neutral Evil"
  | "Chaotic Evil";
