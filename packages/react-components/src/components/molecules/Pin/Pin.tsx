import React from 'react';
import { ReactPinFieldProps } from 'react-pin-field';
import {
  PinFieldInputWrapper,
  PinFieldHeaderWrapper,
  ResponsivePinField,
  Separator,
  IconWithSpacing,
} from './Pin.styles';
import { Typography, TypographyProps, Link } from '../../atoms';
import { useBreakpoint } from '../../..';

export interface PinProps extends Omit<ReactPinFieldProps, 'type'> {
  typographyProps: TypographyProps;
  headerLabel: string;
  value?: string;
}

type HtmlInputs = { inputs: HTMLInputElement[] };

export const Pin = ({ typographyProps, headerLabel, value, ...pinFieldprops }: PinProps) => {
  const [applyMask, setApplyMask] = React.useState(true);
  const [hasPrePopulated, setHasPrePopulated] = React.useState(false);

  const { isMobile } = useBreakpoint();

  const ref = React.useRef<HtmlInputs>({ inputs: [] });

  React.useEffect(() => {
    ref?.current?.inputs.forEach((input) => {
      input.type = applyMask || isMobile ? 'password' : 'text';
    });
  }, [applyMask, isMobile]);

  React.useEffect(() => {
    if (!hasPrePopulated && !!value) {
      ref?.current?.inputs.forEach((input, i) => {
        input.value = value[i] || '';
      });

      setHasPrePopulated(true);
    }
  }, [hasPrePopulated, value]);

  return (
    <div>
      <PinFieldHeaderWrapper>
        <Typography {...typographyProps}>{headerLabel}</Typography>
      </PinFieldHeaderWrapper>
      <PinFieldInputWrapper isMobile={isMobile}>
        <ResponsivePinField isMobile={isMobile} {...pinFieldprops} type="password" innerRef={ref} />

        <Separator isMobile={isMobile} />
        <Link onClick={() => setApplyMask(!applyMask)}>
          <IconWithSpacing name="eye" isMobile={isMobile} />
        </Link>
      </PinFieldInputWrapper>
    </div>
  );
};
