import Link from "next/link";
import { getCurrentUser } from "@/app/actions/user";
import SignOutButton from "./SignOutButton";

const Header = async () => {
    const user = await getCurrentUser();

    return (
        <nav className="navbar">
            <div className="navbar-container">
            <Link href="/">
                <h1>Expense Tracker</h1>
            </Link>
            <div>
                {user && (
                    <SignOutButton />
                )}
            </div>
            </div>
        </nav>
    )
}

export default Header;