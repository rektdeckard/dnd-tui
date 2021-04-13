import React, { useState, useCallback, useEffect } from "react";
import { Text, useInput } from "ink";
import SelectInput from "ink-select-input";

import { useCharacter } from "../../state";
import { Class, getColor } from "../../lib";

interface ClassSelectorProps {
  active?: boolean;
  setSubviewEditing: (b: boolean) => void;
}

const classes: { label: string; value: Class }[] = [
  { label: "Barbarian", value: "Barbarian" },
  { label: "Bard", value: "Bard" },
  { label: "Cleric", value: "Cleric" },
  { label: "Druid", value: "Druid" },
  { label: "Fighter", value: "Fighter" },
  { label: "Monk", value: "Monk" },
  { label: "Paladin", value: "Paladin" },
  { label: "Ranger", value: "Ranger" },
  { label: "Rogue", value: "Rogue" },
  { label: "Sorcerer", value: "Sorcerer" },
  { label: "Warlock", value: "Warlock" },
  { label: "Wizard", value: "Wizard" },
];

const ClassSelector: React.FC<ClassSelectorProps> = ({
  active = false,
  setSubviewEditing,
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const { clazz, set } = useCharacter(
    useCallback(
      (s) => ({
        clazz: s.character.class,
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
      c.class = value;
      return c;
    });
    setEditing(false);
    setSubviewEditing(false);
  };

  if (active && editing)
    return <SelectInput items={classes} onSelect={handleSelect} />;
  return <Text color={getColor(active, false)}>{clazz}</Text>;
};

export default ClassSelector;
