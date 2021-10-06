import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import QuestionAnswerToggle from '@tswdts/react-components/src/components/organisms/QuestionAnswerToggle';
import OxfordRiskQuestionnaireLayout, {
  OxfordRiskQuestionnaireLayoutProps,
} from './OxfordRiskQuestionnaireLayout';

export default {
  title: 'Digital Hybrid/Templates/Oxford Risk Questionnaire Layout',
  component: OxfordRiskQuestionnaireLayout,
  argTypes: { variant: String },
} as Meta;

const Template: Story<OxfordRiskQuestionnaireLayoutProps> = (args) => (
  <OxfordRiskQuestionnaireLayout {...args} />
);

export const StartScreen = Template.bind({});
StartScreen.args = {
  variant: 'start',
  questionnaire: (
    <>
      <h3>Your risk tolerance</h3>
      <p>1 of 16</p>
      <p>
        Before we can help with your investing, it’s important that we understand your attitude to
        risk.
      </p>
      <QuestionAnswerToggle
        question="I am comfortable with the possibility of ending up with less than I expect, for the chance
        of ending up with more than I expect."
        answers={['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']}
        selected="Strongly disagree"
        updateAnswer={() => null}
      />
    </>
  ),
  cardContent: (
    <>
      <h3>How do we use this information?</h3>
      <p>
        Having the correct exposure to risk is key to achieving your desired investment outcome. Too
        Too much risk … and you might find the occasional falls in value difficult to tolerate -
        plus you might not be able to fulfil your plans if a fall in value comes at the wrong time.
        Too little risk … and you sacrifice the opportunity to grow your wealth, which can limit
        your future spending power. These questions are the starting point for us to understand your
        appetite for risk. When you speak to a coach, they will introduce other ways of assessing
        your overall appetite, so that they can help you achieve your objectives.
      </p>
    </>
  ),
};
StartScreen.parameters = {
  layout: 'fullscreen',
};

export const InProgressScreen = Template.bind({});
InProgressScreen.args = {
  variant: 'inProgress',
  questionnaire: (
    <>
      <h3>Your risk tolerance</h3>
      <p>2 of 16</p>
      <p>
        Before we can help with your investing, it’s important that we understand your attitude to
        risk.
      </p>
      <div>
        <QuestionAnswerToggle
          question="The possibility of investment losses makes me uneasy."
          answers={['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']}
          selected="Strongly disagree"
          updateAnswer={() => null}
        />
      </div>
    </>
  ),
};
InProgressScreen.parameters = {
  layout: 'fullscreen',
};

export const FinalQuestionScreen = Template.bind({});
FinalQuestionScreen.args = {
  variant: 'finalQuestion',
  questionnaire: (
    <>
      <h3>Your risk tolerance</h3>
      <p>16 of 16</p>
      <p>
        Before we can help with your investing, it’s important that we understand your attitude to
        risk.
      </p>
      <div>
        <QuestionAnswerToggle
          question="I get worried when my investments drop in value."
          answers={['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']}
          selected="Strongly disagree"
          updateAnswer={() => null}
        />
      </div>
    </>
  ),
};
FinalQuestionScreen.parameters = {
  layout: 'fullscreen',
};

export const CompleteScreen = Template.bind({});
CompleteScreen.args = {
  variant: 'complete',
  questionnaire: (
    <>
      <h2>Thank you!</h2>
      <p>
        Thanks for completing the questionnaire. The answers will provide the basis of your
        conversation with your coach and the recommendation they give you.
      </p>
      <h3>What happens next?</h3>
      <h4>Coaching call</h4>
      <p>
        You can talk through these answers and ask any questions during your telephone call with one
        of our coaches.
      </p>
    </>
  ),
};
CompleteScreen.parameters = {
  layout: 'fullscreen',
};
