import React from 'react';
import styles from "./login.module.css";
import { logoUrlTransparent, ruleEmail, ruleMaxLength } from "@src/utils/constants";
import { Button, Card, Input } from "antd";
import Image from "next/image";
import FormItem from "antd/es/form/FormItem";

const PasswordInput = Input.Password;

const Login = () => {
  return (
    <section>
      <div className={styles.container}>
        <Card>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Bienvenido a</h1>
          </div>
          <div className={styles.logoContainer}>
            <Image
              className={styles.logo}
              src={logoUrlTransparent}
              alt="Logo de TakHillo vertical transparente"
              width={170}
              height={150}
            />
          </div>
          <h2 className={styles.subtitle}>
            Inicia sesión con tu correo y contraseña para continuar
          </h2>
          <div className={styles.content}>
            <form>
              <FormItem
                rules={[ruleEmail, ruleMaxLength]}
                label="Correo electrónico"
                colon={false} // Remove colon for better alignment
              >
                <Input
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  name="email"
                />
              </FormItem>
              <FormItem
                rules={[ruleMaxLength]}
                label="Contraseña"
                wrapperCol={{ span: 24 }}
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
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Login;