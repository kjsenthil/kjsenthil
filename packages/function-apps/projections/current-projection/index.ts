import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Drawdown, ExpectedReturns, ProjectionMonth, RequestPayload, ResponsePayload, Stats, ValidationError } from "./types";

const currentProjection: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let responseBody: {}
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
    //if no lumpsum date is passed assume that as drawdown start date
    if (inboundPayload.lumpSumDate == undefined)
        inboundPayload.lumpSumDate = inboundPayload.drawdownStartDate;

    let contributionPeriodUptoLumpSum = monthDiff(today, parseDate(inboundPayload.lumpSumDate)) - 1;
    contributionPeriodUptoLumpSum = contributionPeriodUptoLumpSum < 0 ? 0 : contributionPeriodUptoLumpSum;
    let goalContributingPeriod = monthDiff(today, parseDate(inboundPayload.drawdownStartDate)) - 1;
    goalContributingPeriod = goalContributingPeriod < 0 ? 0 : goalContributingPeriod;

    const contributionPeriodFromLumpSumAndDrawdown = (contributionPeriodUptoLumpSum == 0) ? goalContributingPeriod : monthDiff(parseDate(inboundPayload.lumpSumDate), parseDate(inboundPayload.drawdownStartDate));

    const preGoalExpectedReturn = calculateExpectedReturn(inboundPayload.preGoalExpectedReturn, inboundPayload.feesPercentage, inboundPayload.preGoalExpectedVolatility);
    const postGoalExpectedReturn = calculateExpectedReturn(inboundPayload.postGoalExpectedReturn, inboundPayload.feesPercentage, inboundPayload.postGoalExpectedVolatility);

    const goalDrawdownPeriod = goalContributingPeriod == 0
        ? monthDiff(today, parseDate(inboundPayload.drawdownEndDate))
        : monthDiff(parseDate(inboundPayload.drawdownStartDate), parseDate(inboundPayload.drawdownEndDate)) + 1;

    const goalTargetMonth = goalContributingPeriod + goalDrawdownPeriod + 1;


    const drawdown = calculateDrawdown(preGoalExpectedReturn.monthlyNetExpectedReturn, goalContributingPeriod, inboundPayload.portfolioCurrentValue, inboundPayload.upfrontContribution, inboundPayload.monthlyContributions, inboundPayload.desiredAmount, inboundPayload.lumpSumAmount, postGoalExpectedReturn.monthlyNetExpectedReturn, goalDrawdownPeriod, inboundPayload.includeStatePension, inboundPayload.statePensionAmount);

    let stats = {} as Stats;
    if (inboundPayload.includeStatePension) {
        stats = calculateHoldingsWithOnTrackPercentage(inboundPayload.timeHorizon, inboundPayload.lumpSumAmount, inboundPayload.desiredAmount, inboundPayload.desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, inboundPayload.monthlyContributions, inboundPayload.portfolioCurrentValue, inboundPayload.upfrontContribution, preGoalExpectedReturn, postGoalExpectedReturn, 0, 0, inboundPayload.includeStatePension, inboundPayload.statePensionAmount);
    }
    else {
        stats = calculateHoldingsWithOnTrackPercentage(inboundPayload.timeHorizon, inboundPayload.lumpSumAmount, inboundPayload.desiredAmount, inboundPayload.desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, inboundPayload.monthlyContributions, inboundPayload.portfolioCurrentValue, inboundPayload.upfrontContribution, preGoalExpectedReturn, postGoalExpectedReturn, 0, 0, inboundPayload.includeStatePension, inboundPayload.statePensionAmount);
    }
    stats.projectedGoalAgeTotal = drawdown.projectedGoalAgeTotal;
    stats.possibleDrawdown = drawdown.possibleDrawdown;

    const currentProjections = calculateProjection(inboundPayload, goalContributingPeriod, preGoalExpectedReturn, postGoalExpectedReturn, stats, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth);


    //when market underperform
    let marketUnderperformStats = {} as Stats;

    if (inboundPayload.includeStatePension) {
        marketUnderperformStats = calculateHoldingsWithOnTrackPercentage(inboundPayload.timeHorizon, inboundPayload.lumpSumAmount, inboundPayload.desiredAmount, inboundPayload.desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, inboundPayload.monthlyContributions, inboundPayload.portfolioCurrentValue, inboundPayload.upfrontContribution, preGoalExpectedReturn, postGoalExpectedReturn, inboundPayload.preGoalZScoreLowerBound, inboundPayload.postGoalZScoreLowerBound, inboundPayload.includeStatePension, inboundPayload.statePensionAmount);
    }
    else {
        marketUnderperformStats = calculateHoldingsWithOnTrackPercentage(inboundPayload.timeHorizon, inboundPayload.lumpSumAmount, inboundPayload.desiredAmount, inboundPayload.desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, inboundPayload.monthlyContributions, inboundPayload.portfolioCurrentValue, inboundPayload.upfrontContribution, preGoalExpectedReturn, postGoalExpectedReturn, inboundPayload.preGoalZScoreLowerBound, inboundPayload.postGoalZScoreLowerBound, inboundPayload.includeStatePension, inboundPayload.statePensionAmount);
    }
    // end market underperform
    return { ...stats, marketUnderperform: marketUnderperformStats, projections: currentProjections } as ResponsePayload;
}


function calculateProjection(inboundPayload: RequestPayload, goalContributingPeriod: number, preGoalExpectedReturn: ExpectedReturns, postGoalExpectedReturn: ExpectedReturns, response: Stats, contributionPeriodUptoLumpSum: number, contributionPeriodFromLumpSumAndDrawdown: number, goalTargetMonth: number): Array<ProjectionMonth> {
    const currentProjections = Array<ProjectionMonth>();
    const currentProjectionLine = new ProjectionMonth(
        0,
        inboundPayload.portfolioCurrentValue + inboundPayload.upfrontContribution,
        inboundPayload.netContribution + inboundPayload.upfrontContribution,
        inboundPayload.isConeGraph,
        inboundPayload.portfolioCurrentValue + inboundPayload.upfrontContribution,
        inboundPayload.portfolioCurrentValue + inboundPayload.upfrontContribution
    );
    currentProjections.push(currentProjectionLine);

    for (let month = 1; month <= inboundPayload.timeHorizon; month++) {

        //caclulate percentages
        const lowerBoundGoalDrawdownPeriodPercentage: number = calculatePercentage(month, goalContributingPeriod, preGoalExpectedReturn.monthlyNetExpectedReturn, preGoalExpectedReturn.monthlyVolatility, inboundPayload.preGoalZScoreLowerBound, postGoalExpectedReturn.monthlyNetExpectedReturn, postGoalExpectedReturn.monthlyVolatility, inboundPayload.postGoalZScoreLowerBound);

        const averagePercentage: number = calculatePercentage(month, goalContributingPeriod, preGoalExpectedReturn.monthlyNetExpectedReturn, preGoalExpectedReturn.monthlyVolatility, 0, postGoalExpectedReturn.monthlyNetExpectedReturn, postGoalExpectedReturn.monthlyVolatility, 0);

        const upperBoundGoalDrawdownPeriodPercentage: number = calculatePercentage(month, goalContributingPeriod, preGoalExpectedReturn.monthlyNetExpectedReturn, preGoalExpectedReturn.monthlyVolatility, inboundPayload.preGoalZScoreUpperBound, postGoalExpectedReturn.monthlyNetExpectedReturn, postGoalExpectedReturn.monthlyVolatility, inboundPayload.postGoalZScoreUpperBound);

        const previousMonth = currentProjections[currentProjections.length - 1];

        const currentProjectionLine = new ProjectionMonth(
            month,
            calculateProjectionValue(month, previousMonth.projectedValue, averagePercentage, inboundPayload.portfolioCurrentValue, inboundPayload.upfrontContribution, inboundPayload.monthlyContributions, response.affordableLumpSum, response.affordableRemainingAmount, response.affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, (month > contributionPeriodUptoLumpSum + 1) ? currentProjections[contributionPeriodUptoLumpSum + 1].projectedValue : 0),
            calculateContributionLine(month, previousMonth.contributionLine, inboundPayload.monthlyContributions, goalTargetMonth, response.affordableLumpSum, response.affordableRemainingAmount, response.affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown),
            inboundPayload.isConeGraph,
            calculateProjectionValue(month, previousMonth.lowerBound, lowerBoundGoalDrawdownPeriodPercentage, inboundPayload.portfolioCurrentValue, inboundPayload.upfrontContribution, inboundPayload.monthlyContributions, response.affordableLumpSum, response.affordableRemainingAmount, response.affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, (month > contributionPeriodUptoLumpSum + 1) ? currentProjections[contributionPeriodUptoLumpSum + 1].lowerBound : 0),
            calculateProjectionValue(month, previousMonth.upperBound, upperBoundGoalDrawdownPeriodPercentage, inboundPayload.portfolioCurrentValue, inboundPayload.upfrontContribution, inboundPayload.monthlyContributions, response.affordableLumpSum, response.affordableRemainingAmount, response.affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, (month > contributionPeriodUptoLumpSum + 1) ? currentProjections[contributionPeriodUptoLumpSum + 1].upperBound : 0, true)
        );

        currentProjections.push(currentProjectionLine);
    }
    return currentProjections;
}


function calculateDrawdown(preGoalMonthlyNetExpectedReturn: number, goalContributingPeriod: number, portfolioCurrentValue: number, upfrontContribution: number, monthlyContributions: number, remainingAmount: number, lumpSumAmount: number, postGoalMonthlyNetExpectedReturn: number, goalDrawdownPeriod: number, includeStatePension: boolean, statePensionAmount: number): Drawdown {
    const projectedGoalAgeTotal = calculateProjectedGoalAgeTotal(preGoalMonthlyNetExpectedReturn, goalContributingPeriod, portfolioCurrentValue, upfrontContribution, monthlyContributions);

    const monthlyCompoundInterestMultiplePostGoal = (1 - (1 + postGoalMonthlyNetExpectedReturn) ** -goalDrawdownPeriod) / postGoalMonthlyNetExpectedReturn * (1 + postGoalMonthlyNetExpectedReturn);
    const remainingAmountAtGoalAge = remainingAmount / (1 + postGoalMonthlyNetExpectedReturn) ** goalDrawdownPeriod;
    const possibleDrawdown = (projectedGoalAgeTotal - lumpSumAmount - remainingAmountAtGoalAge) / monthlyCompoundInterestMultiplePostGoal;

    const possibleDrawdownsp = includeStatePension ? possibleDrawdown + statePensionAmount / 12 : possibleDrawdown;
    return { possibleDrawdown: possibleDrawdownsp, projectedGoalAgeTotal, remainingAmountAtGoalAge };
}

function calculateProjectedGoalAgeTotal(preGoalMonthlyNetExpectedReturn: number, goalContributingPeriod: number, portfolioCurrentValue: number, upfrontContribution: number, monthlyContributions: number) {
    const valueOfCurrentHoldingsAtGoal = (1 + preGoalMonthlyNetExpectedReturn) ** goalContributingPeriod * (portfolioCurrentValue + upfrontContribution);
    const monthlyCompoundInterestMultiplePreGoal = ((1 + preGoalMonthlyNetExpectedReturn) ** goalContributingPeriod - 1) / preGoalMonthlyNetExpectedReturn;
    return valueOfCurrentHoldingsAtGoal + (monthlyContributions * monthlyCompoundInterestMultiplePreGoal);
}

function calculateExpectedReturn(expectedReturn: number, feesPercentage: number, expectedVolatility: number): ExpectedReturns {
    const annualNetExpectedReturn = expectedReturn - feesPercentage;
    const monthlyNetExpectedReturn = ((1 + annualNetExpectedReturn) ** (1 / 12)) - 1;
    const monthlyVolatility = expectedVolatility / Math.sqrt(12);
    return { monthlyNetExpectedReturn, monthlyVolatility };
}

function calculateHoldingsWithOnTrackPercentage(timeHorizon: number, lumpSumAmount: number, desiredAmount: number, desiredMonthlyDrawdown: number, contributionPeriodUptoLumpSum: number, contributionPeriodFromLumpSumAndDrawdown: number, goalDrawdownPeriod: number, goalTargetMonth: number, monthlyContributions: number, portfolioCurrentValue: number, upfrontContribution: number, preGoalExpectedReturn: ExpectedReturns, postGoalExpectedReturn: ExpectedReturns, preGoalZScore: number, postGoalZScore: number, includeStatePension: boolean, statePensionAmount: number): Stats {
    let iterationCounter: number = 0;
    const maxIterations = 1000;
    const lowerGuessOntrackPercentage = 0;
    const upperGuessOntrackPercentage = 100;
    function calculateHoldingsWithOnTrackPercentage(timeHorizon: number, lumpSumAmount: number, desiredAmount: number, desiredMonthlyDrawdown: number, contributionPeriodUptoLumpSum: number, contributionPeriodFromLumpSumAndDrawdown: number, goalDrawdownPeriod: number, goalTargetMonth: number, monthlyContributions: number, portfolioCurrentValue: number, upfrontContribution: number, preGoalExpectedReturn: ExpectedReturns, postGoalExpectedReturn: ExpectedReturns, preGoalZScore: number, postGoalZScore: number, lowerGuessOntrackPercentage: number, upperGuessOntrackPercentage: number, maxIterations: number, includeStatePension: boolean, statePensionAmount: number): Stats {
        const guessOntrackPercentage = ((upperGuessOntrackPercentage + lowerGuessOntrackPercentage) / 2) / 100

        const desiredMonthlyDrawdownWithStatePension = includeStatePension ? desiredMonthlyDrawdown - (statePensionAmount / 12) : desiredMonthlyDrawdown;
        const affordableDrawdown = desiredMonthlyDrawdownWithStatePension * guessOntrackPercentage;
        const affordableLumpSum = lumpSumAmount * guessOntrackPercentage;
        const affordableRemainingAmount = desiredAmount * guessOntrackPercentage;
        const desiredOutflow = includeStatePension ? desiredAmount + lumpSumAmount + desiredMonthlyDrawdownWithStatePension * goalDrawdownPeriod : desiredMonthlyDrawdownWithStatePension * goalDrawdownPeriod + lumpSumAmount + desiredAmount;
        const affordableOutflow = includeStatePension ? affordableRemainingAmount + affordableLumpSum + affordableDrawdown * goalDrawdownPeriod : desiredOutflow * guessOntrackPercentage;

        const surplusOrShortfall = desiredOutflow - affordableOutflow;
        let previousMonthHoldingAmount = portfolioCurrentValue + upfrontContribution;
        let holdingAmountOnLumpSumDate = 0;
        let valueAtRetirement = 0;
        for (let month = 1; month <= timeHorizon; month++) {
            const percentage = calculatePercentage(month, contributionPeriodUptoLumpSum + contributionPeriodFromLumpSumAndDrawdown, preGoalExpectedReturn.monthlyNetExpectedReturn, preGoalExpectedReturn.monthlyVolatility, preGoalZScore, postGoalExpectedReturn.monthlyNetExpectedReturn, postGoalExpectedReturn.monthlyVolatility, postGoalZScore);
            const holdingAmount = calculateHolding(month, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, previousMonthHoldingAmount, monthlyContributions, portfolioCurrentValue, upfrontContribution, affordableDrawdown, percentage, affordableLumpSum, affordableRemainingAmount, holdingAmountOnLumpSumDate)
            if (month == goalTargetMonth) {
                if (round(holdingAmount, 0) != 0) {
                    //keep counting itegration and exit if it has over the limit to avoid infinite loop.
                    ++iterationCounter;
                    if (iterationCounter >= maxIterations)
                        throw new Error("Maximum iterations reached while calculating on track percentage");

                    if (holdingAmount > 0) {
                        lowerGuessOntrackPercentage = guessOntrackPercentage * 100;
                    }

                    if (holdingAmount < 0) {
                        upperGuessOntrackPercentage = guessOntrackPercentage * 100;
                    }
                    if (lowerGuessOntrackPercentage == upperGuessOntrackPercentage) {
                        upperGuessOntrackPercentage = upperGuessOntrackPercentage * 2;
                    }

                    return calculateHoldingsWithOnTrackPercentage(timeHorizon, lumpSumAmount, desiredAmount, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, monthlyContributions, portfolioCurrentValue, upfrontContribution, preGoalExpectedReturn, postGoalExpectedReturn, preGoalZScore, postGoalZScore, lowerGuessOntrackPercentage, upperGuessOntrackPercentage, maxIterations, includeStatePension, statePensionAmount);
                }

            }
            previousMonthHoldingAmount = holdingAmount;
            if (month == contributionPeriodUptoLumpSum + 1) {
                holdingAmountOnLumpSumDate = holdingAmount;
            }
            if (month == goalTargetMonth)
                valueAtRetirement = holdingAmount;
        }

        return {
            desiredOutflow: desiredOutflow,
            onTrackPercentage: guessOntrackPercentage,
            affordableDrawdown: affordableDrawdown,
            affordableLumpSum: affordableLumpSum,
            affordableRemainingAmount: affordableRemainingAmount,
            affordableOutflow: affordableOutflow,
            surplusOrShortfall: surplusOrShortfall,
            valueAtRetirement: valueAtRetirement,
            totalAffordableDrawdown: affordableDrawdown * goalDrawdownPeriod,
        } as Stats;
    }

    return calculateHoldingsWithOnTrackPercentage(timeHorizon, lumpSumAmount, desiredAmount, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, monthlyContributions, portfolioCurrentValue, upfrontContribution, preGoalExpectedReturn, postGoalExpectedReturn, preGoalZScore, postGoalZScore, lowerGuessOntrackPercentage, upperGuessOntrackPercentage, maxIterations, includeStatePension, statePensionAmount);
}

function calculateHolding(month: number, contributionPeriodUptoLumpSum: number, contributionPeriodFromLumpSumAndDrawdown: number, goalTargetMonth: number, PreviousMonthHolding: number, monthlyContributions: number, portfolioCurrentValue: number, upfrontContribution: number, affordableDrawdown: number, averagePercentage: number, affordableLumpSum: number, affordableRemainingAmount: number, holdingAmountOnLumpSumDate: number): number {

    if (month > goalTargetMonth) {
        return (PreviousMonthHolding - affordableDrawdown) * (1 + averagePercentage)
    }

    if (month == goalTargetMonth) {
        return (PreviousMonthHolding - affordableRemainingAmount) * (1 + averagePercentage);
    }

    if (month >= (contributionPeriodUptoLumpSum + contributionPeriodFromLumpSumAndDrawdown + 1)) {
        return (PreviousMonthHolding - affordableDrawdown) * (1 + averagePercentage)
    }

    if (contributionPeriodUptoLumpSum != 0 && month > (contributionPeriodUptoLumpSum + 1)) {
        return holdingAmountOnLumpSumDate * (1 + averagePercentage) ** (month - contributionPeriodUptoLumpSum) + monthlyContributions * ((1 + averagePercentage) ** (month - contributionPeriodUptoLumpSum) - 1) / averagePercentage;
    }

    if (contributionPeriodUptoLumpSum != 0 && month == (contributionPeriodUptoLumpSum + 1)) {
        return (PreviousMonthHolding - affordableLumpSum + monthlyContributions) * (1 + averagePercentage);
    }

    return (portfolioCurrentValue + upfrontContribution) * (1 + averagePercentage) ** month + monthlyContributions * ((1 - (1 + averagePercentage) ** month) / (1 - (1 + averagePercentage)));
}

function calculateContributionLine(month: number, previousMonthContributionValue: number, monthlyContributions: number, goalTargetMonth: number, affordableLumpSum: number, affordableRemainingAmount: number, affordableDrawdown: number, contributionPeriodUptoLumpSum: number, contributionPeriodFromLumpSumAndDrawdown: number) {

    if (month == goalTargetMonth) {
        return previousMonthContributionValue - affordableDrawdown - affordableRemainingAmount;
    }

    if (contributionPeriodUptoLumpSum != 0 && month == contributionPeriodUptoLumpSum + 1) {
        return previousMonthContributionValue - affordableLumpSum + monthlyContributions
    }
    if (contributionPeriodUptoLumpSum == 0 && month >= goalTargetMonth - contributionPeriodFromLumpSumAndDrawdown) {
        return previousMonthContributionValue - affordableDrawdown
    }

    if (month >= (contributionPeriodUptoLumpSum + contributionPeriodFromLumpSumAndDrawdown + 1)) {
        return previousMonthContributionValue - affordableDrawdown;
    }


    return previousMonthContributionValue + monthlyContributions;

}

function calculateProjectionValue(month: number, previousMonthProjectedValue: number, percentage: number, portfolioCurrentValue: number, upfrontContribution: number, monthlyContributions: number, affordableLumpSum: number, affordableRemainingAmount: number, affordableDrawdown: number, contributionPeriodUptoLumpSum: number, contributionPeriodFromLumpSumAndDrawdown: number, goalTargetMonth: number, projectedAmountOnLumpSumDate: number, isUpperCalulation: boolean = false) {
    if (isUpperCalulation && month >= goalTargetMonth && previousMonthProjectedValue <= affordableRemainingAmount) {
        return (previousMonthProjectedValue - affordableRemainingAmount) * (1 + percentage);
    }

    if (!isUpperCalulation && month == goalTargetMonth) {
        return (previousMonthProjectedValue - affordableRemainingAmount) * (1 + percentage);
    }

    if (contributionPeriodUptoLumpSum != 0 && month == contributionPeriodUptoLumpSum + 1) {
        return (previousMonthProjectedValue - affordableLumpSum + monthlyContributions) * (1 + percentage);
    }

    if (month >= (contributionPeriodUptoLumpSum + contributionPeriodFromLumpSumAndDrawdown + 1)) {
        return ((previousMonthProjectedValue - affordableDrawdown) * (1 + percentage));
    }

    if (contributionPeriodUptoLumpSum != 0 && month > contributionPeriodUptoLumpSum + 1) {
        return projectedAmountOnLumpSumDate * (1 + percentage) ** (month - contributionPeriodUptoLumpSum) + monthlyContributions * ((1 + percentage) ** (month - contributionPeriodUptoLumpSum) - 1) / percentage;
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

function round(value: number, precision: number): number {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
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

    if (inboundPayload.lumpSumAmount > 0 && (typeof inboundPayload.lumpSumDate == 'undefined' || !Date.parse(inboundPayload.lumpSumDate))) {
        const error: ValidationError = {
            code: "val-currentproj-027",
            property: "lumpSumDate",
            message: "lumpSumDate_must_be_a_valid_date",
        }
        errors.push(error)
    }

    if (Date.parse(inboundPayload.drawdownStartDate) > 0 && parseDate(inboundPayload.lumpSumDate) > parseDate(inboundPayload.drawdownStartDate)) {
        const error: ValidationError = {
            code: "val-currentproj-028",
            property: "lumpSumDate",
            message: "lumpSumDate_must_be_same_or_before_the_drawdownStartDate",
        }
        errors.push(error)
    }
    return errors;
}

export { currentProjection, getCurrentProjection, calculateDrawdown, validateInput, monthDiff, yearDiff, calculateZscore, calculatePercentage, calculateProjectionValue, calculateContributionLine, calculateExpectedReturn, calculateHoldingsWithOnTrackPercentage };

