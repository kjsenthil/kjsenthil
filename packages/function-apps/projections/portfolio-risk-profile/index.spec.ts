import {Fund, FundWithDistance} from "./types";
import {calculateClosestFund, calculateFundDistance, sortFundsByDistance} from "./index";

describe("Calculate closest equity fund to portfolio", () => {
    const fund1 = createFund("1", "1", 10)
    const fund2 = createFund("2", "2", 20)
    const fund3 = createFund("3", "3", 30)

    describe("Calculates closest fund", () => {
        test("Between 2 funds with distance closest to fund 1", () => {
            let portfolioEquity = 12
            expect(
                calculateClosestFund([fund1, fund2], portfolioEquity))
                .toEqual(appendFundWithDistance(fund1, 2))
            portfolioEquity = 9
            expect(
                calculateClosestFund([fund1, fund2], portfolioEquity))
                .toEqual(appendFundWithDistance(fund1, 1))
        });
        test("Between 2 funds with distance closest to fund 2", () => {
            let portfolioEquity = 18
            expect(
                calculateClosestFund([fund1, fund2], portfolioEquity))
                .toEqual(appendFundWithDistance(fund2, 2))
            portfolioEquity = 46
            expect(
                calculateClosestFund([fund1, fund2], portfolioEquity))
                .toEqual(appendFundWithDistance(fund2, 26))
        });
        test("Between 2 funds with equity equidistant", () => {
            const portfolioEquity = 15
            expect(
                calculateClosestFund([fund1, fund2], portfolioEquity))
                .toEqual(appendFundWithDistance(fund1, 5))
        });
        test("Between more than 2 funds", () => {
            const portfolioEquity = 36
            expect(
                calculateClosestFund([fund1, fund2, fund3], portfolioEquity))
                .toEqual(appendFundWithDistance(fund3, 6))
        });
    });

    describe("Calculates fund distance", () => {
        test("Where portfolio equity is higher than fund equity", () => {
            const portfolioEquity = 95
            expect(
                calculateFundDistance(fund1, portfolioEquity))
                .toEqual(appendFundWithDistance(fund1, 85))
        });
        test("Where portfolio equity is lower than fund equity", () => {
            const portfolioEquity = 5
            expect(
                calculateFundDistance(fund3, portfolioEquity))
                .toEqual(appendFundWithDistance(fund3, 25))
        });
        test("Where portfolio equity is the same as fund equity", () => {
            const portfolioEquity = 20
            expect(
                calculateFundDistance(fund2, portfolioEquity))
                .toEqual(appendFundWithDistance(fund2, 0))
        });
    });

    describe("Sorts funds by distance", () => {
        test("Where fund1 has higher distance than fund2", () => {
            const fund1WithDistance = appendFundWithDistance(fund1, 20)
            const fund2WithDistance = appendFundWithDistance(fund2, 10)
            expect(sortFundsByDistance(fund1WithDistance, fund2WithDistance)).toEqual(1)
        });
        test("Where fund1 has lower distance than fund2", () => {
            const fund1WithDistance = appendFundWithDistance(fund1, 10)
            const fund2WithDistance = appendFundWithDistance(fund2, 20)
            expect(sortFundsByDistance(fund1WithDistance, fund2WithDistance)).toEqual(-1)
        });
        test("Where fund1 has same distance as fund2 and lower equity", () => {
            const fund1WithDistance = appendFundWithDistance(fund1, 10)
            const fund2WithDistance = appendFundWithDistance(fund2, 10)
            expect(sortFundsByDistance(fund1WithDistance, fund2WithDistance)).toEqual(-1)
        });
        test("Where fund1 has same distance as fund2 and higher equity", () => {
            const fund1WithDistance = appendFundWithDistance(fund1, 10)
            const fund2WithDistance = appendFundWithDistance(fund2, 10)
            expect(sortFundsByDistance(fund2WithDistance, fund1WithDistance)).toEqual(1)
        });
    });
});

function createFund(sedol: string, riskModel: string, equityProportion: number): Fund {
    return {
        "sedol": sedol,
        "riskModel": riskModel,
        "equityProportion": equityProportion
    }
}

function appendFundWithDistance(fund: Fund, distance: number): FundWithDistance {
    return {
        "sedol": fund.sedol,
        "riskModel": fund.riskModel,
        "equityProportion": fund.equityProportion,
        "distance": distance
    }
}

