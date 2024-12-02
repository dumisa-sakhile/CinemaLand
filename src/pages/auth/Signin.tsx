import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => <SignIn path="/login" signUpUrl="/signup" />;

export default SignInPage;
