import { useEffect, useState, useContext, createContext, FC, ReactNode, useCallback } from "react";
import { User as UserFirebase } from "firebase/auth";
import { deleteCookie, getCookie, getCookies } from "cookies-next/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FullLoader from "../../components/clientComponents/fullLoader";
import { User } from "@src/interfaces/models/user";
import useMessage from "@src/hooks/useMessage";
import { publicRoutes } from "@src/utils/constants";

interface Props {
  children: ReactNode;
}

interface AuthContextProps {
  user: User | null;
  userFirebase: UserFirebase | null;
  loading: boolean;
  clearSession: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  userFirebase: null,
  loading: true,
  clearSession: () => { },
});

const AuthProvider: FC<Props> = ({ children }) => {
  const message = useMessage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reload = searchParams.get("reload");
  const [user, setUser] = useState<User | null>(null);
  const [userFirebase, setUserFirebase] = useState<UserFirebase | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  const clearSession = useCallback(() => {
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
    const init = async () => {
      try {
        const firebaseAuthCookie = getCookie("firebaseAuth");

        if (!firebaseAuthCookie) {
          clearSession();
          return;
        }

        const firebaseAuth = JSON.parse(firebaseAuthCookie as string);

        setUserFirebase(firebaseAuth as UserFirebase);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        message.error("Error al obtener el usuario");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [router, clearSession, message, reload]);

  if (loading) return <FullLoader />;

  return <AuthContext.Provider value={{ user, userFirebase, loading, clearSession }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);