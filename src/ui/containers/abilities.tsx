import React from "react";
import { Box } from "ink";

import { useCharacter } from "../../state";
import AbilityScore from "../components/AbilityScore";

const AbilitiesLayout: React.FC<{}> = () => {
  const { character, setCharacter } = useCharacter();

  return (
    <Box width={13} flexDirection="column">
      <AbilityScore
        stat="str"
        modifier={character.str}
        base={character.abilities.strength.base}
        set={setCharacter}
      />
      <AbilityScore
        stat="dex"
        modifier={character.dex}
        base={character.abilities.dexterity.base}
        set={setCharacter}
      />
      <AbilityScore
        stat="con"
        modifier={character.con}
        base={character.abilities.constitution.base}
        set={setCharacter}
      />
      <AbilityScore
        stat="int"
        modifier={character.int}
        base={character.abilities.intelligence.base}
        set={setCharacter}
      />
      <AbilityScore
        stat="wis"
        modifier={character.wis}
        base={character.abilities.wisdom.base}
        set={setCharacter}
      />
      <AbilityScore
        stat="cha"
        modifier={character.cha}
        base={character.abilities.charisma.base}
        set={setCharacter}
      />
    </Box>
  );
};

export default AbilitiesLayout;
