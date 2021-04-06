import React, { useState } from "react";
import { Box, Text, useFocus, useInput } from "ink";

import { useCharacter, useViewState } from "../../state";
import { getColor, Skill } from "../../lib";
import CheckOrSave from "./CheckOrSave";

const Skills: React.FC<{}> = () => {
  const { character, setCharacter } = useCharacter();
  const { activeView, setActiveView } = useViewState();
  const { isFocused } = useFocus();
  const isActiveView = activeView === "skills";
  const [activeSubview, setActiveSubview] = useState<number>(0);
  const [seek, setSeek] = useState<string>("");

  const entryCount = Object.keys(character.skills).length;

  useInput(
    (_, key) => {
      if (key.return) {
        setActiveView("skills");
        return;
      }
    },
    { isActive: isFocused && !isActiveView }
  );

  const handleSeek = (input: string) => {
    const newSeek = seek + input;
    const matchingIndex = Object.keys(character.skills).findIndex((s) =>
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
        setActiveSubview((s) => (s + 1) % entryCount);
        return;
      }
      if (key.upArrow) {
        setActiveSubview((s) => (s + (entryCount - 1)) % entryCount);
        return;
      }
      if (key.pageDown) {
        setActiveSubview(entryCount - 1);
        return;
      }
      if (key.pageUp) {
        setActiveSubview(0);
        return;
      }

      handleSeek(input);
    },
    { isActive: isActiveView }
  );

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={getColor(isFocused, isActiveView)}
      paddingX={1}
    >
      {Object.entries(character.skills).map(([skill, { proficient }], i) => (
        <CheckOrSave
          key={skill}
          property={skill as Skill}
          proficient={proficient}
          save={character[skill]}
          active={isActiveView && activeSubview === i}
          set={setCharacter}
        />
      ))}
      <Box justifyContent="center" marginTop={1}>
        <Text dimColor>SKILLS</Text>
      </Box>
    </Box>
  );
};

export default Skills;
