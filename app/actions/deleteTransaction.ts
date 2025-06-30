"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user";

export const deleteTransaction = async (transactionId: string): Promise<{ message: string, error?: string }> => {
    const user = await getCurrentUser()
    if (!user) {
        return { message: "User not found" };
    }
    try {
        await db.transaction.delete({ where: { id: transactionId , userID: user.id } });
        revalidatePath("/");
        return { message: "Transaction deleted"};
    } catch (error) {
        return { message: "Error deleting transaction" };
    }
};
