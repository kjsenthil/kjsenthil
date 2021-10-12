import { useMachine } from '@xstate/react';
import { Interpreter, State } from 'xstate';
import { IS_PRODUCTION } from '../../config';

import {
  profileCreationMachine,
  profileCreationContext,
  profileCreationActions,
  profileCreationGuards,
  ProfileCreationContext,
  ProfileCreationEvents,
  ProfileCreationSchema,
} from '../../services/profile/machines/profileCreation';

export type SendEvent = Interpreter<
  ProfileCreationContext,
  ProfileCreationSchema,
  ProfileCreationEvents
>['send'];

export type MachineService = Interpreter<
  ProfileCreationContext,
  ProfileCreationSchema,
  ProfileCreationEvents
>;
export type MachineState = State<ProfileCreationContext, ProfileCreationEvents>;

const useProfileCreationMachine = (): {
  state: MachineState;
  send: SendEvent;
  service: MachineService;
  isLoading: boolean;
} => {
  const [state, send, service] = useMachine(
    profileCreationMachine
      .withConfig({
        actions: profileCreationActions,
        guards: profileCreationGuards,
      })
      .withContext({
        ...profileCreationContext,
      }),
    { devTools: !IS_PRODUCTION }
  );

  const isLoading = ['settingPersonalDetails.validating', 'submittingProfile'].some(state.matches);

  return { state, send, service, isLoading };
};

export default useProfileCreationMachine;
