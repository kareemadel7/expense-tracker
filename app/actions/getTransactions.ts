"use server";

import { Transaction } from "@/components/TransactionList";
import { db } from "@/lib/db";
import { getCurrentUser } from "./user";

export const getTransactions= async (): Promise<Transaction[] | { error: string }> => {
    const user = await getCurrentUser()
    if (!user) {
        return { error: "user not found"};
    }
    try {
        const transactions = await db.transaction.findMany({ where: { userID: user.id } });
       
        return transactions;
    } catch (error) {
        return { error: "database error"};
    }
};
