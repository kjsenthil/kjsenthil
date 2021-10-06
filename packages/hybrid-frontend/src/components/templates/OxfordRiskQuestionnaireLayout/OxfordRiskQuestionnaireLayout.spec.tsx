import React from 'react';
import { fireEvent, renderWithTheme, screen } from '@tsw/test-util';
import OxfordRiskQuestionnaireLayout from './OxfordRiskQuestionnaireLayout';

const handleNext = jest.fn();
const handleBack = jest.fn();
const handleSubmit = jest.fn();
const handleExit = jest.fn();

describe('Oxford Risk Questionnaire Layout', () => {
  const questionnaire = <></>;

  describe('Start variant', () => {
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

    it('Calls the next page handler when the next button is clicked', () => {
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      expect(handleNext).toHaveBeenCalled();
    });
  });

  describe('In progress variant', () => {
    beforeEach(() => {
      renderWithTheme(
        <OxfordRiskQuestionnaireLayout
          variant="inProgress"
          questionnaire={questionnaire}
          handleNext={handleNext}
          handleBack={handleBack}
          handleExit={handleExit}
        />
      );
    });

    it('Renders a next button and a back button', () => {
      expect(screen.getByRole('button', { name: 'Next' })).toBeVisible();
      expect(screen.getByRole('button', { name: 'Back' })).toBeVisible();
    });

    it('Calls the next page handler when the next button is clicked', () => {
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      expect(handleNext).toHaveBeenCalled();
    });

    it('Calls the back handler when the back button is clicked', () => {
      fireEvent.click(screen.getByRole('button', { name: 'Back' }));
      expect(handleBack).toHaveBeenCalled();
    });

    it('Renders an exit link', () => {
      expect(screen.getByText('Exit')).toBeVisible();
    });

    it('Calls the exit handler when the exit link is clicked', () => {
      fireEvent.click(screen.getByText('Exit'));
      expect(handleExit).toHaveBeenCalled();
    });
  });

  describe('Final question variant', () => {
    beforeEach(() => {
      renderWithTheme(
        <OxfordRiskQuestionnaireLayout
          variant="finalQuestion"
          questionnaire={questionnaire}
          handleSubmit={handleSubmit}
        />
      );
    });

    it('Renders a back button and a submit button', () => {
      expect(screen.getByRole('button', { name: 'Back' })).toBeVisible();
      expect(screen.getByRole('button', { name: 'Submit' })).toBeVisible();
    });

    it('Calls the submit handler when the submit button is clicked', () => {
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  describe('Complete variant', () => {
    beforeEach(() => {
      renderWithTheme(
        <OxfordRiskQuestionnaireLayout
          variant="complete"
          questionnaire={questionnaire}
          handleExit={handleExit}
        />
      );
    });

    it('Renders a Back to Coaching button', () => {
      expect(screen.getByRole('button', { name: 'Back to Coaching' })).toBeVisible();
    });

    it('Calls the exit handler when the Back to Coaching button is clicked', () => {
      fireEvent.click(screen.getByRole('button', { name: 'Back to Coaching' }));
      expect(handleExit).toHaveBeenCalled();
    });
  });
});
