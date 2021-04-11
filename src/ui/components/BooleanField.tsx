import React, { useCallback } from "react";
import { Box, Text, useFocus, useInput } from "ink";

import { Character, BooleanKeys, formatName } from "../../lib";
import { useCharacter } from "../../state";
import BorderBox from "./BorderBox";

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
      if (key.ctrl && input === "e") {
        setCharacter((c) => {
          c[property] = !propertyValue;
          return c;
        });
      }
    },
    { isActive: isFocused }
  );

  return (
    <BorderBox focused={isFocused}>
      <Box width={4} marginRight={1}>
        <Text>{propertyValue && "*"}</Text>
      </Box>
      <Text>{formatName(property)}</Text>
    </BorderBox>
  );
};

export default BooleanField;
