import { Machine } from 'xstate';
import shareDealingConfig from './config';

const shareDealingMachine = Machine(shareDealingConfig);

export default shareDealingMachine;
