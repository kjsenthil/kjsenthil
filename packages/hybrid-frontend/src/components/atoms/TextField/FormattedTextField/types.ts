export interface FormattedTextFieldRequiredProps {
  // Pass a formatter to modify how the input text appears e.g. automatically
  // add commas to a number input. Providing this will change the text field to
  // one of the FormattedTextField variants (either controlled or uncontrolled).
  formatter: (inputValue: string, prevInputValue?: string | undefined) => string;
}

export interface FormattedTextFieldControlledRequiredProps {
  // The component will be treated as controlled if both 'value' and 'setValue'
  // are defined.
  value: string;
  setValue: (newValue: string) => void;
}
