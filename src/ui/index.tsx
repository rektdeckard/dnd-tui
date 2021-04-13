import React, { useState, useEffect, useRef } from "react";
import { Box, Spacer, useInput, useApp, useFocusManager } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";
import useDimensions from "ink-use-stdout-dimensions";

import { useViewState, saveFile, useCharacter } from "../state";
import OverviewLayout from "./containers/overview";
import AbilitiesLayout from "./containers/abilities";
import FeaturesLayout from "./containers/features";
import StatusBar from "./components/StatusBar";

const App: React.FC<{}> = () => {
  const mounted = useRef<boolean>(true);
  const { exit } = useApp();
  const [, rows] = useDimensions();
  const { focusPrevious, focusNext } = useFocusManager();
  const { activeView } = useViewState();
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [canQuit, setCanQuit] = useState<boolean>(true);
  const [status, setStatus] = useState<string | null>(null);

  const doQuit = () => {
    exit();
    process.exit(0);
  };

  useInput((input, key) => {
    if (!canQuit) {
      if (input === "y" || input === "Y") {
        doQuit();
        return;
      }
      if (input === "n" || input === "N") {
        setStatus(null);
        setCanQuit(true);
      }
    }
    if (input === "q") {
      if (useCharacter.getState().isDirty) {
        setCanQuit(false);
        setStatus("Do you want to quit without saving? y/n");
      } else {
        doQuit();
      }
      return;
    }
    if (key.ctrl && input === "s") {
      saveFile();
      return;
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
    { isActive: activeView === null && !showIntro }
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
      <OverviewLayout />
      <Box>
        <AbilitiesLayout />
        <FeaturesLayout />
      </Box>
      <Spacer />
      <StatusBar message={status} />
    </Box>
  );
};

export default App;
