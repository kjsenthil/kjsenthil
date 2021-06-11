import { Machine } from 'xstate';
import lifePlanConfig from './config';

const lifePlanMachine = Machine(lifePlanConfig);

export default lifePlanMachine;
