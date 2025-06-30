import Guest from "@/components/Guest";
import AddTransaction from "@/components/AddTransaction";
import Balance from "@/components/Balance";
import IncomeExpenses from "@/components/IncomeExpenses";
import TransactionList from "@/components/TransactionList";
import { getCurrentUser } from "./actions/user";

const Home = async () => {
  const user = await getCurrentUser();
  
  return (
    <main className="container">
      {user ? (
        <>
          <h2>Welcome {user?.name}</h2>
          <Balance />
          <IncomeExpenses />
          <AddTransaction />
          <TransactionList />
        </>
      ) : (
        <Guest />
      )}
    </main>
  );
};

export default Home;