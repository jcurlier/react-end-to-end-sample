import React from 'react';

import system from 'system-components';

import logoUrl from '../../images/logo.svg';

const LogoImg = system(
  {
    is: 'img',
  },
  'space',
  'width'
);

export default function Logo(props) {
  return (
    <LogoImg src={logoUrl} {...props} />
  );
}
