import React from "react";
import { Box, Text } from "ink";

import { formatNumber } from "../../lib";

const CheckOrSave: React.FC<{
  name: string;
  proficient: boolean;
  save: number;
}> = ({ name, proficient, save }) => (
  <Box alignItems="center">
    <Text>{proficient ? "✱ " : "  "}</Text>
    <Box width={3} marginRight={1}>
      <Text>{formatNumber(save)}</Text>
    </Box>
    <Text>{name}</Text>
  </Box>
);

export default CheckOrSave;
