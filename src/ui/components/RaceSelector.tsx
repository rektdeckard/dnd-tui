import React, { useState, useCallback, useEffect } from "react";
import { Text, useInput } from "ink";
import SelectInput from "ink-select-input";

import { useCharacter } from "../../state";
import { Race, getColor } from "../../lib";

interface RaceSelectorProps {
  active?: boolean;
  setSubviewEditing: (b: boolean) => void;
}

const races: { label: string; value: Race }[] = [
  { label: "Dwarf", value: "Dwarf" },
  { label: "Elf", value: "Elf" },
  { label: "Halfling", value: "Halfling" },
  { label: "Human", value: "Human" },
  { label: "Dragonborn", value: "Dragonborn" },
  { label: "Gnome", value: "Gnome" },
  { label: "Half-Elf", value: "Half-Elf" },
  { label: "Half-Orc", value: "Half-Orc" },
  { label: "Tiefling", value: "Tiefling" },
];

const RaceSelector: React.FC<RaceSelectorProps> = ({
  active = false,
  setSubviewEditing,
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const { race, set } = useCharacter(
    useCallback(
      (s) => ({
        race: s.character.race,
        set: s.setCharacter,
      }),
      []
    )
  );

  useEffect(() => {
    if (!active) {
      setEditing(false);
      setSubviewEditing(false);
    }
  }, [active]);

  useInput(
    (input, key) => {
      if (key.ctrl && input === "e") {
        setEditing(true);
        setSubviewEditing(true);
      }
    },
    { isActive: active }
  );

  const handleSelect = ({ value }) => {
    set((c) => {
      c.race = value;
      return c;
    });
    setEditing(false);
    setSubviewEditing(false);
  };

  if (active && editing)
    return <SelectInput items={races} onSelect={handleSelect} />;
  return <Text color={getColor(active, false)}>{race}</Text>;
};

export default RaceSelector;
