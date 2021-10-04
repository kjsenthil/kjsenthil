import React from 'react';
import { fireEvent, renderWithTheme, screen } from '@tsw/test-util';
import OxfordRiskQuestionnaireLayout from './OxfordRiskQuestionnaireLayout';

const handleNext = jest.fn();
const handleBack = jest.fn();
const handleSubmit = jest.fn();

describe('Oxford Risk Questionnaire Layout', () => {
  const questionnaire = <></>;

  describe('Questionnaire start variant', () => {
    beforeEach(() => {
      renderWithTheme(
        <OxfordRiskQuestionnaireLayout
          variant="start"
          questionnaire={questionnaire}
          cardContent={<p>Hello I am in a card</p>}
          handleNext={handleNext}
        />
      );
    });

    it('Renders a card with the card content', () => {
      expect(screen.getByText('Hello I am in a card')).toBeVisible();
    });

    it('Renders a next button', () => {
      expect(screen.getByRole('button', { name: 'Next' })).toBeVisible();
    });

    test('Calls the next page handler when the next button is clicked', () => {
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      expect(handleNext).toHaveBeenCalled();
    });
  });

  describe('Questionnaire in progress variant', () => {
    beforeEach(() => {
      renderWithTheme(
        <OxfordRiskQuestionnaireLayout
          variant="inProgress"
          questionnaire={questionnaire}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      );
    });

    it('Renders a next button and a back button', () => {
      expect(screen.getByRole('button', { name: 'Next' })).toBeVisible();
      expect(screen.getByRole('button', { name: 'Back' })).toBeVisible();
    });

    test('Calls the next page handler when the next button is clicked', () => {
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      expect(handleNext).toHaveBeenCalled();
    });

    test('Calls the back handler when the back button is clicked', () => {
      fireEvent.click(screen.getByRole('button', { name: 'Back' }));
      expect(handleBack).toHaveBeenCalled();
    });
  });

  describe('Questionnaire complete variant', () => {
    beforeEach(() => {
      renderWithTheme(
        <OxfordRiskQuestionnaireLayout
          variant="complete"
          questionnaire={questionnaire}
          handleSubmit={handleSubmit}
        />
      );
    });

    it('Renders a submit button', () => {
      expect(screen.getByRole('button', { name: 'Submit' })).toBeVisible();
    });

    test('Calls the submit handler when the submit button is clicked', () => {
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
