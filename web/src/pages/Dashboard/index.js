import React from 'react';

import { Container, Page } from '../../components';
import ContributorsCarousel from './ContributorsCarousel';
import InviteContributorButton from './InviteContributorButton';

export default () => (
  <Page>
    <Container>
      <ContributorsCarousel />
      <InviteContributorButton />
    </Container>
  </Page>
);
