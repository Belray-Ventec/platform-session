import React, { createContext, useContext, useState, useEffect } from "react";
import { SessionStorage, Session } from "./SessionStorage";
import { User, UserApi } from "./userApi";
import { goToLogin } from "./utils";

export type Platform = "home" | "tribolab" | "planning" | "stocks" | "library";

interface AuthContextProps {
  session?: Session | null;
  user?: User | null;
}

const AuthContext = createContext<AuthContextProps>({});

export interface AuthProviderProps {
  platform: Platform;
  children?: React.ReactNode;
  onLoaded?: (v: { session: Session; user: User } | null) => void;
}

export const AuthProvider = ({
  platform,
  children,
  onLoaded,
}: AuthProviderProps): JSX.Element => {
  const { session, user, loading } = useSession(platform);

  useEffect(() => {
    if (loading) return;

    if (session && user) {
      onLoaded?.({
        session,
        user,
      });
    } else {
      onLoaded?.(null);
    }
  }, [loading]);

  if (loading) return <div>Cargando...</div>;

  return (
    <AuthContext.Provider value={{ session, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => useContext(AuthContext);

const useSession = (
  platform: Platform
): {
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

      if (!userHasPlatformAuth(user)) {
        SessionStorage.remove();
        return goToLogin();
      }

      setUser(user);
      setSession(session);
      setLoading(false);
    } else {
      goToLogin();
    }
  };

  const userHasPlatformAuth = async (user: User) => {
    const platformAuths = {
      home: user.homeConfig.authorization,
      planning: user.planningConfig.authorization,
      tribolab: user.tribolabConfig.authorization,
      stocks: user.stocksConfig.authorization,
      library: user.libraryConfig.authorization,
    };

    return platformAuths[platform];
  };

  return { session, user, loading };
};
