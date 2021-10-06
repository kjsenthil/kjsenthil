import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import {
  GoalProgressCardDetailed,
  GoalProgressCardDetailedProps,
  GoalProgressCardStyle,
} from './GoalProgressCardDetailed';
import { GoalState } from './goalState';
import {
  getByTextContent,
  queryAllByTextContent,
} from '../../../../test-utils/testing-library-queries';

const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
const accounts = ['ISA', 'SIPP'];

describe('Goal progress card', () => {
  describe('Monthly/annual drawdown goal', () => {
    const commonProps = {
      name: "Olivia's education",
      iconSrc: 'goals/large/my-childs-education.png',
      ageAtStartDate: 41,
      ageAtEndDate: 45,
      affordableAmount: 180_250,
      targetAmount: 220_000,
      shortfall: -40_000,
      onTrackPercentage: 0.8181818,
      accounts,
    };

    describe('Not there yet', () => {
      const props: GoalProgressCardDetailedProps = {
        ...commonProps,
        startDate: new Date(Date.now() + ONE_YEAR_MS),
        endDate: new Date(Date.now() + 5 * ONE_YEAR_MS),
      };

      const commonAssertions = () => {
        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByText(GoalState.NOT_THERE_YET)).toBeInTheDocument();
        expect(getByTextContent('£180,000/ £220,000')).toBeInTheDocument();
        expect(
          getByTextContent(
            "You're on track to have 82% of your target. That's a shortfall of £40,000."
          )
        ).toBeInTheDocument();
      };

      it('Should display correctly formatted data in simple view', () => {
        renderWithTheme(
          <GoalProgressCardDetailed {...props} style={GoalProgressCardStyle.simple} />
        );

        commonAssertions();
        expect(screen.getByText('ISA + SIPP')).toBeInTheDocument();
      });

      it('Should display correctly formatted data in detailed view', () => {
        renderWithTheme(<GoalProgressCardDetailed {...props} />);

        commonAssertions();
        expect(getByTextContent(/TARGET\s*£220,000/)).toBeInTheDocument();
      });
    });

    describe('Ongoing', () => {
      const props: GoalProgressCardDetailedProps = {
        ...commonProps,
        startDate: new Date(Date.now() - ONE_YEAR_MS),
        endDate: new Date(Date.now() + 5 * ONE_YEAR_MS),
      };

      const commonAssertions = () => {
        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByText(GoalState.ONGOING)).toBeInTheDocument();
        expect(getByTextContent('£180,000/ £220,000')).toBeInTheDocument();
        expect(
          getByTextContent(
            "You're on track to have 82% of your target. That's a shortfall of £40,000."
          )
        ).toBeInTheDocument();
      };

      it('Should display correctly formatted data in simple view', () => {
        renderWithTheme(
          <GoalProgressCardDetailed {...props} style={GoalProgressCardStyle.simple} />
        );

        commonAssertions();
        expect(screen.getByText('ISA + SIPP')).toBeInTheDocument();
      });

      it('Should display correctly formatted data in detailed view', () => {
        renderWithTheme(<GoalProgressCardDetailed {...props} />);

        commonAssertions();
        expect(getByTextContent(/TARGET\s*£220,000/)).toBeInTheDocument();
      });
    });

    describe('Finished', () => {
      const props: GoalProgressCardDetailedProps = {
        ...commonProps,
        startDate: new Date(Date.now() - 5 * ONE_YEAR_MS),
        endDate: new Date(Date.now() - ONE_YEAR_MS),
      };

      const commonAssertions = () => {
        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByText(GoalState.FINISHED)).toBeInTheDocument();
        expect(getByTextContent('£180,000/ £220,000')).toBeInTheDocument();
        expect(
          getByTextContent(
            'Your goal has now finished. If your plans have changed, you can still edit or delete this goal.'
          )
        ).toBeInTheDocument();
      };

      it('Should display correctly formatted data in simple view', () => {
        renderWithTheme(
          <GoalProgressCardDetailed {...props} style={GoalProgressCardStyle.simple} />
        );

        commonAssertions();
        expect(screen.getByText('ISA + SIPP')).toBeInTheDocument();
      });

      it('Should display correctly formatted data in detailed view', () => {
        renderWithTheme(<GoalProgressCardDetailed {...props} />);

        commonAssertions();
        expect(getByTextContent(/TARGET\s*£220,000/)).toBeInTheDocument();
      });
    });
  });

  describe('One-off drawdown goal', () => {
    const commonProps = {
      name: 'Buying a home',
      iconSrc: 'goals/large/buying-a-home.jpg',
      ageAtEndDate: 41,
      affordableAmount: 180_000,
      targetAmount: 220_000,
      shortfall: -40_000,
      onTrackPercentage: 0.8181818,
      accounts,
    };

    describe('Not there yet, shortfall', () => {
      const props: GoalProgressCardDetailedProps = {
        ...commonProps,
        endDate: new Date(Date.now() + ONE_YEAR_MS),
      };

      const commonAssertions = () => {
        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByText(GoalState.NOT_THERE_YET)).toBeInTheDocument();
        expect(getByTextContent('£180,000/ £220,000')).toBeInTheDocument();
        expect(
          getByTextContent(
            "You're on track to have 82% of your target. That's a shortfall of £40,000."
          )
        ).toBeInTheDocument();
      };

      it('Should display correctly formatted data in simple view', () => {
        renderWithTheme(
          <GoalProgressCardDetailed {...props} style={GoalProgressCardStyle.simple} />
        );

        commonAssertions();
        expect(screen.getByText('ISA + SIPP')).toBeInTheDocument();
      });

      it('Should display correctly formatted data in detailed view', () => {
        renderWithTheme(<GoalProgressCardDetailed {...props} />);

        commonAssertions();
        expect(getByTextContent(/TARGET\s*£220,000/)).toBeInTheDocument();
      });
    });

    describe('Not there yet, on-track', () => {
      const props: GoalProgressCardDetailedProps = {
        ...commonProps,
        endDate: new Date(Date.now() + ONE_YEAR_MS),
        affordableAmount: 234_000,
        targetAmount: 220_000,
        shortfall: 14_000,
        onTrackPercentage: 1.0,
      };

      const commonAssertions = () => {
        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByText(GoalState.NOT_THERE_YET)).toBeInTheDocument();
        expect(getByTextContent('£234,000/ £220,000')).toBeInTheDocument();
        expect(
          getByTextContent("You're on track to have 100% of your target.")
        ).toBeInTheDocument();
      };

      it('Should display correctly formatted data in simple view', () => {
        renderWithTheme(
          <GoalProgressCardDetailed {...props} style={GoalProgressCardStyle.simple} />
        );

        commonAssertions();
        expect(screen.getByText('ISA + SIPP')).toBeInTheDocument();
      });

      it('Should display correctly formatted data in detailed view', () => {
        renderWithTheme(<GoalProgressCardDetailed {...props} />);

        commonAssertions();
        expect(getByTextContent(/TARGET\s*£220,000/)).toBeInTheDocument();
      });
    });

    describe('Finished', () => {
      const props: GoalProgressCardDetailedProps = {
        ...commonProps,
        endDate: new Date(Date.now() - ONE_YEAR_MS),
      };

      const commonAssertions = () => {
        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByText(GoalState.FINISHED)).toBeInTheDocument();
        expect(getByTextContent('£180,000/ £220,000')).toBeInTheDocument();
        expect(
          getByTextContent(
            'Your goal has now finished. If your plans have changed, you can still edit or delete this goal.'
          )
        ).toBeInTheDocument();
      };

      it('Should display correctly formatted data in simple view', () => {
        renderWithTheme(
          <GoalProgressCardDetailed {...props} style={GoalProgressCardStyle.simple} />
        );

        commonAssertions();
        expect(screen.getByText('ISA + SIPP')).toBeInTheDocument();
      });

      it('Should display correctly formatted data in detailed view', () => {
        renderWithTheme(<GoalProgressCardDetailed {...props} />);

        commonAssertions();
        expect(getByTextContent(/TARGET\s*£220,000/)).toBeInTheDocument();
      });
    });
  });

  describe('Retirement goal', () => {
    const commonProps = {
      name: 'Retirement',
      iconSrc: 'goals/large/retirement.jpg',
      ageAtStartDate: 57,
      ageAtEndDate: 87,
      affordableAmount: 840_000,
      affordableAmountUnderperform: 634_000,
      targetAmount: 1_975_000,
      shortfall: 1_135_000,
      onTrackPercentage: 0.425316,
      totalAffordableDrawdown: 840_000,
      accounts,
    };

    describe('No lump sum, not there yet', () => {
      const props: GoalProgressCardDetailedProps = {
        ...commonProps,
        startDate: new Date(Date.now() + ONE_YEAR_MS),
        endDate: new Date(Date.now() + 31 * ONE_YEAR_MS),
      };

      const commonAssertions = () => {
        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByText(GoalState.NOT_THERE_YET)).toBeInTheDocument();
        expect(getByTextContent('£840,000/ £1,975,000')).toBeInTheDocument();
        expect(
          getByTextContent(
            "You're on track to have 43% of your target. That's £840,000 or £634,000 if markets underperform."
          )
        ).toBeInTheDocument();
      };

      it('Should display correctly formatted data in simple view', () => {
        renderWithTheme(
          <GoalProgressCardDetailed {...props} style={GoalProgressCardStyle.simple} />
        );

        commonAssertions();
        expect(screen.getByText('ISA + SIPP')).toBeInTheDocument();
      });

      it('Should display correctly formatted data in detailed view', () => {
        renderWithTheme(<GoalProgressCardDetailed {...props} />);

        commonAssertions();
        expect(getByTextContent(/TARGET\s*£1,975,000/)).toBeInTheDocument();
      });
    });

    describe('No lump sum, ongoing', () => {
      const props: GoalProgressCardDetailedProps = {
        ...commonProps,
        startDate: new Date(Date.now() - ONE_YEAR_MS),
        endDate: new Date(Date.now() + 29 * ONE_YEAR_MS),
      };

      const commonAssertions = () => {
        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByText(GoalState.ONGOING)).toBeInTheDocument();
        expect(getByTextContent('£840,000/ £1,975,000')).toBeInTheDocument();
        expect(
          getByTextContent(
            "You're on track to have 43% of your target. That's £840,000 or £634,000 if markets underperform."
          )
        ).toBeInTheDocument();
      };

      it('Should display correctly formatted data in simple view', () => {
        renderWithTheme(
          <GoalProgressCardDetailed {...props} style={GoalProgressCardStyle.simple} />
        );

        commonAssertions();
        expect(screen.getByText('ISA + SIPP')).toBeInTheDocument();
      });

      it('Should display correctly formatted data in detailed view', () => {
        renderWithTheme(<GoalProgressCardDetailed {...props} />);

        commonAssertions();
        expect(getByTextContent(/TARGET\s*£1,975,000/)).toBeInTheDocument();
      });
    });

    describe('No lump sum, finished', () => {
      const props: GoalProgressCardDetailedProps = {
        ...commonProps,
        startDate: new Date(Date.now() - 31 * ONE_YEAR_MS),
        endDate: new Date(Date.now() - ONE_YEAR_MS),
      };

      const commonAssertions = () => {
        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByText(GoalState.FINISHED)).toBeInTheDocument();
        expect(getByTextContent('£840,000/ £1,975,000')).toBeInTheDocument();
        expect(
          getByTextContent(
            'Your goal has now finished. If your plans have changed, you can still edit or delete this goal.'
          )
        ).toBeInTheDocument();
      };

      it('Should display correctly formatted data in simple view', () => {
        renderWithTheme(
          <GoalProgressCardDetailed {...props} style={GoalProgressCardStyle.simple} />
        );

        commonAssertions();
        expect(screen.getByText('ISA + SIPP')).toBeInTheDocument();
      });

      it('Should display correctly formatted data in detailed view', () => {
        renderWithTheme(<GoalProgressCardDetailed {...props} />);

        commonAssertions();
        expect(getByTextContent(/TARGET\s*£1,975,000/)).toBeInTheDocument();
      });
    });

    describe('With lump sum, not there yet', () => {
      const props: GoalProgressCardDetailedProps = {
        ...commonProps,
        lumpSumDate: new Date(Date.now() + ONE_YEAR_MS),
        startDate: new Date(Date.now() + ONE_YEAR_MS),
        endDate: new Date(Date.now() + 31 * ONE_YEAR_MS),
        ageAtStartDate: 67,
        lumpSum: 210_000,
        totalAffordableDrawdown: 574_000,
        remainingAmount: 56_000,
      };

      const commonAssertions = () => {
        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByText(GoalState.NOT_THERE_YET)).toBeInTheDocument();
        expect(getByTextContent('£840,000/ £1,975,000')).toBeInTheDocument();
        expect(
          getByTextContent(
            "You're on track to have 43% of your target. That's £840,000 or £634,000 if markets underperform."
          )
        ).toBeInTheDocument();
      };

      it('Should display correctly formatted data in simple view', () => {
        renderWithTheme(
          <GoalProgressCardDetailed {...props} style={GoalProgressCardStyle.simple} />
        );

        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByText(GoalState.NOT_THERE_YET)).toBeInTheDocument();
        expect(getByTextContent('£840,000/ £1,975,000')).toBeInTheDocument();
        expect(
          getByTextContent(
            "You're on track to have 43% of your target. That's £840,000 or £634,000 if markets underperform."
          )
        ).toBeInTheDocument();
        expect(screen.getByText('ISA + SIPP')).toBeInTheDocument();
      });

      it('Should display correctly formatted data in detailed view', () => {
        renderWithTheme(<GoalProgressCardDetailed {...props} />);

        commonAssertions();
        expect(getByTextContent(/LUMP SUM\s*£210,000/)).toBeInTheDocument();
        expect(getByTextContent(/FROM AGE 67–87\s*£574,000/)).toBeInTheDocument();
        expect(getByTextContent(/REMAINING\s*£56,000/)).toBeInTheDocument();
        expect(getByTextContent(/TARGET\s*£1,975,000/)).toBeInTheDocument();
      });
    });

    describe('With lump sum, ongoing', () => {
      const props: GoalProgressCardDetailedProps = {
        ...commonProps,
        lumpSumDate: new Date(Date.now() - ONE_YEAR_MS),
        startDate: new Date(Date.now() + 9 * ONE_YEAR_MS),
        endDate: new Date(Date.now() + 29 * ONE_YEAR_MS),
        ageAtStartDate: 67,
        lumpSum: 210_000,
        totalAffordableDrawdown: 574_000,
        remainingAmount: 56_000,
      };

      const commonAssertions = () => {
        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByText(GoalState.ONGOING)).toBeInTheDocument();
        expect(getByTextContent('£840,000/ £1,975,000')).toBeInTheDocument();
        expect(
          getByTextContent(
            "You're on track to have 43% of your target. That's £840,000 or £634,000 if markets underperform."
          )
        ).toBeInTheDocument();
      };

      it('Should display correctly formatted data in simple view', () => {
        renderWithTheme(
          <GoalProgressCardDetailed {...props} style={GoalProgressCardStyle.simple} />
        );

        commonAssertions();
        expect(screen.getByText('ISA + SIPP')).toBeInTheDocument();
      });

      it('Should display correctly formatted data in detailed view', () => {
        renderWithTheme(<GoalProgressCardDetailed {...props} />);

        commonAssertions();
        expect(queryAllByTextContent(/LUMP SUM\s*£210,000/)).toBeEmpty();
        expect(getByTextContent(/FROM AGE 67–87\s*£574,000/)).toBeInTheDocument();
        expect(getByTextContent(/REMAINING\s*£56,000/)).toBeInTheDocument();
        expect(getByTextContent(/TARGET\s*£1,975,000/)).toBeInTheDocument();
      });
    });

    describe('With lump sum, finished', () => {
      const props: GoalProgressCardDetailedProps = {
        ...commonProps,
        lumpSumDate: new Date(Date.now() - 31 * ONE_YEAR_MS),
        startDate: new Date(Date.now() - 21 * ONE_YEAR_MS),
        endDate: new Date(Date.now() - ONE_YEAR_MS),
        ageAtStartDate: 67,
        lumpSum: 210_000,
        totalAffordableDrawdown: 574_000,
        remainingAmount: 56_000,
      };

      const commonAssertions = () => {
        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByText(GoalState.FINISHED)).toBeInTheDocument();
        expect(getByTextContent('£840,000/ £1,975,000')).toBeInTheDocument();
        expect(
          getByTextContent(
            'Your goal has now finished. If your plans have changed, you can still edit or delete this goal.'
          )
        ).toBeInTheDocument();
      };

      it('Should display correctly formatted data in simple view', () => {
        renderWithTheme(
          <GoalProgressCardDetailed {...props} style={GoalProgressCardStyle.simple} />
        );

        commonAssertions();
        expect(screen.getByText('ISA + SIPP')).toBeInTheDocument();
      });

      it('Should display correctly formatted data in detailed view', () => {
        renderWithTheme(<GoalProgressCardDetailed {...props} />);

        commonAssertions();
        expect(queryAllByTextContent(/LUMP SUM\s*£210,000/)).toBeEmpty();
        expect(queryAllByTextContent(/FROM AGE 67–87\s*£574,000/)).toBeEmpty();
        expect(queryAllByTextContent(/REMAINING\s*£56,000/)).toBeEmpty();
        expect(getByTextContent(/TARGET\s*£1,975,000/)).toBeInTheDocument();
      });
    });
  });
});
