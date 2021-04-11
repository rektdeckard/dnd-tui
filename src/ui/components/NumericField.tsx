import React, { useState, useCallback } from "react";
import { Box, Text, useFocus, useInput } from "ink";
import TextInput from "ink-text-input";

import { Character, NumericKeys, Mutable, formatNumber } from "../../lib";
import { useCharacter, useViewState, useRollState } from "../../state";
import BorderBox from "./BorderBox";

type NumericProperty = NonNullable<NumericKeys<Mutable<Character>>>;

interface BooleanFieldProps {
  property: NumericProperty;
}

const NumericField: React.FC<BooleanFieldProps> = ({ property }) => {
  const { isFocused } = useFocus();
  const { activeView, setActiveView } = useViewState();
  const performRolls = useRollState(useCallback((s) => s.performRolls, []));
  const isActiveView = activeView === property;
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

  useInput(
    (input, key) => {
      if (key.ctrl && input === "e") {
        setActiveView(property);
        return;
      }
      if (key.return || input === " ") {
        performRolls({
          die: 20,
          count: 1,
          modifier: propertyValue,
          advantage: key.shift,
          disadvantage: key.ctrl,
        });
      }
      if ((input === "r" || input === "R") && (key.ctrl || key.shift)) {
        performRolls({
          die: 20,
          count: 1,
          modifier: propertyValue,
          advantage: key.shift,
          disadvantage: key.ctrl,
        });
        return;
      }
    },
    { isActive: isFocused && !isActiveView }
  );

  const handleSave = () => {
    const maybeNumber = parseInt(input);
    if (Number.isNaN(maybeNumber)) return;

    setCharacter((c) => {
      c[property] = maybeNumber;
      return c;
    });
    setActiveView(null);
  };

  useInput(
    (_, key) => {
      if (key.escape) {
        setInput(propertyValue.toString());
        setActiveView(null);
        return;
      }
    },
    { isActive: isActiveView }
  );

  return (
    <BorderBox focused={isFocused} active={isActiveView}>
      <Box width={4} marginRight={1}>
        {isActiveView ? (
          <TextInput value={input} onChange={setInput} onSubmit={handleSave} />
        ) : (
          <Text>{formatNumber(propertyValue)}</Text>
        )}
      </Box>
      <Text>{property.replace(/^\w/, (c) => c.toUpperCase())}</Text>
    </BorderBox>
  );
};

export default NumericField;
