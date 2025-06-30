import { getTransactions } from "@/app/actions/getTransactions";
import TransactionItem from "./TransactionItem";

export interface Transaction {
    id: string;
    text: string;
    amount: number;
    userID: string;
    createdAt: Date;
}

const TransactionList = async () => {
    const transactions = await getTransactions();
    
    if ('error' in transactions) {
        return <div>No transactions found</div>;
    }
    
    return (
        <div className="history">
            <h3>History</h3>
            <ul className="list">
                {transactions.map((transaction: Transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;