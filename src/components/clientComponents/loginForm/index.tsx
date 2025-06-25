import { ruleEmail, ruleMaxLength, rulePasswordRequired } from "@src/utils/constants";
import { Form, Input, Button } from "antd";
import FormItem from "antd/es/form/FormItem";
import styles from "./loginForm.module.css";
import { login } from "./actions";

export const LoginForm = async () => {
  return (
    <Form
      autoComplete="off"
      onFinish={login}
      layout="vertical"
    >
      <FormItem
        rules={[ruleEmail, ruleMaxLength]}
        label="Correo electrónico"
        colon={false}
        className={styles.emailFormItem}
        name="email"
      >
        <Input
          type="email"
          placeholder="Ingresa tu correo electrónico"
          name="email"
        />
      </FormItem>
      <FormItem
        rules={[rulePasswordRequired, ruleMaxLength]}
        label="Contraseña"
        colon={false}
        name="password"
      >
        <Input
          type="text"
          placeholder="Ingresa tu contraseña"
          name="password"
        />
      </FormItem>
      <Button
        type="primary"
        htmlType="submit"
        className={styles.submitButton}
      >
        Continuar
      </Button>
    </Form>
  );
};
