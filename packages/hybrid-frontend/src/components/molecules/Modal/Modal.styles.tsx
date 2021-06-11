import styled from 'styled-components';
import { Dialog } from '../../atoms';

const StyledDialogContainer = styled(Dialog)`
  ${({ theme }) => `
    ..MuiDialog-container {
        opacity: 0.3;
    }

   .MuiDialog-paper {
        border-radius: ${theme.spacing(2)}px;
    }

    *::-webkit-scrollbar {
        width: ${theme.spacing(1)}px;
    }

    *::-webkit-scrollbar-track {
        background-color: ${theme.palette.grey.light2};
        border-radius: ${theme.spacing(1)}px;
    }

    *::-webkit-scrollbar-thumb {
        background-color: ${theme.palette.grey.main};
        border-radius: ${theme.spacing(1)}px;
    }

    *::-webkit-scrollbar-thumb:hover {
        background-color: ${theme.palette.grey.light1};
        border-radius: ${theme.spacing(1)}px;
    }

    *::-webkit-scrollbar-thumb:active {
        background-color: ${theme.palette.grey.light1};
        border-radius: ${theme.spacing(1)}px;
    }
  `}
`;

export default StyledDialogContainer;
