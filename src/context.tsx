import React, { createContext, useContext, useState, useEffect } from "react";
import { SessionStorage, Session } from "./SessionStorage";
import { User, UserApi } from "./userApi";
import { goToLogin } from "./utils";

interface AuthContextProps {
  session?: Session | null;
  user?: User | null;
}

const AuthContext = createContext<AuthContextProps>({});

export interface AuthProverProps {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProverProps): JSX.Element => {
  const { session, user, loading } = useGetSession();

  if (loading) return <div>Cargando...</div>;

  return (
    <AuthContext.Provider value={{ session, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => useContext(AuthContext);

export const useGetSession = (): {
  session: Session | null;
  user: User | null;
  loading: boolean;
} => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    const session = SessionStorage.get();
    if (session) {
      const userId = session.userId;
      const user = await UserApi.get(session.authToken, userId);

      setUser(user);
      setSession(session);
      setLoading(false);
    } else {
      goToLogin();
    }
  };

  return { session, user, loading };
};
