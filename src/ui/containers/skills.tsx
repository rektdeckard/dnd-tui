import React, { useCallback } from "react";
import { Box, Spacer, Text } from "ink";

import { useCharacter } from "../../state";
import AttacksLayout from "./attacks";
import BooleanField from "../components/BooleanField";
import NumericField from "../components/NumericField";
import SavingThrows from "../components/SavingThrows";
import Skills from "../components/Skills";
import BorderBox from "../components/BorderBox";
import HitPoints from "../components/HitPoints";

const SkillsLayout: React.FC<{}> = () => {
  const character = useCharacter(useCallback((c) => c.character, []));

  return (
    <Box>
      <Box flexDirection="column" width={24} marginX={1}>
        <Box>
          <NumericField
            property="armorClass"
            label="AC"
            mod={false}
            rollable={false}
            flexGrow={1}
            height={3}
          />
          <NumericField
            property="initiative"
            label="INIT"
            mod={false}
            flexGrow={1}
            height={3}
          />
        </Box>
        <Box>
          <NumericField
            property="speed"
            label="Speed"
            mod={false}
            rollable={false}
            flexGrow={1}
            height={3}
          />
        </Box>
        <HitPoints />
        <BooleanField property="inspiration" />
        <NumericField property="proficiency" />
        <SavingThrows />
        <BorderBox borderColor="gray">
          <Box width={3} marginRight={1}>
            <Text>{character.passiveWisdom}</Text>
          </Box>
          <Text>Passive Wisdom</Text>
        </BorderBox>
        <BorderBox flexDirection="column" borderColor="gray">
          <Text>{character.otherProficienciesAndLanguages ?? "(none)"}</Text>
          <Box justifyContent="center" marginTop={1}>
            <Text dimColor>OTHER PROF & LANGS</Text>
          </Box>
        </BorderBox>
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
