import React, { useCallback } from "react";
import { Box, Spacer, Text } from "ink";

import { useCharacter } from "../state";
import AttacksLayout from "./attacks";
import BooleanField from "./components/BooleanField";
import NumericField from "./components/NumericField";
import SavingThrows from "./components/SavingThrows";
import Skills from "./components/Skills";

const SkillsLayout: React.FC<{}> = () => {
  const character = useCharacter(useCallback((c) => c.character, []));

  return (
    <Box>
      <Box flexDirection="column" width={24} marginX={1}>
        <BooleanField property="inspiration" />
        <NumericField property="proficiency" />
        <SavingThrows />
        <Box borderStyle="single" paddingX={1}>
          <Box width={4} marginRight={1}>
            <Text>{character.passiveWisdom}</Text>
          </Box>
          <Text>Passive Wisdom</Text>
        </Box>
        <Box flexDirection="column" borderStyle="single" paddingX={1}>
          <Text>{character.otherProficienciesAndLanguages ?? "(none)"}</Text>
          <Box justifyContent="center" marginTop={1}>
            <Text dimColor>OTHER PROF & LANGS</Text>
          </Box>
        </Box>
      </Box>
      <Box flexDirection="column" width={28}>
        <Skills />
        <AttacksLayout />
        <Spacer />
      </Box>
    </Box>
  );
};

export default SkillsLayout;
