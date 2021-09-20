import { ValidationError } from "../../shared-code/types";
import {
  isArrayValidatorFactory,
  isNumberValidatorFactory,
  isStringValidatorFactory,
  mustExistValidatorFactory,
  validateProperty,
} from "../../shared-code/value-validation";
import { AssetModel, RiskModel } from "../types";

export interface ValidateAssetModelsProps {
  assetModels: AssetModel[];
  errors: Array<ValidationError>;
  baseErrorCode: string;
}

export default function validateAssetModels({
  assetModels,
  errors,
  baseErrorCode,
}: ValidateAssetModelsProps): Array<ValidationError> {
  validateProperty({
    property: "assetModels",
    value: assetModels,
    validators: [
      mustExistValidatorFactory({
        code: `${baseErrorCode}-001`,
      }),
      isArrayValidatorFactory({
        code: `${baseErrorCode}-002`,
        minLength: 1,
      }),
    ],
    errors,
  });

  if (Array.isArray(assetModels)) {
    assetModels.forEach(({ riskModel, erValue, volatility, zScores }, i) => {
      validateProperty({
        property: `assetModel[${i}].riskModel`,
        value: riskModel,
        validators: [
          mustExistValidatorFactory({
            code: `${baseErrorCode}-003`,
          }),
          isStringValidatorFactory({
            code: `${baseErrorCode}-004`,
            validStrings: Object.values(RiskModel),
            verboseErrorMessage: true,
          }),
        ],
        errors,
      });

      validateProperty({
        property: `assetModel[${i}].erValue`,
        value: erValue,
        validators: [
          mustExistValidatorFactory({
            code: `${baseErrorCode}-005`,
          }),
          isNumberValidatorFactory({
            code: `${baseErrorCode}-006`,
          }),
        ],
        errors,
      });

      validateProperty({
        property: `assetModel[${i}].volatility`,
        value: volatility,
        validators: [
          mustExistValidatorFactory({
            code: `${baseErrorCode}-008`,
          }),
          isNumberValidatorFactory({
            code: `${baseErrorCode}-009`,
          }),
        ],
        errors,
      });

      validateProperty({
        property: `assetModel[${i}].zScores`,
        value: zScores,
        validators: [
          mustExistValidatorFactory({
            code: `${baseErrorCode}-011`,
          }),
        ],
        errors,
      });

      if (zScores) {
        const {
          MoreLikelyUB,
          MoreLikelyLB,
          LessLikelyUB,
          LessLikelyLB,
        } = zScores;

        validateProperty({
          property: `assetModel[${i}].zScores.MoreLikelyUB`,
          value: MoreLikelyUB,
          validators: [
            mustExistValidatorFactory({
              code: `${baseErrorCode}-012`,
            }),
            isNumberValidatorFactory({
              code: `${baseErrorCode}-013`,
            }),
          ],
          errors,
        });

        validateProperty({
          property: `assetModel[${i}].zScores.MoreLikelyLB`,
          value: MoreLikelyLB,
          validators: [
            mustExistValidatorFactory({
              code: `${baseErrorCode}-015`,
            }),
            isNumberValidatorFactory({
              code: `${baseErrorCode}-016`,
            }),
          ],
          errors,
        });

        validateProperty({
          property: `assetModel[${i}].zScores.LessLikelyUB`,
          value: LessLikelyUB,
          validators: [
            mustExistValidatorFactory({
              code: `${baseErrorCode}-018`,
            }),
            isNumberValidatorFactory({
              code: `${baseErrorCode}-019`,
            }),
          ],
          errors,
        });

        validateProperty({
          property: `assetModel[${i}].zScores.LessLikelyLB`,
          value: LessLikelyLB,
          validators: [
            mustExistValidatorFactory({
              code: `${baseErrorCode}-021`,
            }),
            isNumberValidatorFactory({
              code: `${baseErrorCode}-022`,
            }),
          ],
          errors,
        });
      }
    });
  }

  return errors;
}
