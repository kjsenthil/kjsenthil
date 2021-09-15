import styled from 'styled-components';
import { Dialog, DialogContent, DialogTitle, Icon, Grid } from '../../atoms';

export const StyledDialogContainer = styled(Dialog)<{
  isMobile: boolean;
}>`
  ${({ theme, isMobile }) => `
    max-height: ${theme.spacing(50)}px;

    .MuiDialog-container {
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
      background-color: ${theme.palette.grey.light2};
      border-radius: ${theme.spacing(1)}px;
      padding: ${theme.spacing(2)}px;
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

    .MuiPaper-root {
      min-width: ${isMobile ? '' : '550px'};
      max-height: ${isMobile ? '475px' : '100%'};
      margin: 20px 20px auto 20px;
    }

    .closeIcon {
      color: ${theme.palette.grey['500']};
    }

    .MuiDialogContent-root {
      margin-bottom: ${theme.spacing(3.75)}px;
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
    margin: 0 ${theme.spacing(3.5)}px auto ${theme.spacing(0.6)}px;
    max-height: ${theme.spacing(23)}px;
    
    .MuiDialogContent-dividers {
        padding-right: ${theme.spacing(1)}px;
        margin-right: ${theme.spacing(3)}px;
    }

    .MuiTypography-root {
      :nth-child(odd) {
        margin-bottom: 0px;
      }
    }

  `}
`;

export const StyledIcon = styled(Icon)`
  ${({ theme }) => `
    margin-right: ${theme.spacing(1.5)}px;
  `}
`;

export const ParentContainer = styled.div<{
  isMobile: boolean;
}>`
  ${({ theme, isMobile }) => `
    margin: ${isMobile ? `${theme.spacing(1.25)}px` : `${theme.spacing(3.125)}px`}
  `}
`;

export const BottomRow = styled(Grid)`
  justify-content: flex-end;
`;

export const ButtonContainer = styled.div<{
  isMobile: boolean;
}>`
  ${({ theme, isMobile }) => `
    width: ${isMobile ? '100%' : ''};

    :nth-child(even) {
      margin-top: ${isMobile ? `${theme.spacing(2.5)}px` : ''};
      margin-left: ${isMobile ? '' : `${theme.spacing(3.125)}px`};
    }
  `}
`;

export const BottomRowWrapper = styled.div<{
  isMobile: boolean;
}>`
  ${({ theme, isMobile }) => `
   margin: ${
     isMobile
       ? `0 ${theme.spacing(2.375)}px ${theme.spacing(2.625)}px ${theme.spacing(2.375)}px`
       : `0 ${theme.spacing(3.75)}px ${theme.spacing(2.625)}px 0`
   };
  `}
`;
