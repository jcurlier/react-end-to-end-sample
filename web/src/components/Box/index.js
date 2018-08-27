import system from 'system-components';

const Box = system(
  // core
  'space',
  'width',
  'color',
  'fontSize',
  // typography
  'textAlign',
  'fontWeight',
  'lineHeight',
  'letterSpacing',
  'fontFamily',
  // borders
  'borders',
  'borderColor',
  'borderRadius',
  // layout
  'display',
  'maxWidth',
  'minWidth',
  'height',
  'maxHeight',
  'minHeight',
  // flexbox
  'alignItems',
  'alignContent',
  'justifyContent',
  'flexWrap',
  'flexDirection',
  'flex',
  'flexBasis',
  'justifySelf',
  'alignSelf',
  'order',
  // position
  'position',
  'zIndex',
  'top',
  'right',
  'bottom',
  'left',
  // misc
  'boxShadow',
);

Box.displayName = 'Box';

export default Box;
