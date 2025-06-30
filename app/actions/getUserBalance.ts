"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "./user";

export const getUserBalance = async (): Promise<{ balance: number } | { error: string }> => {
    const user = await getCurrentUser()
    if (!user) {
      return {
        error: 'Unauthorized',
      }
    }
   
    try {
        const transactions = await db.transaction.findMany({ where: { userID: user.id } });
        const balance = transactions.reduce((acc, transaction) => {
            return acc + transaction.amount;
        }, 0);
        return {balance};
    } catch (error) {
        return { error: "database error"};
    }
};