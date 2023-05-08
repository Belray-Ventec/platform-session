import React, { createContext, useContext, useState, useEffect } from "react";
import { getSession, goToLoginWebsite, Session } from "./utils";

const AuthContext = createContext<Session | null>(null);

export interface AuthProverProps {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProverProps): JSX.Element => {
  const { session, loading } = useGetSession();

  if (loading) return <div>Cargando...</div>;

  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): Session | null => useContext(AuthContext);

export const useGetSession = (): {
  session: Session | null;
  loading: boolean;
} => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (session) {
      setSession(session);
      setLoading(false);
    } else {
      goToLoginWebsite();
    }
  }, []);

  return { session, loading };
};
