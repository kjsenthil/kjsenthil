import * as React from 'react';
import { Box } from '@material-ui/core';
import { Grid, Icon, IconProps, Spacer, Typography } from '../../atoms';
import { Label, LabelProps } from '../../molecules';
import { StyledAvatar, TodoCardContainer } from './TodoCard.styles';

export interface TodoCardProps {
  title: string;
  text: string;
  onClick?: React.MouseEventHandler<any>;
  iconProps?: IconProps;
  labelProps?: LabelProps;
  extraContent?: React.ReactNode;
}

const renderIconGridItem = (iconProps: IconProps) => (
  <Grid item>
    <StyledAvatar>
      <Icon name={iconProps.name} color={iconProps.color ?? 'inherit'} />
    </StyledAvatar>
  </Grid>
);

const renderLabelGridItem = (labelProps: LabelProps) => (
  <Grid item>
    <Label {...labelProps} />
  </Grid>
);

const TodoCard = ({
  title,
  text,
  onClick = () => {},
  iconProps,
  labelProps,
  extraContent,
}: TodoCardProps) => (
  <TodoCardContainer onClick={onClick}>
    {(iconProps || labelProps) && (
      <Box pr={0.75}>
        <Grid container justifyContent="space-between">
          {iconProps && renderIconGridItem(iconProps)}
          {labelProps && renderLabelGridItem(labelProps)}
        </Grid>

        <Spacer y={2.5} />
      </Box>
    )}

    <Typography variant="h4" color="primary" colorShade="dark2">
      {title}
    </Typography>

    <Spacer y={1.5} />

    <Typography variant="sh1" color="primary" colorShade="dark2">
      {text}
    </Typography>

    {extraContent}
  </TodoCardContainer>
);

export default TodoCard;
