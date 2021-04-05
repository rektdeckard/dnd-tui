import React, { useCallback } from "react";
import { Box, Text, useFocus } from "ink";

import { useCharacter, useViewState } from "../../state";
import { getBorder } from "../../lib";
import CheckOrSave from "./CheckOrSave";

const SavingThrows: React.FC<{}> = () => {
  const character = useCharacter(useCallback((c) => c.character, []));
  const { isFocused } = useFocus();
  const { activeView } = useViewState();
  const isActiveView = activeView === "saves";

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={getBorder(isFocused, isActiveView)}
      paddingX={1}
    >
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
  );
};

export default SavingThrows;
