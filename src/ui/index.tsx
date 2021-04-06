import React, { useState, useEffect, useRef } from "react";
import { Box, Spacer, useInput, useApp, useFocusManager } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";
import useDimensions from "ink-use-stdout-dimensions";

import { useViewState } from "../state";
import Overview from "./overview";
import AbilitiesLayout from "./abilities";
import SkillsLayout from "./skills";
import StatusBar from "./components/StatusBar";

const App: React.FC<{}> = () => {
  const mounted = useRef<boolean>(true);
  const { exit } = useApp();
  const [, rows] = useDimensions();
  const { focusPrevious, focusNext } = useFocusManager();
  const { activeView } = useViewState();
  const [showIntro, setShowIntro] = useState<boolean>(true);

  useInput((input) => {
    if (input === "q") {
      exit();
      process.exit(0);
    }
  });

  useInput(
    (_, key) => {
      if (key.rightArrow || key.downArrow) {
        focusNext();
        return;
      }
      if (key.leftArrow || key.upArrow) {
        focusPrevious();
        return;
      }
    },
    { isActive: activeView === null }
  );

  useInput(() => setShowIntro(false), { isActive: showIntro });

  useEffect(() => {
    setTimeout(() => {
      if (mounted) setShowIntro(false);
    }, 3000);
    return () => void (mounted.current = false);
  }, []);

  if (showIntro)
    return (
      <Box flexDirection="column" height={rows - 1} justifyContent="center">
        <Gradient name="fruit">
          <BigText
            text="DnD"
            font="3d"
            align="center"
            backgroundColor="white"
          />
          <BigText
            text="TUI"
            font="3d"
            align="center"
            backgroundColor="white"
          />
        </Gradient>
      </Box>
    );

  return (
    <Box flexDirection="column" height={rows - 1}>
      <Overview />
      <Box>
        <AbilitiesLayout />
        <SkillsLayout />
      </Box>
      <Spacer />
      <StatusBar />
    </Box>
  );
};

export default App;
