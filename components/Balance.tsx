
import { getUserBalance } from "@/app/actions/getUserBalance";
import { addCommas } from "@/lib/utils";
import Cookies from 'js-cookie';
const Balance = async () => {
    
    const { balance } = await getUserBalance();
  return (
    <>
    <h4>Balance</h4>
    {balance ? <h1>${addCommas(Number(balance.toFixed(2)) ?? 0)}</h1> : <h1>$ 0</h1>}
    </>
  );
};

export default Balance;
