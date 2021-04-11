import React, { useState, useEffect } from "react";
import { Box, Text, useFocus, useInput } from "ink";

import { useCharacter, useViewState } from "../../state";
import { Ability, Skill } from "../../lib";
import CheckOrSave from "./CheckOrSave";
import BorderBox from "./BorderBox";

type Save = {
  property: Ability | Skill;
  proficient: boolean;
  save: number;
};

const SavingThrows: React.FC<{}> = () => {
  const { character, setCharacter } = useCharacter();
  const { isFocused } = useFocus();
  const { activeView, setActiveView } = useViewState();
  const isActiveView = activeView === "saves";
  const [activeSubview, setActiveSubview] = useState<number>(0);
  const [seek, setSeek] = useState<string>("");

  useEffect(() => {
    if (!isFocused) setActiveView(null);
  }, [isFocused]);

  useInput(
    (input, key) => {
      if (key.return || input === " ") {
        setActiveView("saves");
        return;
      }
    },
    { isActive: isFocused && !isActiveView }
  );

  const saves: Save[] = [
    {
      property: "strength",
      proficient: character.abilities.strength.proficient,
      save: character.strSave,
    },
    {
      property: "dexterity",
      proficient: character.abilities.dexterity.proficient,
      save: character.dexSave,
    },
    {
      property: "constitution",
      proficient: character.abilities.constitution.proficient,
      save: character.conSave,
    },
    {
      property: "intelligence",
      proficient: character.abilities.intelligence.proficient,
      save: character.intSave,
    },
    {
      property: "wisdom",
      proficient: character.abilities.wisdom.proficient,
      save: character.wisSave,
    },
    {
      property: "charisma",
      proficient: character.abilities.charisma.proficient,
      save: character.chaSave,
    },
  ];

  const handleSeek = (input: string) => {
    const newSeek = seek + input;
    const matchingIndex = Object.keys(character.abilities).findIndex((s) =>
      s.startsWith(newSeek.toLowerCase())
    );
    if (matchingIndex >= 0) {
      setActiveSubview(matchingIndex);
      setSeek(newSeek);
    }
    setTimeout(() => setSeek(""), 2000);
  };

  useInput(
    (input, key) => {
      if (key.escape) {
        setActiveView(null);
        return;
      }
      if (key.downArrow) {
        setActiveSubview((s) => (s + 1) % saves.length);
        return;
      }
      if (key.upArrow) {
        setActiveSubview((s) => (s + (saves.length - 1)) % saves.length);
        return;
      }
      if (key.pageDown) {
        setActiveSubview(saves.length - 1);
        return;
      }
      if (key.pageUp) {
        setActiveSubview(0);
        return;
      }

      if (!(key.shift || key.ctrl)) handleSeek(input);
    },
    { isActive: isActiveView && isFocused }
  );

  return (
    <BorderBox flexDirection="column" focused={isFocused} active={isActiveView}>
      {saves.map((ability, i) => (
        <CheckOrSave
          key={ability.property}
          active={isFocused && isActiveView && activeSubview === i}
          set={setCharacter}
          {...ability}
        />
      ))}
      <Box justifyContent="center" marginTop={1}>
        <Text dimColor>SAVING THROWS</Text>
      </Box>
    </BorderBox>
  );
};

export default SavingThrows;
