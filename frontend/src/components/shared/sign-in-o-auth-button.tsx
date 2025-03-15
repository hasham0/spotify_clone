import { useSignIn } from "@clerk/clerk-react";
import { Button } from "../ui/button";

type Props = {};

const SignInOAuthButton = ({}: Props) => {
  const { signIn, isLoaded } = useSignIn();
  if (!isLoaded) return null;

  const signInWithGoogle = async () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return (
    <Button
      onClick={signInWithGoogle}
      variant={"secondary"}
      className="h-11 w-full border-zinc-200 text-white"
    >
      Continue With Google
    </Button>
  );
};

export default SignInOAuthButton;
