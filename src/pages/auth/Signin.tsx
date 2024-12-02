import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen w-full">

    <SignIn path="/login" signUpUrl="/signup" />
  </div>
);

export default SignInPage;
