import Script from "next/script";
import DynamicForm from "../dynamicForm";
import { LoginFormValues } from "../loginForm";
import { signup } from "./actions";
import { BaseSCProps } from "@src/interfaces/components";
import { Button } from "antd";
import styles from "./signupForm.module.css";

interface SignupFormValues extends LoginFormValues {
  name: string;
  confirmPassword: string;
  userType: "client" | "company" | "deliveryMan";
}

const SignupForm = async ({ searchParams }: BaseSCProps) => {
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
      <DynamicForm<SignupFormValues>
        formId="loginForm"
        action={signup}
        formControls={[
          {
            name: "name",
            label: "Nombre",
            required: true,
            placeholder: "Ingresa el nombre",
            style: { marginBottom: "1rem" }
          },
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
          {
            type: "password",
            name: "confirmPassword",
            label: "Confirmar contraseña",
            placeholder: "Confirma tu contraseña",
            required: true,
            style: { marginBottom: "1rem" }
          },
          {
            name: "userType",
            label: "Tipo de usuario",
            type: "select",
            options: [
              { value: "client", label: "Cliente" },
              { value: "company", label: "Empresa" },
              { value: "deliveryMan", label: "Repartidor" }
            ],
            style: { marginBottom: "1rem" }
          }
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

export default SignupForm;