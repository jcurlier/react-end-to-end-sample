import system from 'system-components';


const Button = system(
  {
    is: 'button',
    py: 3,
    px: 4,
    fontSize: 3,
    cursor: 'pointer',
    borderRadius: '5px',
  },
  // core
  'space',
  'width',
  'color',
  'fontSize',
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
  'buttonStyle',
);

Button.displayName = 'Button';

export default Button;
