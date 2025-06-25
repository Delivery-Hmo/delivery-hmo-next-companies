import { useEffect, useState, useContext, createContext, FC, ReactNode, useCallback } from "react";
import { User as UserFirebase, onIdTokenChanged } from "firebase/auth";
import { deleteCookie, getCookies, setCookie } from "cookies-next/client";
import { usePathname, useRouter } from "next/navigation";
import FullLoader from "../../components/clientComponents/fullLoader";
import { auth } from "../../firebase";
import { User } from "@src/interfaces/models/user";
import { get } from "@src/services/http/client";
import useMessage from "@src/hooks/useMessage";
import { publicRoutes } from "@src/utils/constants";

interface Props {
  children: ReactNode;
}

interface AuthContextProps {
  user: User | null;
  userFirebase: UserFirebase | null;
  loading: boolean;
  clearSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  userFirebase: null,
  loading: true,
  clearSession: () => Promise.resolve(),
});

const AuthProvider: FC<Props> = ({ children }) => {
  const message = useMessage();
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [userFirebase, setUserFirebase] = useState<UserFirebase | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  const clearSession = useCallback(async () => {
    const cookies = getCookies();

    if (cookies) Object.keys(cookies).forEach((key) => deleteCookie(key));

    if (!publicRoutes.includes(pathname)) {
      router.push("/");
      router.refresh();
    }

    setUserFirebase(null);
    setUser(null);
    setLoading(false);
  }, [router, pathname]);

  useEffect(() => {
    const uns = onIdTokenChanged(auth, async (_userFirebase) => {
      setUserFirebase(_userFirebase);

      if (!_userFirebase) {
        clearSession();
        return;
      }

      try {
        const _user = await get<User>({ baseUrl: "companiesApi", url: `/users/get-by-uid?uid=${_userFirebase.uid}` });
        const token = await _userFirebase.getIdToken();

        setCookie("token", token);
        setCookie("uid", _userFirebase.uid);
        setCookie("refreshToken", _userFirebase.refreshToken);
        setCookie("user", JSON.stringify(_user));

        setUser(_user);
      } catch (error) {
        clearSession();
        console.log(error);
        message.error("Error getting user information.");
      } finally {
        setLoading(false);
      }
    });

    return () => {
      uns();
    };
  }, [router, clearSession, message]);

  if (loading) return <FullLoader />;

  return <AuthContext.Provider value={{ user, userFirebase, loading, clearSession }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);