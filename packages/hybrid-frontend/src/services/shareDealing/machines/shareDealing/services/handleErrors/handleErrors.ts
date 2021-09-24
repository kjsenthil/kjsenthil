import axios from 'axios';
import { ShareDealingContext } from '../../types';

export type HandleErrorsReturn<T = unknown> =
  | {
      errors: undefined;
      response: T;
    }
  | {
      errors: ShareDealingContext['errors'];
      response: undefined;
    };

const handleErrors = async <T>(service: () => Promise<T>): Promise<HandleErrorsReturn<T>> => {
  try {
    return {
      response: await service(),
      errors: undefined,
    };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const apiErrors = e.response?.data?.Errors;

      if (e.response?.status === 500) {
        const errors = { fatal: e.response };
        return { errors, response: undefined };
      }

      if (e.response?.status === 400 && Array.isArray(apiErrors)) {
        const errors: ShareDealingContext['errors'] = {
          original: apiErrors.reduce<Record<string, string>>(
            (obj, { Code, Detail }) => ({ ...obj, [Code]: Detail }),
            {}
          ),
        };

        apiErrors.forEach(({ Code }) => {
          switch (Code) {
            case 'Amount_ToInvest_Exceeds':
            case 'Buy_Minimum_Holding':
            case 'Sell_Minimum_Holding':
            case 'Invalid_BuyPrice':
            case 'Invalid_SellPrice':
            case 'Amount_GreaterThanAvailable':
              errors.orderShareAmount = Code;
              break;
            case 'Minimum_Increment':
            case 'Minimum_Redemption':
            case 'Units_GreaterThanAvailable':
              errors.orderShareUnits = Code;
              break;
            case 'Invalid_LimitPrice':
              errors.limitOrderChangeInPrice = Code;
              break;
            case 'Invalid_LimitOrder_CalendarDaysToExpiry':
              errors.limitOrderExpiryDays = Code;
              break;
            case 'Asset_Trading_NotAllowed':
            case 'Mass_Quote_Acknowledgement':
            case 'Market_Closed':
            case 'Quote_Expired':
              errors.quotingOrder = Code;
              break;
            default:
          }
        });

        return { errors, response: undefined };
      }
    }

    throw e;
  }
};

export default handleErrors;
