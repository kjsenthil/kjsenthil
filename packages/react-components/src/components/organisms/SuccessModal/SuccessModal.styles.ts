import styled from 'styled-components';
import { Dialog, DialogContent } from '../../atoms';

export const DialogMessage = styled.div<{
  isMobile: boolean;
}>`
  ${({ isMobile }) => `
    margin: ${isMobile ? '0' : '10px 0 20px 0'};
  `}
  p {
    font-size: 16px;
  }
`;

export const ModalImage = styled.img<{
  isMobile: boolean;
}>`
  ${({ theme, isMobile }) => `
    max-height: ${theme.spacing(203)}px;
    width: ${isMobile ? '100%' : '60%'};
    object-fit: cover;
    object-position: center;
    place-self: stretch stretch;
    text-align: center;
    margin-top: 13px;
  `}
`;

export const SuccessDialogContainer = styled.div`
  text-align: center;
`;

export const StyledDialogContent = styled(DialogContent)`
  ${({ theme }) => `
    max-height: ${theme.spacing(203)}px;
  `}
`;

export const StyledDialogContainer = styled(Dialog)`
  ${({ theme }) => `
    max-height: ${theme.spacing(100)}%;
    .MuiDialog-container {
        opacity: 0.3;
    }

   .MuiDialog-paper {
        border-radius: ${theme.spacing(2)}px;
        max-width:600px !important;
    }`}
`;
