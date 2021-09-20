import { RequestPayload } from "../types";
import isObject from "../../shared-code/is-object/is-object";
import { ValidationError } from "../../shared-code/types";
import {
  isBooleanValidatorFactory,
  isDateStringValidatorFactory,
  isNumberValidatorFactory,
  isObjectValidatorFactory,
  isStringValidatorFactory,
  mustExistValidatorFactory,
  validateProperty,
} from "../../shared-code/value-validation";
import validateAssetModels from "./validate-asset-models";
import { DrawdownType } from "../../simulate-projection/types";

export interface ValidateInboundPayloadProps {
  inboundPayload: RequestPayload;
  errors: ValidationError[];
}

const BASE_ERROR_CODE = "val-goalriskprofile";

export default function validateInboundPayload({
  inboundPayload,
  errors,
}: ValidateInboundPayloadProps) {
  if (!isObject(inboundPayload)) {
    const error: ValidationError = {
      code: `${BASE_ERROR_CODE}-500`,
      property: "requestPayload",
      message: "requestPayload_must_be_an_object",
    };
    errors.push(error);
  }

  const {
    assetModels,
    timeHorizonToProject,
    feesPercentage,
    upfrontContribution,
    monthlyContribution,
    currentNetContribution,
    currentPortfolioValue,
    includeGoal,
    drawdownType,
    drawdownRetirement,
  } = inboundPayload;

  // ----- Asset models ----- //

  validateAssetModels({
    assetModels,
    errors,
    baseErrorCode: BASE_ERROR_CODE,
  });

  // ----- Other properties ----- //

  validateProperty({
    property: "timeHorizonToProject",
    value: timeHorizonToProject,
    validators: [
      mustExistValidatorFactory({
        code: `${BASE_ERROR_CODE}-100`,
      }),
      isNumberValidatorFactory({
        code: `${BASE_ERROR_CODE}-101`,
        min: 0,
      }),
    ],
    errors,
  });

  validateProperty({
    property: "feesPercentage",
    value: feesPercentage,
    optional: true,
    validators: [
      isNumberValidatorFactory({
        code: `${BASE_ERROR_CODE}-111`,
        min: 0,
        max: 100,
      }),
    ],
    errors,
  });

  validateProperty({
    property: "upfrontContribution",
    value: upfrontContribution,
    optional: true,
    validators: [
      isNumberValidatorFactory({
        code: `${BASE_ERROR_CODE}-121`,
        min: 0,
      }),
    ],
    errors,
  });

  validateProperty({
    property: "monthlyContribution",
    value: monthlyContribution,
    validators: [
      mustExistValidatorFactory({
        code: `${BASE_ERROR_CODE}-130`,
      }),
      isNumberValidatorFactory({
        code: `${BASE_ERROR_CODE}-131`,
        min: 0,
      }),
    ],
    errors,
  });

  validateProperty({
    property: "currentNetContribution",
    value: currentNetContribution,
    validators: [
      mustExistValidatorFactory({
        code: `${BASE_ERROR_CODE}-140`,
      }),
      isNumberValidatorFactory({
        code: `${BASE_ERROR_CODE}-141`,
        min: 0,
      }),
    ],
    errors,
  });

  validateProperty({
    property: "currentPortfolioValue",
    value: currentPortfolioValue,
    validators: [
      mustExistValidatorFactory({
        code: `${BASE_ERROR_CODE}-150`,
      }),
      isNumberValidatorFactory({
        code: `${BASE_ERROR_CODE}-151`,
        min: 0,
      }),
    ],
    errors,
  });

  validateProperty({
    property: "includeGoal",
    value: includeGoal,
    validators: [
      mustExistValidatorFactory({
        code: `${BASE_ERROR_CODE}-160`,
      }),
      isBooleanValidatorFactory({
        code: `${BASE_ERROR_CODE}-161`,
      }),
    ],
    errors,
  });

  validateProperty({
    property: "drawdownType",
    value: drawdownType,
    optional: true,
    validators: [
      isStringValidatorFactory({
        code: `${BASE_ERROR_CODE}-171`,
        validStrings: Object.values(DrawdownType),
        verboseErrorMessage: true,
      }),
    ],
    errors,
  });

  // ----- Drawdown: Retirement ----- //

  validateProperty({
    property: "drawdownRetirement",
    value: drawdownRetirement,
    optional: true,
    validators: [
      isObjectValidatorFactory({
        code: `${BASE_ERROR_CODE}-200`,
      }),
    ],
    errors,
  });

  if (drawdownRetirement) {
    validateProperty({
      property: "drawdownRetirement.lumpSum",
      value: drawdownRetirement.lumpSum,
      optional: true,
      validators: [
        mustExistValidatorFactory({
          code: `${BASE_ERROR_CODE}-201`,
        }),
        isNumberValidatorFactory({
          code: `${BASE_ERROR_CODE}-202`,
          min: 0,
        }),
      ],
      errors,
    });

    validateProperty({
      property: "drawdownRetirement.regularDrawdown",
      value: drawdownRetirement.regularDrawdown,
      validators: [
        mustExistValidatorFactory({
          code: `${BASE_ERROR_CODE}-203`,
        }),
        isNumberValidatorFactory({
          code: `${BASE_ERROR_CODE}-204`,
          min: 0,
        }),
      ],
      errors,
    });

    validateProperty({
      property: "drawdownRetirement.startDate",
      value: drawdownRetirement.startDate,
      validators: [
        mustExistValidatorFactory({
          code: `${BASE_ERROR_CODE}-203`,
        }),
        isDateStringValidatorFactory({
          code: `${BASE_ERROR_CODE}-204`,
        }),
      ],
      errors,
    });

    validateProperty({
      property: "drawdownRetirement.endDate",
      value: drawdownRetirement.endDate,
      validators: [
        mustExistValidatorFactory({
          code: `${BASE_ERROR_CODE}-205`,
        }),
        isDateStringValidatorFactory({
          code: `${BASE_ERROR_CODE}-206`,
        }),
      ],
      errors,
    });

    validateProperty({
      property: "drawdownRetirement.remainingAmount",
      value: drawdownRetirement.remainingAmount,
      optional: true,
      validators: [
        isNumberValidatorFactory({
          code: `${BASE_ERROR_CODE}-207`,
          min: 0,
        }),
      ],
      errors,
    });

    validateProperty({
      property: "drawdownRetirement.statePensionAmount",
      value: drawdownRetirement.statePensionAmount,
      optional: true,
      validators: [
        isNumberValidatorFactory({
          code: `${BASE_ERROR_CODE}-208`,
          min: 0,
        }),
      ],
      errors,
    });

    validateProperty({
      property: "drawdownRetirement.lumpSum",
      value: drawdownRetirement.lumpSum,
      optional: true,
      validators: [
        isObjectValidatorFactory({
          code: `${BASE_ERROR_CODE}-210`,
        }),
      ],
      errors,
    });

    if (drawdownRetirement.lumpSum) {
      validateProperty({
        property: "drawdownRetirement.lumpSum.amount",
        value: drawdownRetirement.lumpSum.amount,
        optional: true,
        validators: [
          isNumberValidatorFactory({
            code: `${BASE_ERROR_CODE}-211`,
          }),
        ],
        errors,
      });

      validateProperty({
        property: "drawdownRetirement.lumpSum.date",
        value: drawdownRetirement.lumpSum.date,
        optional: true,
        validators: [
          isDateStringValidatorFactory({
            code: `${BASE_ERROR_CODE}-212`,
          }),
        ],
        errors,
      });
    }
  }

  // TODO: include validations for
  //  - drawdownOneOff
  //  - drawdownMonthly
  //  - drawdownAnnually
  //  When they are implemented. Currently only drawdownRetirement is implemented

  return errors;
}
