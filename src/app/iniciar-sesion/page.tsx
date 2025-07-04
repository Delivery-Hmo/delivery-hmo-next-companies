import styles from "./login.module.css";
import Image from "next/image";
import { Card } from "antd";
import { logoUrlTransparent } from "@src/utils/constants";
import { LoginForm } from "@src/components/serverComponents/loginForm";
import { BaseSCProps } from "@src/interfaces/components";

const Login = ({ searchParams }: BaseSCProps) => {
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
              priority
            />
          </div>
          <h2 className={styles.subtitle}>
            Inicia sesión con tu correo y contraseña para continuar
          </h2>
          <LoginForm searchParams={searchParams} />
        </Card>
      </div>
    </section>
  );
};

export default Login;