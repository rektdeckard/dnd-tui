import React, { useState, useEffect } from "react";
import { Box, Text, useFocus, useInput } from "ink";

import { formatExperience, getColor } from "../../lib";
import { useCharacter, useViewState } from "../../state";
import SimpleStringField from "../components/SimpleStringField";
import ClassSelector from "../components/ClassSelector";
import RaceSelector from "../components/RaceSelector";
import SimpleNumericField from "../components/SimpleNumericField";
import AlignmentSelector from "../components/AlignmentSelector";

const OverviewLayout: React.FC<{}> = () => {
  const character = useCharacter((s) => s.character);
  const { activeView, setActiveView } = useViewState();
  const { isFocused } = useFocus();
  const isActiveView = activeView === "overview";
  const [activeSubview, setActiveSubview] = useState<number>(0);
  const [subviewIsEditing, setSubviewEditing] = useState<boolean>(false);

  const currentlyActive = isFocused && isActiveView;

  useEffect(() => {
    if (!isFocused) setActiveView(null);
  }, [isFocused]);

  useInput(
    (input, key) => {
      if (key.return || input === " ") {
        setActiveView("overview");
        return;
      }
    },
    { isActive: isFocused && !isActiveView }
  );

  useInput(
    (_, key) => {
      if (key.escape) {
        setActiveView(null);
        return;
      }
      if (key.downArrow || key.rightArrow) {
        setActiveSubview((s) => (s + 1) % 8);
        return;
      }
      if (key.upArrow || key.leftArrow) {
        setActiveSubview((s) => (s + (8 - 1)) % 8);
        return;
      }
      if (key.pageDown) {
        setActiveSubview(8 - 1);
        return;
      }
      if (key.pageUp) {
        setActiveSubview(0);
        return;
      }
    },
    { isActive: currentlyActive && !subviewIsEditing }
  );

  return (
    <Box
      borderStyle="single"
      borderColor={getColor(isFocused, activeView === "overview")}
      paddingX={3}
      paddingY={1}
    >
      <SimpleStringField
        property="name"
        placeholder="Character McFace"
        active={currentlyActive && activeSubview === 0}
      />
      <Box marginLeft={4}>
        <Box flexDirection="column" marginRight={4}>
          <Box>
            <Text
              dimColor
              underline={
                currentlyActive && (activeSubview === 1 || activeSubview === 2)
              }
            >
              CLASS & LEVEL:
            </Text>
            <Box marginX={1}>
              <ClassSelector
                active={currentlyActive && activeSubview === 1}
                setSubviewEditing={setSubviewEditing}
              />
            </Box>
            <SimpleNumericField
              property="level"
              active={currentlyActive && activeSubview === 2}
            />
          </Box>
          <Box>
            <Text dimColor underline={currentlyActive && activeSubview === 5}>
              RACE:
            </Text>
            <Box marginLeft={1}>
              <RaceSelector
                active={currentlyActive && activeSubview === 5}
                setSubviewEditing={setSubviewEditing}
              />
            </Box>
          </Box>
        </Box>
        <Box flexDirection="column" marginRight={4}>
          <Box>
            <Text dimColor underline={currentlyActive && activeSubview === 3}>
              BACKGROUND:
            </Text>
            <Box marginLeft={1}>
              <SimpleStringField
                property="background"
                active={currentlyActive && activeSubview === 3}
              />
            </Box>
          </Box>
          <Box>
            <Text dimColor underline={currentlyActive && activeSubview === 6}>
              ALIGNMENT:
            </Text>
            <Box marginLeft={1}>
              <AlignmentSelector
                active={currentlyActive && activeSubview === 6}
                setSubviewEditing={setSubviewEditing}
              />
            </Box>
          </Box>
        </Box>
        <Box flexDirection="column" marginRight={4}>
          <Box>
            <Text dimColor underline={currentlyActive && activeSubview === 4}>
              PLAYER NAME:
            </Text>
            <Box marginLeft={1}>
              <SimpleStringField
                property="playerName"
                active={currentlyActive && activeSubview === 4}
              />
            </Box>
          </Box>
          <Box>
            <Text dimColor underline={currentlyActive && activeSubview === 7}>
              EXPERIENCE:
            </Text>
            <Box marginLeft={1}>
              <Text>{formatExperience(character.experience)}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OverviewLayout;
