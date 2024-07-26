import React, { createContext, useContext, useState, useEffect } from "react";
import { SessionStorage, Session } from "./SessionStorage";
import { User, UserApi } from "./userApi";
import { goToLogin } from "./utils";

export type Platform =
  | "home"
  | "tribolab"
  | "planning"
  | "stocks"
  | "library"
  | "admin";

interface AuthContextProps {
  session?: Session | null;
  user?: User | null;
  onChangeZone?: (id: string) => void;
  onLogout?: () => void;
}

const AuthContext = createContext<AuthContextProps>({});

export interface AuthProviderProps {
  platform: Platform;
  children?: React.ReactNode;
  onSession?: (v: { session: Session; user: User }) => void;
}

export const AuthProvider = ({
  platform,
  children,
  onSession,
}: AuthProviderProps): JSX.Element => {
  const { session, user, loading, onChangeZone, onLogout } =
    useSession(platform);

  useEffect(() => {
    if (!loading && session && user) {
      onSession?.({
        session,
        user,
      });
    }
  }, [loading]);

  if (loading) return <div>Cargando...</div>;

  return (
    <AuthContext.Provider value={{ session, user, onChangeZone, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => useContext(AuthContext);

export interface SessionInfo {
  session: Session | null;
  user: User | null;
  loading: boolean;
  onChangeZone: (id: string) => void;
  onLogout: () => void;
}

const QUERY_PARAM_TOKEN = "token";

const useSession = (platform: Platform): SessionInfo => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    let session = SessionStorage.get();

    const urlToken = new URLSearchParams(window.location.search).get(
      QUERY_PARAM_TOKEN
    );

    if (urlToken) {
      const user = await UserApi.getByToken(urlToken);
      session = { userId: user.id, authToken: urlToken };
      SessionStorage.set(session);
    }

    if (!session) return goToLogin();

    const user = await UserApi.getByToken(session.authToken);

    if (!userHasPlatformAuth(user)) return goToLogin();

    if (!session.zone && user.zones?.[0]?.id) {
      session.zone = user.zones[0].id;
      SessionStorage.set(session);
    }

    setUser(user);
    setSession(session);
    setLoading(false);
  };

  const onChangeZone = (zone: string) => {
    if (session) {
      const newSession = { ...session, zone };
      SessionStorage.set(newSession);
      setSession(newSession);
    }
  };

  const onLogout = () => {
    SessionStorage.remove();
    goToLogin();
  };

  const userHasPlatformAuth = async (user: User) => {
    const platformAuths = {
      home: user.homeConfig.authorization,
      planning: user.planningConfig.authorization,
      tribolab: user.tribolabConfig.authorization,
      stocks: user.stocksConfig.authorization,
      library: user.libraryConfig.authorization,
      admin: user.adminConfig.authorization,
    };

    return platformAuths[platform];
  };

  return { session, user, loading, onChangeZone, onLogout };
};
