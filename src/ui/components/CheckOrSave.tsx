import React from "react";
import { Box, Text } from "ink";

import { formatNumber } from "../../lib";

const CheckOrSave: React.FC<{
  name: string;
  proficient: boolean;
  save: number;
  active?: boolean;
}> = ({ name, proficient, save, active }) => (
  <Box alignItems="center">
    <Text>{proficient ? "* " : "  "}</Text>
    <Box width={3} marginRight={1}>
      <Text>{formatNumber(save)}</Text>
    </Box>
    <Text underline={active}>{name}</Text>
  </Box>
);

export default CheckOrSave;
