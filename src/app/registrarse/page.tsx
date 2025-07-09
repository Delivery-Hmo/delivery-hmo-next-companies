import styles from "../iniciar-sesion/login.module.css";
import Image from "next/image";
import { Card } from "antd";
import { logoUrlTransparent } from "@src/utils/constants";
import SignupForm from "@src/components/serverComponents/signupForm";
import { BaseSCProps } from "@src/interfaces/components";

const Signup = async ({ searchParams }: BaseSCProps) => {
  return (
    <section>
      <div className={styles.container}>
        <Card>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Registrate en</h1>
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
            Registra tus datos para continuar
          </h2>
          <SignupForm searchParams={searchParams} />
        </Card>
      </div>
    </section>
  );
};

export default Signup;