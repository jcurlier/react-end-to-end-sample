import React from 'react';
import system from 'system-components';

import { Icon } from 'semantic-ui-react';

const MessageContainer = system({
  p: 3,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

const MessageWrapper = system({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const MessageTitle = system({
  fontSize: 3,
  my: 2,
});

const MessageDescription = system({
  color: 'gray',
  textAlign: 'center',
});

export default function Message(props) {
  const {
    icon = 'info',
    iconColor = 'blue',
    message = '',
    description = '',
  } = props;

  return (
    <MessageContainer>
      <MessageWrapper>
        <Icon circular name={icon} size="large" color={iconColor} />
        <MessageTitle>{message}</MessageTitle>
        <MessageDescription>{description}</MessageDescription>
      </MessageWrapper>
    </MessageContainer>
  );
}

export function NoDataMessage() {
  return (
    <Message
      icon="info"
      iconColor="blue"
      message="No Data Available"
      description="Please don't hesitate to contact us for questions"
    />
  );
}

export function ErrorMessage() {
  return (
    <Message
      icon="exclamation"
      iconColor="red"
      message="An Error Has Occurred"
      description="Please try refreshing or contacting the system administrator"
    />
  );
}

Message.NoDataMessage = NoDataMessage;
Message.ErrorMessage = ErrorMessage;
