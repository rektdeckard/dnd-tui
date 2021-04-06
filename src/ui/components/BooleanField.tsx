import React, { useCallback } from "react";
import { Box, Text, useFocus, useInput } from "ink";

import { getColor, Character, BooleanKeys, formatName } from "../../lib";
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
    (input) => {
      if (input === "e") {
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
      borderColor={getColor(isFocused, false)}
      paddingX={1}
    >
      <Box width={4} marginRight={1}>
        <Text>{propertyValue && "*"}</Text>
      </Box>
      <Text>{formatName(property)}</Text>
    </Box>
  );
};

export default BooleanField;
