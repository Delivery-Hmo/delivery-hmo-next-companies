import { Button } from "antd";
import styles from "./loginForm.module.css";
import { login } from "./actions";
import DynamicForm from "@src/components/serverComponents/dynamicForm";
import { BaseSCProps } from "@src/interfaces/components";
import Script from "next/script";

export interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm = async ({ searchParams }: BaseSCProps) => {
  const email = (await searchParams)?.email || "";

  return (
    <div>
      <Script
        id="loginFormScript"
        strategy="afterInteractive"
      >
        {`
            const form = document.getElementById("loginForm");
            form.addEventListener("submit", function(event) {
              const loginButton = document.getElementById("loginButton");
              if (loginButton) {
                loginButton.disabled = true;
                loginButton.textContent = "Iniciando sesión...";
              }
            });
        `}
      </Script>
      <DynamicForm<LoginFormValues>
        formId="loginForm"
        action={login}
        formControls={[
          {
            name: "email",
            label: "Correo electrónico",
            type: "email",
            required: true,
            defaultValue: email,
            placeholder: "Ingresa tu correo electrónico",
            style: { marginBottom: "1rem" }
          },
          {
            type: "password",
            name: "password",
            label: "Contraseña",
            placeholder: "Ingresa tu contraseña",
            required: true,
            style: { marginBottom: "1rem" }
          },
        ]}
      />
      <Button
        id="loginButton"
        type="primary"
        htmlType="submit"
        className={styles.submitButton}
        form="loginForm"
      >
        Continuar
      </Button>
    </div>
  );
};
