import React from 'react';
import system from 'system-components';

import { Box, Logo, Text } from '../../components';
import SigninForm from './SigninForm';
import backgroundUrl from '../../images/background.jpg';

const Page = system(
  'color',
  'space',
  {
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  props => ({
    backgroundImage: props.src ? `url(${props.src})` : undefined,
    backgroundSize: props.src ? 'cover' : undefined,
    backgroundPosition: props.src ? 'center' : undefined,
    backgroundRepeat: props.src ? 'no-repeat' : undefined,
  })
);

const Container = system(
  'color',
  'space',
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px'
  }
);

export default function Login() {
  return (
    <Page src={backgroundUrl}>
      <Container p={3} bg="#e6fff2">
        <Logo mb={4} width={115} />
        <Box p={3} fontSize={4}>
          <Text fontWeight="bold">CollegeBacker</Text> Center
        </Box>
        <Text mb={4} fontSize={3}>Welcome back. Please login to your account.</Text>
        <SigninForm />
      </Container>
    </Page>
  );
}
