"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "./user";

export const getIncomeExpenses = async (): Promise<{ income: number, expenses: number } | { error: string }> => {
    const user = await getCurrentUser()
    if (!user) {
        return { error: "user not found"};
    }
    try {
        const transactions = await db.transaction.findMany({ where: { userID: user.id } });
        const income = transactions.filter((transaction) => transaction.amount > 0)
        .reduce((acc, transaction) => {
            return acc + transaction.amount;
        }, 0);
        const expenses = transactions.filter((transaction) => transaction.amount < 0)
        .reduce((acc, transaction) => {
            return acc + transaction.amount;
        }, 0);
        return {income, expenses: Math.abs(expenses)};
    } catch (error) {
        return { error: "database error"};
    }
};