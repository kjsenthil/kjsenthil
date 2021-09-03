import * as React from 'react';
import MainCard, { MainCardProps } from '../../molecules/MainCard';
import Tooltip from '../../atoms/Tooltip';
import { Grid, Spacer, Link, Typography, Button } from '../../atoms';
import { DisabledComponent } from '../../molecules';

export interface GoalMainCardPlaceholderProps extends Omit<MainCardProps, 'children'> {
  imageElement: React.ReactElement;
  onCreateDefaultGoal: () => void;
  buttons: Record<string, { name: string; path?: string }>;
  onAddGoal: (name: string) => void;
  vertical?: boolean;
}

const ComingSoon = ({ enable, children }: { enable: boolean; children: React.ReactNode }) =>
  enable ? (
    <Tooltip arrow enterDelay={100} leaveDelay={300} placement="top" title="Coming soon">
      {children}
    </Tooltip>
  ) : (
    <>{children}</>
  );
const GoalActions = ({
  buttons,
  onAddGoal,
  vertical,
}: Pick<GoalMainCardPlaceholderProps, 'buttons' | 'onAddGoal' | 'vertical'>) => (
  <>
    <Grid container item justifyContent="space-between" spacing={2}>
      {Object.entries(buttons).map(([key, val]) => (
        <ComingSoon enable={!val.path} key={`${key}-button-key`}>
          <Grid item xs={vertical ? 4 : 6}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => (val.path ? onAddGoal(val.path) : {})}
              disabled={!val.path}
            >
              {val.name}
            </Button>
          </Grid>
        </ComingSoon>
      ))}
    </Grid>
  </>
);

const GoalMainCardPlaceholder = ({
  title,
  renderActionEl,
  imageElement,
  onCreateDefaultGoal,
  buttons,
  onAddGoal,
  vertical = true,
}: GoalMainCardPlaceholderProps) => (
  <MainCard title={title} respondTo="sm" renderActionEl={renderActionEl}>
    {(isMobile) => {
      const shouldBeVertical = vertical || isMobile;
      return (
        <>
          <Typography variant="b2" color="primary" colorShade="dark2">
            Save enough money for your most important moments by adding them to your life plan.
          </Typography>
          <Spacer y={3} />
          <Grid item container direction={shouldBeVertical ? undefined : 'row'} spacing={3}>
            <Grid item xs={shouldBeVertical ? 12 : 6}>
              {imageElement}
            </Grid>
            <Grid item xs={shouldBeVertical ? 12 : 6}>
              {shouldBeVertical && (
                <Grid item xs={12}>
                  <Typography variant="sh3" color="primary" colorShade="dark2">
                    What&#39;s important to you
                  </Typography>
                  <Spacer y={2} />
                </Grid>
              )}

              <GoalActions buttons={buttons} onAddGoal={onAddGoal} vertical={shouldBeVertical} />
              <DisabledComponent arrow title="Coming Soon">
                <Grid item container alignItems="center" justifyContent="center">
                  <Grid item>
                    <Spacer y={2} />
                    <Link onClick={onCreateDefaultGoal}>
                      I don&#39;t have a specific goal. Just show me my projections.
                    </Link>
                  </Grid>
                </Grid>
              </DisabledComponent>
            </Grid>
          </Grid>
        </>
      );
    }}
  </MainCard>
);

export default GoalMainCardPlaceholder;
