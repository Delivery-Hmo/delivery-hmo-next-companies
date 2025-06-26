import { Button } from "antd";
import styles from "./loginForm.module.css";
import { login } from "./actions";
import DynamicForm from "@src/components/serverComponents/dynamicForm";

export interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  return (
    <div>
      <DynamicForm<LoginFormValues>
        formId="loginForm"
        action={login}
        formControls={[
          {
            name: "email",
            label: "Correo electrónico",
            type: "email",
            required: true,
            placeholder: "Ingresa tu correo electrónico",
            formItemProps: {
              colon: false,
              className: styles.emailFormItem
            },
          },
          {
            type: "password",
            name: "password",
            label: "Contraseña",
            placeholder: "Ingresa tu contraseña",
            required: true,
            formItemProps: {
              colon: false,
              wrapperCol: { span: 24 }
            },
          },
        ]}
      />
      <Button
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
