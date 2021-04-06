import React from "react";
import { Box, Text, Spacer } from "ink";
import Spinner from "ink-spinner";

import { useRollState } from "../../state";
import { formatDie } from "../../lib";

const controls = ["Activate/Roll: [return]", "Edit: [ctrl+e]", "Clear: [esc]"].join(
  "  |  "
);

const StatusBar: React.FC<{}> = () => {
  const { rolling, rollResult } = useRollState();

  return (
    <Box height={1} justifyContent="flex-end" paddingX={1}>
      <Text>{controls}</Text>
      <Spacer />
      {rolling && <Spinner type="dots" />}
      {!rolling &&
        rollResult?.length &&
        rollResult.map((result, i) => (
          <Box key={`${result.total}-${i}`} marginLeft={2}>
            <Text color="yellow">
              {formatDie(result.roll)}
              {" = "}
              {result.total}
              {" ["}
              {result.dice.join(", ")}
              {"]"}
            </Text>
          </Box>
        ))}
    </Box>
  );
};

export default StatusBar;
