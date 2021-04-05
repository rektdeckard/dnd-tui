import React, { useState, useCallback } from "react";
import { Box, Text, useFocus, useInput } from "ink";
import TextInput from "ink-text-input";

import {
  getBorder,
  Character,
  NumericKeys,
  Mutable,
  formatNumber,
} from "../../lib";
import { useCharacter, useViewState } from "../../state";

type NumericProperty = NonNullable<NumericKeys<Mutable<Character>>>;

interface BooleanFieldProps {
  property: NumericProperty;
}

const NumericField: React.FC<BooleanFieldProps> = ({ property }) => {
  const { isFocused } = useFocus();
  const { activeView, setActiveView } = useViewState();
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
    (_, key) => {
      if (key.return) {
        setActiveView(property);
        return;
      }
    },
    { isActive: isFocused }
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
    <Box
      borderStyle="round"
      borderColor={getBorder(isFocused, isActiveView)}
      paddingX={1}
    >
      <Box width={4} marginRight={1}>
        {isActiveView ? (
          <TextInput value={input} onChange={setInput} onSubmit={handleSave} />
        ) : (
          <Text>{formatNumber(propertyValue)}</Text>
        )}
      </Box>
      <Text>{property.replace(/^\w/, (c) => c.toUpperCase())}</Text>
    </Box>
  );
};

export default NumericField;
