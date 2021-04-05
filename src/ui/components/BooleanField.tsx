import React, { useCallback } from "react";
import { Box, Text, useFocus, useInput } from "ink";

import { getBorder, Character, BooleanKeys } from "../../lib";
import { useCharacter } from "../../state";

type BooleanProperty = NonNullable<BooleanKeys<Character>>;

interface BooleanFieldProps {
  property: BooleanProperty;
}

const BooleanField: React.FC<BooleanFieldProps> = ({ property }) => {
  const { isFocused } = useFocus();
  const { propertyValue, setCharacter } = useCharacter(
    useCallback(
      (s) => ({
        propertyValue: s.character[property],
        setCharacter: s.setCharacter,
      }),
      []
    )
  );

  useInput(
    (input, key) => {
      if (key.return || input === " ") {
        setCharacter((c) => {
          c[property] = !propertyValue;
          return c;
        });
      }
    },
    { isActive: isFocused }
  );

  return (
    <Box
      borderStyle="round"
      borderColor={getBorder(isFocused, false)}
      paddingX={1}
    >
      <Box width={4} marginRight={1}>
        <Text>{propertyValue && "✱"}</Text>
      </Box>
      <Text>{property.replace(/^\w/, (c) => c.toUpperCase())}</Text>
    </Box>
  );
};

export default BooleanField;
