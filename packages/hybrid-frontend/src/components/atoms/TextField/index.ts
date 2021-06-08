import TextField from './TextField';
import { TextFieldProps } from './types';
import FormattedTextFieldControlled, {
  FormattedTextFieldControlledProps,
} from './FormattedTextField/FormattedTextFieldControlled';
import FormattedTextFieldUncontrolled, {
  FormattedTextFieldUncontrolledProps,
} from './FormattedTextField/FormattedTextFieldUncontrolled';

export type { TextFieldProps };
export default TextField;

export type { FormattedTextFieldControlledProps, FormattedTextFieldUncontrolledProps };
export { FormattedTextFieldControlled, FormattedTextFieldUncontrolled };
