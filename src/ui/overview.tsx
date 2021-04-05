import React from "react";
import { Box, Text, useFocus, useInput } from "ink";

import { getBorder } from "../lib";
import { useCharacter, useViewState } from "../state";

const Overview: React.FC<{}> = () => {
  const character = useCharacter((s) => s.character);
  const { activeView } = useViewState();
  const { isFocused } = useFocus();

  useInput((input, key) => {}, {
    isActive: isFocused && activeView === "overview",
  });

  return (
    <Box
      borderStyle="round"
      borderColor={getBorder(isFocused, activeView === "overview")}
      padding={1}
    >
      <Text color="yellow">{character.name}</Text>
      <Box marginLeft={4}>
        <Box flexDirection="column" marginRight={4}>
          <Box>
            <Text dimColor>CLASS & LEVEL: </Text>
            <Text>
              {character.class} {character.level}
            </Text>
          </Box>
          <Box>
            <Text dimColor>RACE: </Text>
            <Text>{character.race}</Text>
          </Box>
        </Box>
        <Box flexDirection="column" marginRight={4}>
          <Box>
            <Text dimColor>BACKGROUND: </Text>
            <Text>Hermit</Text>
          </Box>
          <Box>
            <Text dimColor>ALIGNMENT: </Text>
            <Text>{character.alignment}</Text>
          </Box>
        </Box>
        <Box flexDirection="column" marginRight={4}>
          <Box>
            <Text dimColor>PLAYER NAME: </Text>
            <Text>{character.playerName}</Text>
          </Box>
          <Box>
            <Text dimColor>EXPERIENCE: </Text>
            <Text>Milesone</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Overview;
