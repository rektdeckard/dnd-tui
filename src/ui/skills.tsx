import React from "react";
import { Box, Spacer, Text } from "ink";

import { useCharacter } from "../state";
import { formatNumber, formatName } from "../lib";
import AttacksLayout from "./attacks";

const CheckOrSave: React.FC<{
  name: string;
  proficient: boolean;
  save: number;
}> = ({ name, proficient, save }) => (
  <Box alignItems="center">
    <Text>{proficient ? "✱ " : "  "}</Text>
    <Box width={3} marginRight={1}>
      <Text>{formatNumber(save)}</Text>
    </Box>
    <Text>{name}</Text>
  </Box>
);

const SkillsLayout: React.FC<{}> = () => {
  const { character } = useCharacter();

  return (
    <Box>
      <Box flexDirection="column" width={24} marginX={1}>
        <Box borderStyle="round" paddingX={1}>
          <Box width={4} marginRight={1}>
            <Text>✱</Text>
          </Box>
          <Text>Inspiration</Text>
        </Box>
        <Box borderStyle="round" paddingX={1}>
          <Box width={4} marginRight={1}>
            <Text>{formatNumber(character.proficiency)}</Text>
          </Box>
          <Text>Proficiency</Text>
        </Box>
        <Box flexDirection="column" borderStyle="round" paddingX={1}>
          <CheckOrSave
            name="Strength"
            proficient={character.abilities.strength.proficient}
            save={character.strSave}
          />
          <CheckOrSave
            name="Dexterity"
            proficient={character.abilities.dexterity.proficient}
            save={character.dexSave}
          />
          <CheckOrSave
            name="Constitution"
            proficient={character.abilities.constitution.proficient}
            save={character.conSave}
          />
          <CheckOrSave
            name="Intelligence"
            proficient={character.abilities.intelligence.proficient}
            save={character.intSave}
          />
          <CheckOrSave
            name="Wisdom"
            proficient={character.abilities.wisdom.proficient}
            save={character.wisSave}
          />
          <CheckOrSave
            name="Charisma"
            proficient={character.abilities.charisma.proficient}
            save={character.chaSave}
          />
          <Box justifyContent="center" marginTop={1}>
            <Text dimColor>SAVING THROWS</Text>
          </Box>
        </Box>
        <Box borderStyle="round" paddingX={1}>
          <Box width={4} marginRight={1}>
            <Text>{character.passiveWisdom}</Text>
          </Box>
          <Text>Passive Wisdom</Text>
        </Box>
        <Box flexDirection="column" borderStyle="round" paddingX={1}>
          <Text>{character.otherProficienciesAndLanguages ?? "(none)"}</Text>
          <Box justifyContent="center" marginTop={1}>
            <Text dimColor>OTHER PROF & LANGS</Text>
          </Box>
        </Box>
      </Box>
      <Box flexDirection="column" width={28}>
        <Box flexDirection="column" borderStyle="round" paddingX={1}>
          {Object.entries(character.skills).map(([skill, { proficient }]) => (
            <CheckOrSave
              key={skill}
              name={formatName(skill)}
              proficient={proficient}
              save={character[skill]}
            />
          ))}
          <Box justifyContent="center" marginTop={1}>
            <Text dimColor>SKILLS</Text>
          </Box>
        </Box>
        <AttacksLayout />
        <Spacer />
      </Box>
    </Box>
  );
};

export default SkillsLayout;
