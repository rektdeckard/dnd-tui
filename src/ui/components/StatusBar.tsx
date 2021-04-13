import React from "react";
import { Box, Text, Spacer } from "ink";
import Spinner from "ink-spinner";

import { useRollState } from "../../state";
import { formatDie, getRollColor } from "../../lib";

const controls = [
  "SELECT/ROLL [return]",
  "ROLL ADV/DIS [shift/ctrl+r]",
  "EDIT [ctrl+e]",
  "SAVE [ctrl+s]",
].join("  |  ");

interface StatusBarProps {
  message: string | null;
}

const StatusBar: React.FC<StatusBarProps> = ({ message }) => {
  const { rolling, rollResult } = useRollState();

  return (
    <Box height={1} justifyContent="flex-end" paddingX={1}>
      <Text dimColor>{message ?? controls}</Text>
      <Spacer />
      {rolling && <Spinner type="dots" />}
      {!rolling &&
        rollResult?.length &&
        rollResult.map((result, i) => (
          <Box key={`${result.total}-${i}`} marginLeft={2}>
            <Text>
              {formatDie(result.roll)}
              {" = "}
            </Text>
            <Text color={getRollColor(result, -1)}>{result.total}</Text>
            <Text>{" ["}</Text>
            {result.dice.map((d, j) => (
              <React.Fragment key={j}>
                <Text color={getRollColor(result, j)}>{d}</Text>
                {j < result.dice.length - 1 && <Text>{", "}</Text>}
              </React.Fragment>
            ))}
            <Text>{"]"}</Text>
          </Box>
        ))}
    </Box>
  );
};

export default StatusBar;
