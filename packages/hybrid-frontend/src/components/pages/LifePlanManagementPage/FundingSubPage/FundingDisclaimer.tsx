import * as React from 'react';
import styled from 'styled-components';
import { Typography, Link, Modal, ProjectionCalculateModal } from '@tswdts/react-components';

export interface FundingDisclaimerProps {}

export const Disclaimer = styled.div`
  ${({ theme }) => `
    padding: 0 ${theme.spacing(2.5)}px;

    > p:first-child {
      margin-right: ${theme.spacing(1)}px;
    }
  `};
`;

const FundingDisclaimer = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const linkClickHandler = () => setIsModalOpen(true);
  const modalCloseHandler = () => setIsModalOpen(false);

  return (
    <>
      <Disclaimer data-testid="funding-disclaimer">
        <Typography display="inline" variant="b3" color="grey" colorShade="dark1">
          This is a handy forecast based on your current contributions and choice of investments. It
          is not a reliable indicator of future performance.
        </Typography>
        <Link special onClick={linkClickHandler}>
          Tell me more
        </Link>
      </Disclaimer>
      <Modal
        maxWidth="md"
        fullWidth
        open={isModalOpen}
        onClose={modalCloseHandler}
        modalTitle="How was this projection calculated?"
      >
        <ProjectionCalculateModal />
      </Modal>
    </>
  );
};

export default FundingDisclaimer;
