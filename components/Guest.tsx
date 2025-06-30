import { checkUser } from "@/lib/checkUser";
import { SignInButton } from "@clerk/nextjs";
import SignInForm from "./SignInForm";

const Guest = async () => {
    
    return (
        <div className="guest">
            <h1>Welcome</h1>
            <p>Please sign in to manage your transactions</p>
            <SignInForm />
        </div>
    )
}

export default Guest;