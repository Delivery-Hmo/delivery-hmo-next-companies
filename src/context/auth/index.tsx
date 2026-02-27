import { useEffect, useState, useContext, createContext, useCallback, PropsWithChildren } from "react";
import { User as UserFirebase } from "firebase/auth";
import { deleteCookie, getCookie, getCookies } from "cookies-next/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { User } from "@src/interfaces/models/user";
import useMessage from "@src/hooks/useMessage";
import { publicRoutes } from "@src/utils/constants";
import FullLoader from "@src/components/clientComponents/fullLoader";

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

const AuthProvider = ({ children }: PropsWithChildren) => {
  const message = useMessage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reload = searchParams.get("reload");

  const [user, setUser] = useState<User | null>(null);
  const [userFirebase, setUserFirebase] = useState<UserFirebase | null>(null);
  const [loading, setLoading] = useState(true);

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

        const firebaseAuth = JSON.parse(firebaseAuthCookie);

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

  return <AuthContext value={{ user, userFirebase, loading, clearSession }}>{children}</AuthContext>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);