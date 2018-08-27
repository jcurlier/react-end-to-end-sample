import system from 'system-components';

const Text = system(
  {
    is: 'span',
    fontFamily: 'Geomanist; sans-serif',
  },
  'space',
  'color',
  'fontSize',
  'fontFamily',
  'textAlign',
  'lineHeight',
  'fontWeight',
  'letterSpacing',
  // flex
  'flex',
  'flexBasis',
  'alignSelf',
  'justifySelf',
  // position
  'position',
  'zIndex',
  'top',
  'right',
  'bottom',
  'left',
);

Text.displayName = 'Text';

export default Text;
