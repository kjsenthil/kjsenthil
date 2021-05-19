import styled from 'styled-components';
import { Link } from '../../atoms';

const LogoImage = styled(Link)`
  ${({ theme }) => `
    padding-top: ${theme.spacing(3)}px;
    padding-right: ${theme.spacing(7)}px;
    padding-bottom: ${theme.spacing(1)}px;
    padding-left: ${theme.spacing(8)}px;

    background-image: url('/BlueBestInvest.svg');
    background-repeat: no-repeat;
    background-size: auto;
  `}
`;

export default LogoImage;
