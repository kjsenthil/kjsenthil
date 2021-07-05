import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { RequestPayload, ProjectionMonth, ValidationError, ResponsePayload, ExpectedReturns, Drawdown } from "./types";

const currentProjectionMain: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let responseBody = {}
    let responseStatus = 200

    try {
        const input: RequestPayload = req.body
        const validationResult = validateInput(input)

        if (validationResult != null && validationResult.length > 0) {
            responseStatus = 400
            responseBody = validationResult;
        }

        else {
            responseBody = getCurrentProjection(input, new Date());
        }

    }
    catch (e) {
        responseBody = { "errorMessage": e.message }
        responseStatus = 400
    }

    context.res = {
        body: responseBody,
        status: responseStatus
    }
}

function getCurrentProjection(inboundPayload: RequestPayload, today: Date): ResponsePayload {

    const preGoalExpectedReturn = calculateExpectedreturn(inboundPayload.preGoalExpectedReturn, inboundPayload.feesPercentage, inboundPayload.preGoalExpectedVolatility);

    const postGoalExpectedReturn = calculateExpectedreturn(inboundPayload.postGoalExpectedReturn, inboundPayload.feesPercentage, inboundPayload.postGoalExpectedVolatility);


    const goalContributingPeriod = monthDiff(today, parseDate(inboundPayload.drawdownStartDate)) - 1;
    const goalDrawdownPeriod = monthDiff(parseDate(inboundPayload.drawdownStartDate), parseDate(inboundPayload.drawdownEndDate)) + 1;

    let drawdown = calculateDrawdown(preGoalExpectedReturn.monthlyNetExpectedReturn, goalContributingPeriod, inboundPayload.portfolioCurrentValue, inboundPayload.upfrontContribution, inboundPayload.monthlyContributions, inboundPayload.desiredAmount, inboundPayload.lumpSumAmount, postGoalExpectedReturn.monthlyNetExpectedReturn, goalDrawdownPeriod, inboundPayload.includeStatePension, inboundPayload.statePensionAmount);

    const currentProjections = Array<ProjectionMonth>();

    const currentProjectionLine = new ProjectionMonth(
        0,
        inboundPayload.portfolioCurrentValue + inboundPayload.upfrontContribution,
        inboundPayload.netContribution + inboundPayload.upfrontContribution,
        inboundPayload.isConeGraph,
        inboundPayload.portfolioCurrentValue + inboundPayload.upfrontContribution,
        inboundPayload.portfolioCurrentValue + inboundPayload.upfrontContribution

    )

    currentProjections.push(currentProjectionLine);

    const response = {} as ResponsePayload;
    response.projectedGoalAgeTotal = drawdown.projectedGoalAgeTotal;
    response.possibleDrawdown = drawdown.possibleDrawdown;
    response.possibleDrawdownWithSP = drawdown.possibleDrawdownsp;

    for (let month = 1; month <= inboundPayload.timeHorizon; month++) {

        //caclulate percentages

        const lowerBoundGoalDrawdownPeriodPercentage: number = calculatePercentage(month, goalContributingPeriod, preGoalExpectedReturn.monthlyNetExpectedReturn, preGoalExpectedReturn.monthlyVolatility, inboundPayload.preGoalZScoreLowerBound, postGoalExpectedReturn.monthlyNetExpectedReturn, postGoalExpectedReturn.monthlyVolatility, inboundPayload.postGoalZScoreLowerBound);

        const averagePercentage: number = calculatePercentage(month, goalContributingPeriod, preGoalExpectedReturn.monthlyNetExpectedReturn, preGoalExpectedReturn.monthlyVolatility, 0, postGoalExpectedReturn.monthlyNetExpectedReturn, postGoalExpectedReturn.monthlyVolatility, 0);

        const upperBoundGoalDrawdownPeriodPercentage: number = calculatePercentage(month, goalContributingPeriod, preGoalExpectedReturn.monthlyNetExpectedReturn, preGoalExpectedReturn.monthlyVolatility, inboundPayload.preGoalZScoreUpperBound, postGoalExpectedReturn.monthlyNetExpectedReturn, postGoalExpectedReturn.monthlyVolatility, inboundPayload.postGoalZScoreUpperBound);

        const previousMonth = currentProjections[currentProjections.length - 1];

        const currentProjectionLine = new ProjectionMonth(
            month,
            calculateProjectionValue(month, goalContributingPeriod, previousMonth.projectedValue, drawdown.possibleDrawdownsp, averagePercentage, inboundPayload.lumpSumAmount, inboundPayload.portfolioCurrentValue, inboundPayload.upfrontContribution, inboundPayload.monthlyContributions),
            calculateContributionLine(previousMonth.contributionLine, month, goalContributingPeriod, drawdown.possibleDrawdown, inboundPayload.lumpSumAmount, inboundPayload.monthlyContributions),
            inboundPayload.isConeGraph,
            calculateProjectionValue(month, goalContributingPeriod, previousMonth.lowerBound, drawdown.possibleDrawdownsp, lowerBoundGoalDrawdownPeriodPercentage, inboundPayload.lumpSumAmount, inboundPayload.portfolioCurrentValue, inboundPayload.upfrontContribution, inboundPayload.monthlyContributions),
            calculateProjectionValue(month, goalContributingPeriod, previousMonth.upperBound, drawdown.possibleDrawdownsp, upperBoundGoalDrawdownPeriodPercentage, inboundPayload.lumpSumAmount, inboundPayload.portfolioCurrentValue, inboundPayload.upfrontContribution, inboundPayload.monthlyContributions)
        )

        currentProjections.push(currentProjectionLine);
        if (month == goalContributingPeriod) {

            const postGoalUnderperformingReturns = ((1 + postGoalExpectedReturn.monthlyNetExpectedReturn) ** goalContributingPeriod + Math.sqrt(goalContributingPeriod) * postGoalExpectedReturn.monthlyVolatility * inboundPayload.postGoalZScoreLowerBound) ** (1 / goalContributingPeriod) - 1;
            const projectedGoalAgeTotalUnderperforming = (inboundPayload.portfolioCurrentValue + inboundPayload.upfrontContribution) * (1 + lowerBoundGoalDrawdownPeriodPercentage) ** month + inboundPayload.monthlyContributions * ((1 - (1 + lowerBoundGoalDrawdownPeriodPercentage) ** month) / (1 - (1 + lowerBoundGoalDrawdownPeriodPercentage)));
            const monthlyCompoundInterestMultiplierUnderperforming = ((1 - (1 + postGoalUnderperformingReturns) ** -goalDrawdownPeriod) / postGoalUnderperformingReturns) * (1 + postGoalUnderperformingReturns);

            const possibleDrawdownUnderperforming = (projectedGoalAgeTotalUnderperforming - inboundPayload.lumpSumAmount - drawdown.remainingAmountAtGoalAge) / monthlyCompoundInterestMultiplierUnderperforming;


            const possibleDrawdownUnderperforming_sp = inboundPayload.includeStatePension ? possibleDrawdownUnderperforming + inboundPayload.statePensionAmount / 12 : possibleDrawdownUnderperforming;

            response.projectedGoalAgeTotalWhenMarketUnderperform = projectedGoalAgeTotalUnderperforming;
            response.possibleDrawdownWhenMarketUnderperform = possibleDrawdownUnderperforming;
            response.possibleDrawdownWhenMarketUnderperformWithSP = possibleDrawdownUnderperforming_sp;
        }
    }

    response.projections = currentProjections;
    return response;
}


function calculateDrawdown(preGoalMonthlyNetExpectedReturn: number, goalContributingPeriod: number, portfolioCurrentValue: number, upfrontContribution: number, monthlyContributions: number, remainingAmount: number, lumpSumAmount: number, postGoalMonthlyNetExpectedReturn: number, goalDrawdownPeriod: number, includeStatePension: boolean, statePensionAmount: number): Drawdown {
    const projectedGoalAgeTotal = calculateProjectedGoalAgeTotal(preGoalMonthlyNetExpectedReturn, goalContributingPeriod, portfolioCurrentValue, upfrontContribution, monthlyContributions);

    const monthlyCompoundInterestMultiplePostGoal = (1 - (1 + postGoalMonthlyNetExpectedReturn) ** -goalDrawdownPeriod) / postGoalMonthlyNetExpectedReturn * (1 + postGoalMonthlyNetExpectedReturn);
    const remainingAmountAtGoalAge = remainingAmount / (1 + postGoalMonthlyNetExpectedReturn) ** goalDrawdownPeriod;
    const possibleDrawdown = (projectedGoalAgeTotal - lumpSumAmount - remainingAmountAtGoalAge) / monthlyCompoundInterestMultiplePostGoal;

    const possibleDrawdownsp = includeStatePension ? possibleDrawdown + statePensionAmount / 12 : possibleDrawdown ;
    return { possibleDrawdownsp, possibleDrawdown, projectedGoalAgeTotal, remainingAmountAtGoalAge };
}

function calculateProjectedGoalAgeTotal(preGoalMonthlyNetExpectedReturn: number, goalContributingPeriod: number, portfolioCurrentValue: number, upfrontContribution: number, monthlyContributions: number) {
    const valueOfCurrentHoldingsAtGoal = (1 + preGoalMonthlyNetExpectedReturn) ** goalContributingPeriod * (portfolioCurrentValue + upfrontContribution);
    const monthlyCompoundInterestMultiplePreGoal = ((1 + preGoalMonthlyNetExpectedReturn) ** goalContributingPeriod - 1) / preGoalMonthlyNetExpectedReturn;
    return valueOfCurrentHoldingsAtGoal + (monthlyContributions * monthlyCompoundInterestMultiplePreGoal);
}

function calculateExpectedreturn(expectedReturn: number, feesPercentage: number, expectedVolatility: number): ExpectedReturns {
    const annualNetExpectedReturn = expectedReturn - feesPercentage;
    const monthlyNetExpectedReturn = ((1 + annualNetExpectedReturn) ** (1 / 12)) - 1;
    const monthlyVolatility = expectedVolatility / Math.sqrt(12);
    return { monthlyNetExpectedReturn, monthlyVolatility };
}

function calculateContributionLine(previousMonthcontributionLine: number, month: number, goalContributingPeriod: number, possibleDrawdown: number, lumpSumAmount: number, monthlyContributions: number) {
    if (previousMonthcontributionLine <= 0) {
        return 0;
    }

    if (month > goalContributingPeriod) {
        return previousMonthcontributionLine - possibleDrawdown;
    }

    else if (month == goalContributingPeriod) {
        return previousMonthcontributionLine - possibleDrawdown - lumpSumAmount;
    }
    else {
        return previousMonthcontributionLine + monthlyContributions;
    }
}

function calculateProjectionValue(month: number, goalContributingPeriod: number, previousMonthProjectedValue: number, possibleDrawdownsp: number, percentage: number, lumpSumAmount: number, portfolioCurrentValue: number, upfrontContribution: number, monthlyContributions: number) {
    if (previousMonthProjectedValue <= 0) {
        return 0;
    }

    if (month > goalContributingPeriod) {
        return (previousMonthProjectedValue - possibleDrawdownsp) * (1 + percentage);
    }
    else if (month == goalContributingPeriod) {
        return (previousMonthProjectedValue - lumpSumAmount - possibleDrawdownsp) * (1 + percentage);
    }
    return (portfolioCurrentValue + upfrontContribution) * (1 + percentage) ** month + monthlyContributions * ((1 - (1 + percentage) ** month) / (1 - (1 + percentage)));
}


function calculatePercentage(month: number, goalContributingPeriod: number, preGoalMonthlyNetExpectedReturn: number, preGoalMonthlyVolatility: number, preGoalZScore: number, postGoalMonthlyNetExpectedReturn: number, postGoalMonthlyVolatility: number, postGoalZScore: number): number {
    if (month <= goalContributingPeriod) {
        return ((1 + preGoalMonthlyNetExpectedReturn) ** month + Math.sqrt(month) * preGoalMonthlyVolatility * preGoalZScore) ** (1 / month) - 1;
    }
    return ((1 + postGoalMonthlyNetExpectedReturn) ** month + Math.sqrt(month) * postGoalMonthlyVolatility * postGoalZScore) ** (1 / month) - 1;
}

function monthDiff(dateFrom: Date, dateTo: Date) {
    const years = yearDiff(dateFrom, dateTo);
    let months = (years * 12) + (dateTo.getMonth() - dateFrom.getMonth());
    const diffDays = dateTo.getDate() - dateFrom.getDate();
    if (diffDays < 0) {
        months--;
    }

    return Math.abs(Math.round(months));
}

function parseDate(date: string): Date {
    return new Date(Date.parse(date))
}

function yearDiff(dateFrom: Date, dateTo: Date) {
    return dateTo.getFullYear() - dateFrom.getFullYear();
}

function calculateZscore(upperConfidenceLevel: number, expectedReturn: number, expectedVolatility: number) {
    return (upperConfidenceLevel - expectedReturn) / expectedVolatility
}


function validateInput(inboundPayload: RequestPayload): ValidationError[] {
    let errors = Array<ValidationError>();

    if (typeof inboundPayload.timeHorizon == 'undefined' || inboundPayload.timeHorizon <= 0) {
        const error: ValidationError = {
            code: "val-currentproj-001",
            property: "timeHorizon",
            message: "timeHorizon_must_be_more_than_zero"
        }
        errors.push(error);
    }

    if (typeof inboundPayload.preGoalRiskModel == 'undefined' || inboundPayload.preGoalRiskModel.trim() === "") {
        const error: ValidationError = {
            code: "val-currentproj-002",
            property: "preGoalRiskModel",
            message: "preGoalRiskModel_must_not_be_empty"
        }
        errors.push(error);
    }

    if (typeof inboundPayload.monthlyContributions == 'undefined' || inboundPayload.monthlyContributions < 0) {
        const error: ValidationError = {
            code: "val-currentproj-003",
            property: "monthlyContributions",
            message: "monthlyContributions_must_be_a_positive_number_or_zero",
        }
        errors.push(error)
    }

    if (typeof inboundPayload.portfolioCurrentValue == 'undefined' || inboundPayload.portfolioCurrentValue < 0) {
        const error: ValidationError = {
            code: "val-currentproj-004",
            property: "portfolioCurrentValue",
            message: "portfolioCurrentValue_must_be_a_positive_number_or_zero",
        }
        errors.push(error)
    }

    if (typeof inboundPayload.desiredMonthlyDrawdown == 'undefined' || inboundPayload.desiredMonthlyDrawdown < 0) {
        const error: ValidationError = {
            code: "val-currentproj-005",
            property: "desiredMonthlyDrawdown",
            message: "desiredMonthlyDrawdown_must_be_a_positive_number_or_zero",
        }
        errors.push(error)
    }

    if (typeof inboundPayload.drawdownStartDate == 'undefined' || !Date.parse(inboundPayload.drawdownStartDate)) {
        const error: ValidationError = {
            code: "val-currentproj-006",
            property: "drawdownStartDate",
            message: "drawdownStartDate_must_be_a_valid_date",
        }
        errors.push(error)
    }

    if (typeof inboundPayload.drawdownEndDate == 'undefined' || !Date.parse(inboundPayload.drawdownEndDate)) {
        const error: ValidationError = {
            code: "val-currentproj-007",
            property: "drawdownEndDate",
            message: "drawdownEndDate_must_be_a_valid_date",
        }
        errors.push(error)
    }

    if (Date.parse(inboundPayload.drawdownStartDate) > 0 && parseDate(inboundPayload.drawdownEndDate) < parseDate(inboundPayload.drawdownStartDate)) {
        const error: ValidationError = {
            code: "val-currentproj-008",
            property: "drawdownEndDate",
            message: "drawdownEndDate_must_be_later_than_start_date",
        }
        errors.push(error)
    }


    if (typeof inboundPayload.upfrontContribution == 'undefined' || inboundPayload.upfrontContribution < 0) {
        const error: ValidationError = {
            code: "val-currentproj-009",
            property: "upfrontContribution",
            message: "upfrontContribution_must_be_a_positive_number_or_zero",
        }
        errors.push(error)
    }

    if (typeof inboundPayload.preGoalExpectedReturn == 'undefined') {
        const error: ValidationError = {
            code: "val-currentproj-011",
            property: "preGoalExpectedReturn",
            message: "preGoalExpectedReturn_must_be_a_valid_number",
        }
        errors.push(error)
    }

    if (typeof inboundPayload.preGoalExpectedVolatility == 'undefined') {
        const error: ValidationError = {
            code: "val-currentproj-012",
            property: "preGoalExpectedVolatility",
            message: "preGoalExpectedVolatility_must_be_a_valid_number",
        }
        errors.push(error)
    }

    if (typeof inboundPayload.preGoalZScoreLowerBound == 'undefined') {
        const error: ValidationError = {
            code: "val-currentproj-013",
            property: "preGoalZScoreLowerBound",
            message: "preGoalZScoreLowerBound_must_be_a_valid_number",
        }
        errors.push(error)
    }

    if (typeof inboundPayload.preGoalZScoreUpperBound == 'undefined') {
        const error: ValidationError = {
            code: "val-currentproj-014",
            property: "preGoalZScoreUpperBound",
            message: "preGoalZScoreUpperBound_must_be_a_valid_number",
        }
        errors.push(error)
    }


    if (typeof inboundPayload.feesPercentage == 'undefined' || inboundPayload.feesPercentage < 0) {
        const error: ValidationError = {
            code: "val-currentproj-015",
            property: "feesPercentage",
            message: "feesPercentage_must_be_a_positive_number_or_zero",
        }
        errors.push(error)
    }

    if (typeof inboundPayload.postGoalRiskModel == 'undefined' || inboundPayload.postGoalRiskModel.trim() === "") {
        const error: ValidationError = {
            code: "val-currentproj-016",
            property: "postGoalRiskModel",
            message: "postGoalRiskModel_must_not_be_empty",
        }
        errors.push(error)
    }
    if (typeof inboundPayload.postGoalExpectedReturn == 'undefined') {
        const error: ValidationError = {
            code: "val-currentproj-017",
            property: "postGoalExpectedReturn",
            message: "postGoalExpectedReturn_must_be_a_valid_number",
        }
        errors.push(error)
    }

    if (typeof inboundPayload.postGoalExpectedVolatility == 'undefined') {
        const error: ValidationError = {
            code: "val-currentproj-018",
            property: "postGoalExpectedVolatility",
            message: "postGoalExpectedVolatility_must_be_a_valid_number",
        }
        errors.push(error)
    }

    if (typeof inboundPayload.postGoalZScoreLowerBound == 'undefined') {
        const error: ValidationError = {
            code: "val-currentproj-019",
            property: "postGoalZScoreLowerBound",
            message: "postGoalZScoreLowerBound_must_be_a_valid_number",
        }
        errors.push(error)
    }

    if (typeof inboundPayload.postGoalZScoreUpperBound == 'undefined') {
        const error: ValidationError = {
            code: "val-currentproj-020",
            property: "postGoalZScoreUpperBound",
            message: "postGoalZScoreUpperBound_must_be_a_valid_number",
        }
        errors.push(error)
    }


    if (typeof inboundPayload.lumpSumAmount == 'undefined' || inboundPayload.lumpSumAmount < 0) {
        const error: ValidationError = {
            code: "val-currentproj-021",
            property: "lumpSumAmount",
            message: "lumpSumAmount_must_be_a_positive_number_or_zero",
        }
        errors.push(error)
    }

    if (typeof inboundPayload.statePensionAmount == 'undefined' || inboundPayload.statePensionAmount < 0) {
        const error: ValidationError = {
            code: "val-currentproj-022",
            property: "statePensionAmount",
            message: "statePensionAmount_must_be_a_positive_number_or_zero",
        }
        errors.push(error)
    }
    if (typeof inboundPayload.desiredAmount == 'undefined' || inboundPayload.desiredAmount < 0) {
        const error: ValidationError = {
            code: "val-currentproj-023",
            property: "desiredAmount",
            message: "desiredAmount_must_be_a_positive_number_or_zero",
        }
        errors.push(error)
    }

    if (typeof inboundPayload.netContribution == 'undefined' || inboundPayload.netContribution < 0) {
        const error: ValidationError = {
            code: "val-currentproj-024",
            property: "netContribution",
            message: "netContribution_must_be_a_positive_number_or_zero",
        }
        errors.push(error)
    }

    if (typeof inboundPayload.isConeGraph == 'undefined') {
        const error: ValidationError = {
            code: "val-currentproj-025",
            property: "isConeGraph",
            message: "isConeGraph_must_be_a_valid_boolean_value",
        }
        errors.push(error)
    }

    if (typeof inboundPayload.includeStatePension == 'undefined') {
        const error: ValidationError = {
            code: "val-currentproj-026",
            property: "includeStatePension",
            message: "includeStatePension_must_be_a_valid_boolean_value",
        }
        errors.push(error)
    }

    return errors;
}

export { currentProjectionMain, getCurrentProjection, calculateDrawdown, validateInput, monthDiff, yearDiff, calculateZscore, calculatePercentage, calculateProjectionValue, calculateContributionLine, calculateExpectedreturn }
