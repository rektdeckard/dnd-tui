import React, { useState, useCallback } from "react";
import { Box, DOMElement, Spacer, Text, useFocus, useInput } from "ink";
import TextInput from "ink-text-input";

import { NumericProperty, formatNumber } from "../../lib";
import { useCharacter, useViewState, useRollState } from "../../state";
import BorderBox from "./BorderBox";

interface NumericFieldProps {
  property: NumericProperty;
  label?: string;
  mod?: boolean;
  rollable?: boolean;
}

const NumericField = React.forwardRef<
      DOMElement,
      React.ComponentPropsWithoutRef<typeof Box> &
      NumericFieldProps>(({
      property,
      label,
      mod = true,
      rollable = true,
      ...rest
    }, ref) => {
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

      if (!rollable) return;
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
    <BorderBox
      ref={ref}
      focused={isFocused}
      active={isActiveView}
      {...rest}
    >
      <Box minWidth={3} marginRight={1}>
        {isActiveView ? (
          <TextInput value={input} onChange={setInput} onSubmit={handleSave} />
        ) : (
          <Text>{mod ? formatNumber(propertyValue) : propertyValue}</Text>
        )}
      </Box>
      <Text>{label ?? property.replace(/^\w/, (c) => c.toUpperCase())}</Text>
      <Spacer />
    </BorderBox>
  );
});

export default NumericField;
