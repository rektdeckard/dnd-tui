import React, { useState, useCallback } from "react";
import { Text, useInput } from "ink";
import TextInput from "ink-text-input";

import { useCharacter } from "../../state";
import { getColor } from "../../lib";

interface StringFieldProps {
  property: "name" | "playerName" | "background";
  placeholder?: string;
  active?: boolean;
}

const SimpleStringField: React.FC<StringFieldProps> = ({
  property,
  placeholder = "(none)",
  active = false,
}) => {
  const { propertyValue, setCharacter } = useCharacter(
    useCallback(
      (s) => ({
        propertyValue: s.character[property],
        setCharacter: s.setCharacter,
      }),
      []
    )
  );
  const [input, setInput] = useState<string>(propertyValue.toString());
  const [editing, setEditing] = useState<boolean>(false);

  useInput(
    (input, key) => {
      if (key.ctrl && input === "e") {
        setEditing(true);
        return;
      }
    },
    { isActive: active }
  );

  const handleSave = () => {
    setCharacter((c) => {
      c[property] = input;
      return c;
    });
    setEditing(false);
  };

  useInput(
    (_, key) => {
      if (key.escape) {
        setInput(propertyValue.toString());
        setEditing(false);
        return;
      }
    },
    { isActive: active && editing }
  );

  if (active && editing)
    return (
      <TextInput value={input} onChange={setInput} onSubmit={handleSave} />
    );
  return (
    <Text color={getColor(active, false)}>{propertyValue || placeholder}</Text>
  );
};

export default SimpleStringField;
