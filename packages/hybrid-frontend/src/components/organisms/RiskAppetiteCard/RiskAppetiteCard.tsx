import * as React from 'react';
import { Typography, Link, Grid, Spacer } from '../../atoms';
import { Modal, SliderLabelled } from '../../molecules';
import ProjectionCalculateModalContent from '../ProjectionCalculateModalContent';
import RiskAppetiteStyledCard from './RiskAppetiteCard.styles';

export interface RiskAppetiteCardProps {
  riskLevel: number;
  onChange: (name: string, newValue: number) => void;
  max: number;
  min: number;
  step: number;
  value: number;
  startLabel: string;
  endLabel: string;
  hereValue: number;
  showMarks: boolean;
}

const RiskAppetiteCard = ({
  riskLevel,
  onChange,
  max = 7,
  min = 1,
  step = 1,
  value = 4,
  startLabel = 'Low risk/reward',
  endLabel = 'High risk/reward',
  hereValue,
  showMarks = true,
}: RiskAppetiteCardProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleChange = (name: string, newValue: number) => {
    onChange(name, newValue);
  };

  const linkClickHandler = () => setIsModalOpen(true);
  const modalCloseHandler = () => setIsModalOpen(false);

  return (
    <RiskAppetiteStyledCard>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Typography color="black" colorShade="dark" variant="sh2" gutterBottom>
            Risk Appetite: Adventurous investment style
          </Typography>
        </Grid>
        <Grid item xs={4} align="right">
          <Link component="button" onClick={linkClickHandler}>
            Find out more
          </Link>
        </Grid>
      </Grid>

      <Typography color="grey" variant="b2">
        {'Increase to '}
        {riskLevel}
        {' to get 100% on track'}
      </Typography>
      <Spacer y={1} />

      <SliderLabelled
        name="sliderLabelled"
        onChange={handleChange}
        max={max}
        min={min}
        step={step}
        value={value}
        startLabel={startLabel}
        endLabel={endLabel}
        hereValue={hereValue}
        showMarks={showMarks}
      />

      <Modal
        open={isModalOpen}
        onClose={modalCloseHandler}
        modalTitle="How was this projection calculated?"
      >
        <ProjectionCalculateModalContent />
      </Modal>
    </RiskAppetiteStyledCard>
  );
};

export default RiskAppetiteCard;
