import { CommonState } from '../types';

const setLoadingAction = (state: CommonState) => {
  state.status = 'loading';
  state.error = undefined;
};

export default setLoadingAction;
