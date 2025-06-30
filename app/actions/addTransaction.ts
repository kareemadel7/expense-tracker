'use server'

import { db } from "@/lib/db";
import Cookies from 'js-cookie';
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user";


interface TransactionData {
    text: string;
    amount: number;
}
interface TransactionResult {
    data?: TransactionData;
    error?: string;
}

export async function addTransaction(formData: FormData): Promise<TransactionResult> {
    const textValue = formData.get("text");
    const amountValue = formData.get("amount");
    console.log(textValue, amountValue);
    if (!textValue || textValue === "" || !amountValue) {
        return { error: "Text or amount is missing" };
    }
    const user = await getCurrentUser()
    if (!user) {
        return { error: "User not found" };
    }
    console.log("user", user.id , textValue , amountValue);
    
    const text = textValue.toString() as string;
    const amount = parseFloat(amountValue.toString()) as number;
    try {
        const transactionData: TransactionData = await db.transaction.create({
            data: {
                text: text,
                amount: amount,
                userID: user.id,
            },
        });
        revalidatePath("/");
        return { data: transactionData };
    } catch (error) {
        console.log("error500", error);
        return { error: "Failed to add transaction" };
    }
}
