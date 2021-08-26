import styled from 'styled-components';
import { Icon, Theme, Button } from '../../atoms';

export const StyledWrapper = styled.div`
  ${({ theme }: { theme: Theme }) => `
    cursor: pointer;
    position: relative;
    min-width: 200px;
    display: inline-block;
    border-bottom: 2px solid ${theme.palette.primary.light2};
  `}
`;

export const StyledButton = styled(Button)`
  appearance: none;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  justify-content: flex-start;

  &:hover,
  &:active,
  &:focus {
    background: none;
  }
`;

export const StyledIcon = styled(Icon)`
  ${({ theme }: { theme: Theme }) => `
    position: absolute;
    right: 0;
    bottom: -15px;
    background-color: ${theme.palette.common.white};
    color: ${theme.palette.primary.light2};
  `}
`;
