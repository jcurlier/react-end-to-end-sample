import React from 'react';
import system from 'system-components';

import Header from '../Header';

const PageWrapper = system({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  bg: 'light-gray',
});
PageWrapper.displayName = 'PageWrapper';

const Expand = system({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});
Expand.displayName = 'Expand';

const PageContent = system({
  height: '100%',
  width: [1, 600, 800],
  mx: 'auto',
  py: 4,
});
PageContent.displayName = 'PageContent';

function Page(props) {
  return (
    <PageWrapper>
      <Header />
      <Expand>
        {props.children}
      </Expand>
    </PageWrapper>
  );
}

Page.Content = PageContent;

export default Page;
export { PageContent };
