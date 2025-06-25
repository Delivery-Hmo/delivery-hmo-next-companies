import { Input, Button } from "antd";
import FormItem from "antd/es/form/FormItem";
import styles from "./loginForm.module.css";
import { login } from "./actions";

export interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  return (
    <form
      autoComplete="off"
      action={login}
    >
      <FormItem<LoginFormValues>
        label="Correo electrónico"
        colon={false}
        className={styles.emailFormItem}
        name="email"
        required
      >
        <Input
          type="email"
          placeholder="Ingresa tu correo electrónico"
          name="email"
          required
        />
      </FormItem>
      <FormItem<LoginFormValues>
        label="Contraseña"
        colon={false}
        name="password"
        required
        wrapperCol={{ span: 24 }}
      >
        <Input
          type="password"
          placeholder="Ingresa tu contraseña"
          name="password"
          required
        />
      </FormItem>
      <Button
        type="primary"
        htmlType="submit"
        className={styles.submitButton}
      >
        Continuar
      </Button>
    </form >
  );
};
