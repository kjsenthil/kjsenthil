import React, { useEffect, useRef, useState } from 'react';
import { PinLoginItem } from '../../../../services';
import randomPinIndices from '../../../../services/auth/utils/randomPinIndices';

export interface PinInput extends PinLoginItem {
  ref: React.RefObject<HTMLInputElement | undefined>;
}

export interface PinInputs {
  inputs: PinInput[];
  setInputValue: (index: number, value: number) => void;
  focusInput: (index: number) => void;
}

const usePinInputs = (): PinInputs => {
  const [inputs, setInputs] = useState<PinLoginItem[]>(randomPinIndices());
  const [shouldFocus, setShouldFocus] = useState<boolean>(true);

  const inputRefs = [
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
  ];

  const setInputValue = (index: number, value: number) => {
    setInputs((currInputs) => {
      const newCurrInputs = currInputs.map((input) => ({ ...input }));
      newCurrInputs[index].value = value;
      return newCurrInputs;
    });
  };

  const focusInput = (index: number) => {
    inputRefs[index].current?.focus();
  };

  useEffect(() => {
    if (shouldFocus && inputRefs[0].current) {
      inputRefs[0].current.focus();
      setShouldFocus(false);
    }
  }, [inputRefs, shouldFocus]);

  return {
    inputs: inputs.map((loginItem, index) => ({ ...loginItem, ref: inputRefs[index] })),
    setInputValue,
    focusInput,
  };
};

export default usePinInputs;
