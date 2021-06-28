import { configureStore, Reducer, ReducersMapObject, AnyAction } from '@reduxjs/toolkit';
/**
 * A helper function used to test reducers.
 *
 * Since reducers are just pure functions that takes in a state object and an
 * action object, we can maintain a list of all states that have ever occurred
 * as a result of actions.
 *
 * Given a reducer, this function returns a store configured with that reducer,
 * and an array containing the store's entire state history. The state history
 * is updated as actions are provided to the store.
 */
export default function getStoreAndStateHistory<
  S,
  R extends Reducer<S, AnyAction> | ReducersMapObject<S, AnyAction> = Reducer<S, AnyAction>
>(reducer: R) {
  const store = configureStore({
    reducer,
  });

  const stateHistory: S[] = [];

  // Whenever there is a state update, push the latest state to the state
  // history array
  store.subscribe(() => {
    stateHistory.push(store.getState());
  });

  return {
    store,
    stateHistory,
  };
}
