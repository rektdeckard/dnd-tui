import React from "react";
import { Box, DOMElement } from "ink";
import { getColor } from "../../lib";

const BorderBox = React.forwardRef<
  DOMElement,
  React.ComponentPropsWithoutRef<typeof Box> & {
    focused?: boolean;
    active?: boolean;
  }
>(
  (
    {
      focused = false,
      active = false,
      borderStyle = "single",
      paddingX = 1,
      ...rest
    },
    ref
  ) => (
    <Box
      ref={ref}
      borderStyle={borderStyle}
      borderColor={getColor(focused, active)}
      paddingX={paddingX}
      {...rest}
    />
  )
);

export default BorderBox;
