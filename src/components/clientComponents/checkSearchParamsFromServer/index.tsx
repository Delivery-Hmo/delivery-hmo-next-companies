import useMessage from "@src/hooks/useMessage";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const CheckSearchParamsFromServer = () => {
  const message = useMessage();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  useEffect(() => {
    if (errorParam === "invalidCredentials") {
      message.error({
        content: "Por favor, verifica tu correo electrónico y/o contraseña.",
        duration: 5,
      });

      return;
    }

    if (errorParam) {
      message.error({
        content: "Error al iniciar sesión, intentelo de nuevo más tarde."
      });
    }
  }, [errorParam, message]);

  return null;
};

export default CheckSearchParamsFromServer;