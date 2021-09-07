import { useMachine } from '@xstate/react';
import { Interpreter, State } from 'xstate';
import { IS_PRODUCTION } from '../../config';

import {
  shareDealingMachine,
  shareDealingContext,
  shareDealingActions,
  shareDealingGuards,
  shareDealingServices,
  ShareDealingContext,
  ShareDealingEvents,
  ShareDealingSchema,
} from '../../services/shareDealing/machines/shareDealing';

const useShareDealingMachine = ({
  firstName,
  accountId,
  isin,
}: {
  firstName: string;
  accountId: number;
  isin: string;
}): {
  state: State<ShareDealingContext, ShareDealingEvents>;
  send: Interpreter<ShareDealingContext, ShareDealingSchema, ShareDealingEvents>['send'];
  service: Interpreter<ShareDealingContext, ShareDealingSchema, ShareDealingEvents>;
  isLoading: boolean;
} => {
  const [state, send, service] = useMachine(
    shareDealingMachine
      .withConfig({
        actions: shareDealingActions,
        guards: shareDealingGuards,
        services: shareDealingServices,
      })
      .withContext({
        ...shareDealingContext,
        updatedBy: firstName,
        accountId,
        isin,
      }),
    { devTools: !IS_PRODUCTION }
  );

  const isLoading = [
    'ordering.fetchingShareDetails',
    'ordering.quotingOrder',
    'ordering.placingOrder',
    'ordering.creatingOrder.decidingOrderMethod',
    'ordering.previewingQuote.validatingQuote',
  ].some(state.matches);

  return { state, send, service, isLoading };
};

export default useShareDealingMachine;
