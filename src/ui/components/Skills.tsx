import React, { useCallback } from "react";
import { Box, Text, useFocus, useInput } from "ink";

import { useCharacter, useViewState } from "../../state";
import { formatName, getBorder } from "../../lib";
import CheckOrSave from "./CheckOrSave";

const Skills: React.FC<{}> = () => {
  const character = useCharacter(useCallback((c) => c.character, []));
  const { activeView } = useViewState();
  const { isFocused } = useFocus();
  const isActiveView = activeView === "skills";

  useInput((input, key) => {}, {
    isActive: isFocused && isActiveView,
  });

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={getBorder(isFocused, isActiveView)}
      paddingX={1}
    >
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
  );
};

export default Skills;
