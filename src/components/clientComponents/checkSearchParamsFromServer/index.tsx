import useMessage from "@src/hooks/useMessage";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const CheckSearchParamsFromServer = () => {
  const message = useMessage();
  const searchParams = useSearchParams();
  const invalidCredentialsParam = searchParams.get("invalidCredentials");
  const loginFailedParam = searchParams.get("loginFailed");

  useEffect(() => {
    if (invalidCredentialsParam) {
      message.error({
        content: "Por favor, verifica tu correo electrónico y/o contraseña.",
        duration: 5,
      });

      return;
    }

    if (loginFailedParam) {
      message.error({
        content: "Error al iniciar sesión, intentelo de nuevo más tarde."
      });
    }
  }, [invalidCredentialsParam, loginFailedParam]);

  return null;
};

export default CheckSearchParamsFromServer;