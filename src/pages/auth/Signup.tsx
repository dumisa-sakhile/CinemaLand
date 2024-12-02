import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => <SignUp path="/signup" signInUrl="/login" />;

export default SignUpPage;
