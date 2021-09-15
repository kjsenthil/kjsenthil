import { Theme } from '@material-ui/core';
import React from 'react';
import styled, { css } from 'styled-components';
import { Modal } from '../../molecules';

// eslint-disable-next-line import/prefer-default-export
export const StyledModal = styled(({ isMobile, ...props }) => <Modal {...props} />)`
  ${({ isMobile, theme }: { isMobile: boolean; theme: Theme }) =>
    isMobile
      ? css`
          .MuiPaper-root {
            max-width: 100%;
            margin: 0;
            padding: 0;
          }

          .MuiDialogContent-root {
            margin: 0;
            padding: ${theme.spacing(1)}px;
          }
        `
      : ''}
`;
