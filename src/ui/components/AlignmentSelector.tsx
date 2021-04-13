import React, { useState, useCallback, useEffect } from "react";
import { Text, useInput } from "ink";
import SelectInput from "ink-select-input";

import { useCharacter } from "../../state";
import { Alignment, getColor } from "../../lib";

interface AlignmentSelectorProps {
  active?: boolean;
  setSubviewEditing: (b: boolean) => void;
}

const alignments: { label: string; value: Alignment }[] = [
  { label: "Lawful Good", value: "Lawful Good" },
  { label: "Neutral Good", value: "Neutral Good" },
  { label: "Chaotic Good", value: "Chaotic Good" },
  { label: "Lawful Neutral", value: "Lawful Neutral" },
  { label: "Neutral", value: "Neutral" },
  { label: "Chaotic Neutral", value: "Chaotic Neutral" },
  { label: "Lawful Evil", value: "Lawful Evil" },
  { label: "Neutral Evil", value: "Neutral Evil" },
  { label: "Chaotic Evil", value: "Chaotic Evil" },
];

const AlignmentSelector: React.FC<AlignmentSelectorProps> = ({
  active = false,
  setSubviewEditing,
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const { alignment, set } = useCharacter(
    useCallback(
      (s) => ({
        alignment: s.character.alignment,
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
      c.alignment = value;
      return c;
    });
    setEditing(false);
    setSubviewEditing(false);
  };

  if (active && editing)
    return <SelectInput items={alignments} onSelect={handleSelect} />;
  return <Text color={getColor(active, false)}>{alignment}</Text>;
};

export default AlignmentSelector;
