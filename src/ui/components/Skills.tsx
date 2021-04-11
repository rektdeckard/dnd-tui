import React, { useState, useEffect } from "react";
import { Box, Text, useFocus, useInput } from "ink";

import { useCharacter, useViewState } from "../../state";
import { Skill } from "../../lib";
import CheckOrSave from "./CheckOrSave";
import BorderBox from "./BorderBox";

const Skills: React.FC<{}> = () => {
  const { character, setCharacter } = useCharacter();
  const { activeView, setActiveView } = useViewState();
  const { isFocused } = useFocus();
  const isActiveView = activeView === "skills";
  const [activeSubview, setActiveSubview] = useState<number>(0);
  const [seek, setSeek] = useState<string>("");

  useEffect(() => {
    if (!isFocused) setActiveView(null);
  }, [isFocused]);

  const entryCount = Object.keys(character.skills).length;

  useInput(
    (input, key) => {
      if (key.return || input === " ") {
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

      if (!(key.shift || key.ctrl)) handleSeek(input);
    },
    { isActive: isActiveView && isFocused }
  );

  return (
    <BorderBox flexDirection="column" focused={isFocused} active={isActiveView}>
      {Object.entries(character.skills).map(([skill, { proficient }], i) => (
        <CheckOrSave
          key={skill}
          property={skill as Skill}
          proficient={proficient}
          save={character[skill]}
          active={isFocused && isActiveView && activeSubview === i}
          set={setCharacter}
        />
      ))}
      <Box justifyContent="center" marginTop={1}>
        <Text dimColor>SKILLS</Text>
      </Box>
    </BorderBox>
  );
};

export default Skills;
