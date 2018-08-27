import React from 'react';
import styled, { keyframes } from 'styled-components';
import system from 'system-components';

import { Modal as SemanticModal } from 'semantic-ui-react';

import theme from '../../styles/theme';

import Box from '../Box';

const contentKeyframe = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledSemanticModal = styled(SemanticModal)`
  transform: scale(0);
  animation: ${contentKeyframe} 200ms cubic-bezier(0.4, 0, 0.2, 1) both 100ms;
`;

function ModalItem(props) {
  const { index, children } = props;

  const bg = index % 2 === 0 ? theme.colors['pale-blue'] : 'transparent';

  return (
    <Box lineHeight="24px" bg={bg} p={3} fontSize={2}>
      {children}
    </Box>
  );
}

const ModalHeaderContainer = system({
  is: Box,
  fontSize: 3,
  p: 3,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const CloseButton = system({
  is: 'span',
  fontWeight: 'bold',
  fontSize: 4,
}, {
  cursor: 'pointer',
  userSelect: 'none',
});
CloseButton.displayName = 'CloseButton';

export function ModalHeader(props) {
  const { title, onClose } = props;
  return (
    <ModalHeaderContainer>
      <span>{title}</span>
      <CloseButton onClick={onClose}>&times;</CloseButton>
    </ModalHeaderContainer>
  );
}

const ModalContainer = system({
  is: Box,
  bg: 'white',
});

ModalContainer.displayName = 'ModalContainer';

function Modal(props) {
  return (
    <StyledSemanticModal {...props} />
  );
}

Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Item = ModalItem;
Modal.CloseButton = CloseButton;

export default Modal;
