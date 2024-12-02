import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen w-full">
    <SignUp path="/signup" signInUrl="/login" redirectUrl="/movie" />
  </div>
);

export default SignUpPage;
