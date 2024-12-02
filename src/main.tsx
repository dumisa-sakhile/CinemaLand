import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <HelmetProvider>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/"
        signInFallbackRedirectUrl="/movie"
        signUpFallbackRedirectUrl="/movie"
        appearance={{
          baseTheme: dark,
        }}>
        <App />
      </ClerkProvider>
    </HelmetProvider>
  </StrictMode>
);