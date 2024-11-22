import { createContext, ReactNode } from "react";

interface User {
  // Define the shape of your user object
  id: string;
  name: string;
  email: string;
}

interface UserContextValue {
  user: User | null;
}

const UserContext = createContext<UserContextValue>({
  user: null,
});

interface UserProviderProps {
  children: ReactNode;
  user: User | null;
}

const UserProvider = ({ children, user }: UserProviderProps) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
