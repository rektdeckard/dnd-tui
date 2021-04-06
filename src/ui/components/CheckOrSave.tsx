import React, { useCallback } from "react";
import { Box, Text, useInput } from "ink";

import { Ability, Skill, formatNumber, getColor, formatName } from "../../lib";
import { CharacterSetterOrUpdater, useRollState } from "../../state";

const CheckOrSave: React.FC<{
  property: Ability | Skill;
  proficient: boolean;
  save: number;
  active?: boolean;
  set: CharacterSetterOrUpdater;
}> = ({ property, proficient, save, active = false, set }) => {
  const performRoll = useRollState(useCallback((s) => s.performRolls, []));
  const color = getColor(active, false);

  const toggleProficient = () => {
    set((c) => {
      if (c.abilities[property]) {
        c.abilities[property].proficient = !proficient;
      } else {
        c.skills[property].proficient = !proficient;
      }
      return c;
    });
  };

  useInput(
    (input, key) => {
      if (key.ctrl && input === "e") {
        toggleProficient();
        return;
      }
      if (key.return || input === " ") {
        performRoll({ die: 20, count: 1, modifier: save });
      }
    },
    { isActive: active }
  );

  return (
    <Box alignItems="center">
      <Text color={color}>{proficient ? "* " : "  "}</Text>
      <Box width={3} marginRight={1}>
        <Text color={color}>{formatNumber(save)}</Text>
      </Box>
      <Text color={color}>{formatName(property)}</Text>
    </Box>
  );
};

export default CheckOrSave;
