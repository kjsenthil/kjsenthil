import styled from 'styled-components';
import { Dialog, DialogContent, DialogTitle, Icon, Theme } from '../../atoms';

export const StyledDialogContainer = styled(Dialog)`
  ${({ theme }: { theme: Theme }) => `
    max-height: ${theme.spacing(50)}px;

    ..MuiDialog-container {
        opacity: 0.3;
    }

   .MuiDialog-paper {
        border-radius: ${theme.spacing(2)}px;
    }

    *::-webkit-scrollbar {
        width: 5px;
        padding: ${theme.spacing(2)}px;
    }

    *::-webkit-scrollbar-track {
        background-color: ${theme.palette.grey[100]};
        border-radius: ${theme.spacing(1)}px;
        padding: ${theme.spacing(2)}px;

    }

    *::-webkit-scrollbar-thumb {
        background-color: ${theme.palette.grey[300]};
        border-radius: ${theme.spacing(1)}px;
    }

    *::-webkit-scrollbar-thumb:hover {
        background-color: ${theme.palette.grey[200]};
        border-radius: ${theme.spacing(1)}px;
    }

    *::-webkit-scrollbar-thumb:active {
        background-color: ${theme.palette.grey[100]};
        border-radius: ${theme.spacing(1)}px;
    }
  `}
`;

export const StyledDialogTitle = styled(DialogTitle)`
  ${({ theme }) => `
    padding-right: ${theme.spacing(1)}px;
    padding-top: ${theme.spacing(1)}px;
    padding-bottom: ${theme.spacing(1)}px;
  `}
`;

export const StyledDialogContent = styled(DialogContent)`
  ${({ theme }) => `
    padding-right: ${theme.spacing(1)}px;
    margin-right: ${theme.spacing(3.5)}px;
    margin-bottom: ${theme.spacing(4)}px;
    max-height: ${theme.spacing(23)}px;
    
    .MuiDialogContent-dividers {
        padding-right: ${theme.spacing(1)}px;
        margin-right: ${theme.spacing(3)}px;
    }
  `}
`;

export const StyledIcon = styled(Icon)`
  ${({ theme }) => `
    margin-right: ${theme.spacing(1)}px;
  `}
`;
