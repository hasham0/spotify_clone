import { useEffect } from "react";
import { LayoutDashboardIcon } from "lucide-react";
import {
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import SignInOAuthButton from "./sign-in-o-auth-button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

type Props = {};

const Topbar = ({}: Props) => {
  const { checkAdminStatus, isAdmin } = useAuthStore();
  useEffect(() => {
    const fetchAdminStatus = async () => await checkAdminStatus();

    fetchAdminStatus();
  }, [checkAdminStatus]);

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between bg-zinc-900/75 p-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <img src="/spotify.png" alt="spotify logo" className="size-8" />
        Spotify
      </div>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to={"/admin"}
            className={cn(
              buttonVariants({
                variant: "outline",
              })
            )}
          >
            <LayoutDashboardIcon className="mr-2 size-4" />
            Admin Dashboard
          </Link>
        )}
        <SignedIn>
          <SignOutButton />
        </SignedIn>

        <SignedOut>
          <SignInOAuthButton />
        </SignedOut>
        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
