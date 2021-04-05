import React, { useState, useCallback } from "react";
import { Box, Text, Newline, useFocus, useInput } from "ink";
import TextInput from "ink-text-input";

import { formatNumber, getBorder, StatModifier } from "../../lib";
import {
  CharacterSetterOrUpdater,
  useViewState,
  useRollState,
} from "../../state";

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
  const performRolls = useRollState(useCallback((s) => s.performRolls, []));
  const isActiveView = activeView === stat;

  useInput(
    (input, key) => {
      if (input === " ") {
        performRolls({ die: 20, count: 1, modifier: stat });
        return;
      }
      if (key.return) {
        setActiveView(stat);
        return;
      }
    },
    { isActive: isFocused && !isActiveView }
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
