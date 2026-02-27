import Script from "next/script";
import DynamicForm from "../../../components/serverComponents/dynamicForm";
import { LoginFormValues } from "../../iniciar-sesion/loginForm";
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
        id="signupFormScript"
        strategy="afterInteractive"
      >
        {`
            const form = document.getElementById("signupForm");
            
            form.addEventListener("submit", function(event) {
              const signupButton = document.getElementById("signupButton");

              if (!signupButton) return;

              signupButton.disabled = true;
              signupButton.textContent = "Registrando...";
            });
        `}
      </Script>
      <DynamicForm<SignupFormValues>
        formId="signupForm"
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
            type: "radioGroup",
            name: "userType",
            title: "Tipo de usuario",
            options: [
              { label: "Cliente", value: "client" },
              { label: "Empresa", value: "company" }
            ]
          }
        ]}
      />
      <Button
        id="signupButton"
        type="primary"
        htmlType="submit"
        className={styles.submitButton}
        form="signupForm"
      >
        Registrarse
      </Button>
    </div>
  );
};

export default SignupForm;