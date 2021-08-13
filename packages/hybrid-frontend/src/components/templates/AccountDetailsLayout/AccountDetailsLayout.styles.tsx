import styled from 'styled-components';

export const StyledHeader = styled.div`
  ${({ theme }) => `
    background-color: ${theme.palette.grey.light1};
    padding: ${theme.spacing(9)}px;
  `}
`;

export const StyledNav = styled.nav`
  ${({ theme }) => `
    position: relative;
    background-color: ${theme.palette.common.white};
    border: 1px solid ${theme.palette.grey.light2};
    display: flex;
    justify-content: flex-start;
    align-items: center;
  `}
`;

export const StyledList = styled.ul`
  margin: 0;
  padding: 0;
`;
