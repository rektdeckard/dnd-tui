import React from "react";
import { Box, Text } from "ink";
import Spinner from "ink-spinner";

import { useRollState } from "../../state";
import { formatDie } from "../../lib";

const StatusBar: React.FC<{}> = () => {
  const { rolling, rollResult } = useRollState();

  return (
    <Box height={1} justifyContent="flex-end">
      {rolling && <Spinner type="dots" />}
      {!rolling &&
        rollResult?.length &&
        rollResult.map((result, i) => (
          <Box key={`${result.total}-${i}`} marginLeft={2}>
            <Text>
              {formatDie(result.roll)}
              {": "}
              {result.total}
            </Text>
          </Box>
        ))}
    </Box>
  );
};

export default StatusBar;
