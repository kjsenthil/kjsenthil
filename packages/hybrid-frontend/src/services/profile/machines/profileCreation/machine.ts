import { Machine } from 'xstate';
import ProfileCreationConfig from './config';

const profileCreationMachine = Machine(ProfileCreationConfig);

export default profileCreationMachine;
