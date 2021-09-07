import * as React from 'react';
import { useBreakpoint } from '../../../hooks';
import { Typography, Spacer, Divider } from '../../atoms';
import {
  ReceiptResultSeparatorWrapper,
  ReceiptCardRightSeparatorCut,
  ReceiptCardLeftSeparatorCut,
  ReceiptCardWrapper,
  ReceiptCardListPart,
  ReceiptCardTotalPart,
  ReceiptTotalProps,
  ReceiptCardSeparator,
  ReceiptCardSeparatorSpan,
  ReceiptCardHeader,
  ReceiptCardListBody,
  ReceiptCardTotalBody,
  ReceiptItemContainer,
  ReceiptItemTitle,
  ReceiptItemValue,
} from './ReceiptCard.styles';

export interface ReceiptCardItem<T = string> {
  key: string;
  value: T;
}

export interface ReceiptCardProps extends Partial<ReceiptTotalProps> {
  items: ReceiptCardItem<string | React.ReactNode>[];
  total: ReceiptCardItem<string>;
  listHeader?: ReceiptCardItem<string>;
  cardHeader?: React.ReactNode;
  renderBottom?: React.ReactNode;
}

const ReceiptResultSeparator = (props: ReceiptTotalProps) => (
  <ReceiptResultSeparatorWrapper>
    <ReceiptCardLeftSeparatorCut {...props} />
    <ReceiptCardSeparatorSpan {...props}>
      <ReceiptCardSeparator />
    </ReceiptCardSeparatorSpan>
    <ReceiptCardRightSeparatorCut {...props} />
  </ReceiptResultSeparatorWrapper>
);

const ReceiptCard = ({
  items,
  total,
  listHeader,
  cardHeader,
  renderBottom,
  shouldFillBottom = false,
}: ReceiptCardProps) => {
  const { isMobile } = useBreakpoint();
  return (
    <ReceiptCardWrapper>
      <ReceiptCardListPart>
        {cardHeader && (
          <ReceiptCardHeader>
            {cardHeader}
            <Spacer y={1} />
            <Divider y={3} />
          </ReceiptCardHeader>
        )}
        {listHeader && (
          <>
            <ReceiptItemContainer
              container
              shouldFillBackground={!isMobile}
              isHeader
              hasRadius={!cardHeader}
            >
              <ReceiptItemTitle item xs={6}>
                <Typography variant="sh3" color="primary" colorShade="dark2">
                  {listHeader.key.toUpperCase()}
                </Typography>
              </ReceiptItemTitle>
              <ReceiptItemValue item xs={6}>
                <Typography variant="sh3" color="primary" colorShade="dark2">
                  {listHeader.value.toUpperCase()}
                </Typography>
              </ReceiptItemValue>
            </ReceiptItemContainer>
            <Spacer y={3} />
          </>
        )}
        <ReceiptCardListBody>
          {items.map(({ key, value }, index) => (
            <React.Fragment key={key}>
              <ReceiptItemContainer container>
                <ReceiptItemTitle item xs={6}>
                  <Typography variant="b4" color="primary" colorShade="dark2">
                    {key}
                  </Typography>
                </ReceiptItemTitle>
                <ReceiptItemValue item xs={6}>
                  {typeof value === 'object' ? (
                    value
                  ) : (
                    <Typography variant="sh2" color="primary" colorShade="dark2">
                      {value}
                    </Typography>
                  )}
                </ReceiptItemValue>
              </ReceiptItemContainer>
              {index < Object.keys(items).length - 1 && <Divider y={3} />}
            </React.Fragment>
          ))}
        </ReceiptCardListBody>
      </ReceiptCardListPart>
      <ReceiptResultSeparator shouldFillBottom={shouldFillBottom} />
      <ReceiptCardTotalPart shouldFillBottom={shouldFillBottom}>
        <ReceiptCardTotalBody>
          <ReceiptItemContainer container>
            <ReceiptItemTitle item xs={6}>
              <Typography variant="sh2" color="primary" colorShade="dark2">
                {total.key}
              </Typography>
            </ReceiptItemTitle>
            <ReceiptItemValue item xs={6}>
              <Typography variant="h4" color="primary" colorShade="dark2">
                {total.value}
              </Typography>
            </ReceiptItemValue>
          </ReceiptItemContainer>
          {renderBottom}
        </ReceiptCardTotalBody>
      </ReceiptCardTotalPart>
    </ReceiptCardWrapper>
  );
};

export default ReceiptCard;
