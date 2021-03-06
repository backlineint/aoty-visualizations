import React from 'react';
import styled from 'styled-components';

import { Icon } from "@blueprintjs/core";

// Example of styling an existing 3rd party component.
const GearIcon = styled(Icon)`
  opacity: 1 !important;
  font-size: 2.5rem !important;
  color: black;
`;

export default () => {
  return(
    <GearIcon iconName="pt-icon-cog" />
  )
}
