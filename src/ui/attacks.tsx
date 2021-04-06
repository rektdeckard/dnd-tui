import React from "react";
import { Box, Text, useFocus, useInput } from "ink";

import { getColor, formatDie } from "../lib";
import { useCharacter, useViewState } from "../state";

const AttacksLayout: React.FC<{}> = () => {
  const attacks = useCharacter((s) => s.character.attacksAndSpells);
  const { activeView } = useViewState();
  const { isFocused } = useFocus();
  const isActiveView = activeView === "attacks";

  useInput((input, key) => {}, {
    isActive: isFocused && isActiveView,
  });

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      paddingX={1}
      borderColor={getColor(isFocused, isActiveView)}
    >
      {attacks.basic.length ? (
        attacks.basic.map(
          ({ name, roll, damageType, range, proficient }, i) => (
            <Box key={`${name}-${i}`} height={1}>
              <Box flexGrow={1}>
                <Text wrap="truncate">{name}</Text>
              </Box>
              <Box width={4}>
                <Text>+7</Text>
              </Box>
              <Box width={8}>
                <Text wrap="truncate">
                  {formatDie(roll)} {damageType}
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
          {attacks.additional.map(({ name, text }, i) => (
            <Box key={`${name}-${i}`}>
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
