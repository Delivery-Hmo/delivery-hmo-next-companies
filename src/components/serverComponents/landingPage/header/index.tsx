import { cookies } from "next/headers";
import styles from "./header.module.css";
import MenuLandingPage from "./menu";

const Header = async () => {
  const cookieStore = await cookies();
  const firebaseAuthCookie = cookieStore.get("firebaseAuth");

  if (firebaseAuthCookie) {
    return null;
  }

  return (
    <header className={styles.header}>
      <MenuLandingPage />
    </header>
  );
};

export default Header;
