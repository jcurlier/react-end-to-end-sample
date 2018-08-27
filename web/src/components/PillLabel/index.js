import system from 'system-components';

import Box from '../Box';

const PillLabel = system({
  is: Box,
  borderRadius: 13,
  bg: 'near-white',
  py: 2,
  px: 3,
  fontSize: 1,
});

PillLabel.displayName = 'PillLabel';

export default PillLabel;
