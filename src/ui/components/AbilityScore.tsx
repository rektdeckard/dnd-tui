import React, { useState } from "react";
import { Box, Text, Newline, useFocus, useInput } from "ink";
import TextInput from "ink-text-input";

import { formatNumber, getBorder, StatModifier } from "../../lib";
import { CharacterSetterOrUpdater, useViewState } from "../../state";

interface AbilityScoreProps {
  stat: StatModifier;
  modifier: number;
  base: number;
  set: CharacterSetterOrUpdater;
}

const AbilityScore: React.FC<AbilityScoreProps> = ({
  stat,
  modifier,
  base,
  set,
}) => {
  const { isFocused } = useFocus();
  const { activeView, setActiveView } = useViewState();
  const [input, setInput] = useState<string>(base.toString());
  const isActiveView = activeView === stat;

  useInput(
    (_, key) => {
      if (key.return) {
        setActiveView(stat);
        return;
      }
    },
    { isActive: isFocused }
  );

  const handleSave = () => {
    const maybeNumber = parseInt(input);
    if (Number.isNaN(maybeNumber)) return;

    set((c) => {
      c[stat] = maybeNumber;
      return c;
    });
    setActiveView(null);
  };

  useInput(
    (_, key) => {
      if (key.escape) {
        setInput(base.toString());
        setActiveView(null);
        return;
      }
    },
    { isActive: isActiveView }
  );

  return (
    <Box
      borderStyle="round"
      flexDirection="column"
      alignItems="center"
      borderColor={getBorder(isFocused, isActiveView)}
    >
      <Text color="yellow">
        {formatNumber(modifier)}
        <Newline />
        {stat.toUpperCase()}
      </Text>
      {isActiveView ? (
        <TextInput value={input} onChange={setInput} onSubmit={handleSave} />
      ) : (
        <Text>{base}</Text>
      )}
    </Box>
  );
};

export default AbilityScore;
