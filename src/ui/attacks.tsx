import React from "react";
import { Box, Text, useFocus, useInput } from "ink";

import { getBorder, formatRoll } from "../lib";
import { useCharacter, useViewState } from "../state";

const AttacksLayout: React.FC<{}> = () => {
  const attacks = useCharacter((s) => s.character.attacksAndSpells);
  const { activeView } = useViewState();
  const { isFocused } = useFocus();

  useInput((input, key) => {}, {
    isActive: isFocused && activeView === "attacks",
  });

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      paddingX={1}
      borderColor={getBorder(isFocused, activeView === "attacks")}
    >
      {attacks.basic.length ? (
        attacks.basic.map(
          ({ name, roll, damageType, range, proficient }, i) => (
            <Box key={i} height={1}>
              <Box flexGrow={1}>
                <Text wrap="truncate">{name}</Text>
              </Box>
              <Box width={4}>
                <Text>+7</Text>
              </Box>
              <Box width={8}>
                <Text wrap="truncate">
                  {formatRoll(roll)} {damageType}
                </Text>
              </Box>
            </Box>
          )
        )
      ) : (
        <Text>(none)</Text>
      )}
      {attacks.additional?.length && (
        <Box flexDirection="column" height={12} marginTop={1}>
          {attacks.additional.map(({ name, text }) => (
            <Box>
              <Text wrap="end">{name}</Text>
            </Box>
          ))}
        </Box>
      )}
      <Box justifyContent="center" marginTop={1}>
        <Text dimColor>ATTACKS & SPELLS</Text>
      </Box>
    </Box>
  );
};

export default AttacksLayout;
