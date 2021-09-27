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
  shareDealingDelays,
} from '../../services/shareDealing/machines/shareDealing';

export type SendEvent = Interpreter<
  ShareDealingContext,
  ShareDealingSchema,
  ShareDealingEvents
>['send'];
export type MachineService = Interpreter<
  ShareDealingContext,
  ShareDealingSchema,
  ShareDealingEvents
>;
export type MachineState = State<ShareDealingContext, ShareDealingEvents>;

const useShareDealingMachine = ({
  accountId,
  isin,
}: {
  accountId: number;
  isin: string;
}): {
  state: MachineState;
  send: SendEvent;
  service: MachineService;
  isLoading: boolean;
} => {
  const [state, send, service] = useMachine(
    shareDealingMachine
      .withConfig({
        actions: shareDealingActions,
        guards: shareDealingGuards,
        services: shareDealingServices,
        delays: shareDealingDelays,
      })
      .withContext({
        ...shareDealingContext,
        accountId,
        isin,
      }),
    { devTools: !IS_PRODUCTION }
  );

  const isLoading = [
    'ordering.fetchingShareDetails',
    'ordering.quotingOrder',
    'ordering.placingOrder',
    'ordering.creatingOrder.decidingExecutionType',
    'ordering.previewingQuote.validatingQuote',
  ].some(state.matches);

  return { state, send, service, isLoading };
};

export default useShareDealingMachine;
