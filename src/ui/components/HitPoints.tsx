import React, { useCallback, useEffect, useState } from "react";
import { Box, Spacer, Text, useFocus, useInput } from "ink";
import TextInput from "ink-text-input";

import { useCharacter, useViewState } from "../../state";
import { getHealthColor } from "../../lib";
import BorderBox from "./BorderBox";

const HP = ["current", "maximum", "temporary"] as const;

const HitPoints: React.FC<{}> = () => {
  const { isFocused } = useFocus();
  const { activeView, setActiveView } = useViewState();
  const { hitPoints, setCharacter } = useCharacter(useCallback(
    (s) => ({
      hitPoints: s.character.hitPoints,
      setCharacter: s.setCharacter,
    }),
    []));
  const isActiveView = activeView === "hitPoints";
  const [activeSubview, setActiveSubview] = useState<typeof HP[number]>(HP[0]);
  const [editingSubview, setEditingSubview] = useState<typeof HP[number] | null>(null);
  const [input, setInput] = useState<string>("");

  const healthColor = getHealthColor(hitPoints.current, hitPoints.maximum);

  useEffect(() => {
    if (!isFocused) {
      setActiveView(null);
      setEditingSubview(null);
      setInput("");
    }
  }, [isFocused]);

  const handleEdit = () => {
    if (!activeSubview) return;

    const maybeNumber = parseInt(input);
    if (Number.isNaN(maybeNumber)) return;

    setCharacter((c) => {
      c.hitPoints[activeSubview] = maybeNumber;
      return c;
    });
    setEditingSubview(null);
  }

  useInput((input, key) => {
    if (key.return || input === " ") {
      setActiveView("hitPoints");
      return;
    }
  }, { isActive: isFocused && !isActiveView });

  useInput((input, key) => {
    if (key.ctrl && input === "e") {
      setInput(hitPoints[activeSubview].toString());
      setEditingSubview(activeSubview);
      return;
    }
    if (key.downArrow || key.rightArrow) {
      setActiveSubview((a) => HP[(HP.indexOf(a) + 1) % HP.length]);
      return;
    }
    if (key.upArrow || key.leftArrow) {
      setActiveSubview((a) => HP[(HP.indexOf(a) + HP.length - 1) % HP.length]);
      return;
    }
  }, { isActive: isFocused && isActiveView });

  return (
    <BorderBox
      focused={isFocused}
      active={isFocused && isActiveView}
    >
      <Box>
        <Text>HP  </Text>
        {editingSubview === "current"
          ? <TextInput value={input} onChange={setInput} onSubmit={handleEdit} />
          : <Text color={!isActiveView ? healthColor : activeSubview === "current" ? "yellow" : undefined}>{hitPoints.current}</Text>
        }
        <Text> / </Text>
        {editingSubview === "maximum"
          ? <TextInput value={input} onChange={setInput} onSubmit={handleEdit} />
          : <Text color={!isActiveView ? healthColor : activeSubview === "maximum" ? "yellow" : undefined}>{hitPoints.maximum}</Text>
        }
      </Box>
      <Spacer />
      <Box>
        <Text>TEMP </Text>
        {editingSubview === "temporary"
          ? <TextInput value={input} onChange={setInput} onSubmit={handleEdit} />
          : <Text color={isActiveView && activeSubview === "temporary" ? "yellow" : undefined}>{hitPoints.temporary}</Text>
        }
      </Box>
    </BorderBox>
  );
};

export default HitPoints;

