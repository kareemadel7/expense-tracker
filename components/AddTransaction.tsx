"use client";

import { addTransaction } from "@/app/actions/addTransaction";
import { toast } from "react-toastify";

const AddTransaction = () => {
    
    const clientAction = async (formData: FormData) => {
        const result = await addTransaction(formData);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Transaction added:", result.data);
        }
    }
    return (
        <div className="form">
            <h3>Add Transaction</h3>
            
            <form action={clientAction}>
            <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" id="text" name="text" placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount
                        <br />
                        <span>
                            (negative - expense, positive - income)
                        </span>
                    </label>
                    <input type="number" id="amount" name="amount" placeholder="Enter amount..." step="0.01" />
                </div>
                <button className="btn" type="submit">Add Transaction</button>
            </form>
        </div>
    )
}

export default AddTransaction;