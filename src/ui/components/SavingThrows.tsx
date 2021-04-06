import React, { useCallback, useState } from "react";
import { Box, Text, useFocus, useInput } from "ink";

import { useCharacter, useViewState } from "../../state";
import { getBorder } from "../../lib";
import CheckOrSave from "./CheckOrSave";

const SavingThrows: React.FC<{}> = () => {
  const character = useCharacter(useCallback((c) => c.character, []));
  const { isFocused } = useFocus();
  const { activeView, setActiveView } = useViewState();
  const isActiveView = activeView === "saves";
  const [activeSubview, setActiveSubview] = useState<number>(0);

  useInput((_, key) => {
    if (key.return) {
      setActiveView("saves");
      return;
    }
    }, { isActive: isFocused && !isActiveView }
  );

  useInput((input, key) => {
    if (key.escape) {
      setActiveView(null);
      return;
    }
    if (key.downArrow) {
      setActiveSubview((s) => (s + 1) % 6);
      return;
    }
    if (key.upArrow) {
      setActiveSubview((s) => (s + 5) % 6);
      return
    }
    }, { isActive: isActiveView }
  );

  const saves = [
    { name: "Strength", proficient: character.abilities.strength.proficient, save: character.strSave },
    { name: "Dexterity", proficient: character.abilities.dexterity.proficient, save: character.dexSave },
    { name: "Constitution", proficient: character.abilities.constitution.proficient, save: character.conSave },
    { name: "Intelligence", proficient: character.abilities.intelligence.proficient, save: character.intSave },
    { name: "Wisdom", proficient: character.abilities.wisdom.proficient, save: character.wisSave },
    { name: "Charisma", proficient: character.abilities.charisma.proficient, save: character.chaSave },
  ];

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={getBorder(isFocused, isActiveView)}
      paddingX={1}
    >
      {saves.map((ability, i) => (
        <CheckOrSave key={ability.name} active={isActiveView && activeSubview === i} {...ability} />
      ))}
      <Box justifyContent="center" marginTop={1}>
        <Text dimColor>SAVING THROWS</Text>
      </Box>
    </Box>
  );
};

export default SavingThrows;
