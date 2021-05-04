import {calculatePortfolioEquityPercentage, equityValue } from './index'

describe("Calculate portfolio asset allocation", () => {
    test("Calculates equity value for account", () => {
        const testAccount = createAccount("test", 500, 50)
        const testAccountDecimal = createAccount("test", 2.50, 20)
        expect(equityValue(testAccount)).toBe(250)
        expect(equityValue(testAccountDecimal)).toBe(0.5)
    });

    test("Equity less than 0 returns error", () => {
        const testAccount = createAccount("test", 500, -1)
        expect(() => {
            equityValue(testAccount)
        }).toThrow(/Equity percentage must be between 0 and 100/)
    });

    test("Equity more than 100 returns error", () => {
        const testAccount = createAccount("test", 500, 100.5)
        expect(() => {
            equityValue(testAccount)
        }).toThrow(/Equity percentage must be between 0 and 100/)
    });

    test("Calculates equity value for a portfolio - 1 account", () => {
        const account1 = createAccount("test", 500, 50)
        const portfolio = [account1]
        expect(calculatePortfolioEquityPercentage(portfolio)).toBe(50)
    });

    test("Calculates equity value for a portfolio - 2 accounts with same equity", () => {
        const account1 = createAccount("test1", 500, 50)
        const account2 = createAccount("test2", 1000, 50)
        const portfolio = [account1, account2]
        expect(calculatePortfolioEquityPercentage(portfolio)).toBe(50)
    });
});

function createAccount(name: string, value: number, equityPercentage: number) {
    return {
        "accountName": name,
        "accountValue": value,
        "equityPercentage": equityPercentage
    }
}
