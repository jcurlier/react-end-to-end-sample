import React from 'react';

import Box from '../Box';
import Logo from '../Logo';
import UserInfo from '../UserInfo';

const HeaderContainer = Box.extend`
  position: relative;
  background: ${props => props.theme.gradients['clear-sky']};
`;

const HeaderRow = props =>
  (
    <Box
      {...props}
      display="flex"
      flexDirection="row"
      maxWidth="1127px"
      mx="auto"
      px={3}
    />
  );

function Header(props) {
  const { currentUser } = props;

  return (
    <HeaderContainer color="white">
      <HeaderRow justifyContent="space-between">
        <Logo width="115" />
        <UserInfo user={currentUser} />
      </HeaderRow>
    </HeaderContainer>
  );
}
export default Header;
