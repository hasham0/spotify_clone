import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "./sign-in-o-auth-button";
import { SignedOut, UserButton } from "@clerk/clerk-react";

type Props = {};

const Topbar = ({}: Props) => {
  const isAdmin = false;
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between bg-zinc-900/75 p-4 backdrop-blur-md">
      <div className="flex items-center gap-2">Spotify</div>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to={"/admin"}>
            <LayoutDashboardIcon className="mr-2 size-4" />
          </Link>
        )}
        <SignedOut>
          <SignInOAuthButton />
        </SignedOut>
        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
